/*
SHAPEFILE
1. Retrieved Cartographic Boundary File from here:
https://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/bound-limit-2011-eng.cfm
2. Dropped contents into www.mapshaper.com and exported to GeoJSON
3. D3.js magiks
*/

//Width and height of main map
const margin = {top: 20, right: 40, bottom: 0, left: 40};
const w = 580 - margin.left - margin.right;
const h = 580 - margin.top - margin.bottom;

// Width and height of region tooltip
const marginRegion = {top: 20, right: 20, bottom: 20, left: 20};
const wRegion = 220 - marginRegion.left - marginRegion.right;
const hRegion = 220 - marginRegion.top - marginRegion.bottom;

const svgContainer = d3.select("#geochart");
const svgContainerRegion = d3.select("#region-detail");

// const colourRange = ['white','blue','orange'];
const colourRange = ['#FDE725', '#238A8F', '#440154'];

const svg = svgContainer
    .append("svg")
    .style("display", "block")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const svgRegion = svgContainerRegion
    .append("svg")
    .style("display", "block")
    .attr("width", wRegion + marginRegion.left + marginRegion.right)
    .attr("height", hRegion + marginRegion.top + marginRegion.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginRegion.left + "," + marginRegion.top + ")");

// Track which region is currently being hovered over over by user
let hoveredRegion = null;

// Note that regionList is used for keyboard controls of map; that's why territories are not included (no data)
const regionList = [
    'British Columbia',
    'Alberta',
    'Saskatchewan',
    'Manitoba',
    'Ontario',
    'Quebec',
    'Newfoundland and Labrador',
    'New Brunswick',
    'Prince Edward Island',
    'Nova Scotia',
];

// Tracks index within the regionList to allow for keyboard/button cycling of map
let currentRegionIndex = null;

// Temporarily disabled nutrients with both sexes combined
// TODO: When 'Male' or 'Female' is selected, limit the nutrient list to remove the following
//  -- Folate
//  -- Total dietary fibre
//  -- Iron
//  -- Zinc
//  ... and show a disclaimer that says certain nutrients have been excluded because they are only available for
//  the "Males and females combined" category.
const nutrientList = [
    'Calcium',
    // 'Folate',
    // 'Total dietary fibre',
    // 'Iron',
    'Magnesium',
    'Percentage of total energy intake from carbohydrates',
    'Percentage of total energy intake from fat',
    'Percentage of total energy intake from protein',
    'Potassium',
    'Sodium',
    'Vitamin A',
    'Vitamin C',
    'Vitamin D',
    // 'Zinc',
].sort();

// Stores appropriate chart title for each nutrient
const nutrientTitles = {
    'Calcium': 'Percentage of adults age 19 and over with a usual intake of calcium below the Estimated Average Requirement, Canada, 2015',
    'Folate': 'Percentage of adults age 19 and over with a usual intake of folate below the Estimated Average Requirement, Canada, 2015\n',
    'Total dietary fibre': 'Percentage of adults age 19 and over with a usual intake of dietary fibre above the Adequate Intake, Canada, 2015\n',
    'Iron': 'Percentage of adults age 19 and over with a usual intake of inadequate iron intake, Canada, 2015',
    'Magnesium': 'Percentage of adults age 19 and over with a usual intake of magnesium below the Estimated Average Requirement, Canada, 2015',
    'Percentage of total energy intake from carbohydrates': 'Percentage of adults age 19 and over with a usual intake of carbohydrate within the Acceptable Macronutrient Distribution Range, Canada, 2015',
    'Percentage of total energy intake from fat': 'Percentage of adults age 19 and over with a usual intake of fat within the Acceptable Macronutrient Distribution Range, Canada, 2015',
    'Percentage of total energy intake from protein': 'Percentage of adults age 19 and over with a usual intake of protein within the Acceptable Macronutrient Distribution Range, Canada, 2015',
    'Potassium': 'Percentage of adults age 19 and over with a usual intake of potassium above the Adequate Intake, Canada, 2015',
    'Sodium': 'Percentage of adults age 19 and over with a usual intake of sodium above the Chronic Disease Risk Reduction intake, Canada, 2015',
    'Vitamin A': 'Percentage of adults age 19 and over with a usual intake of vitamin A below the Estimated Average Requirement, Canada, 2015',
    'Vitamin C': 'Percentage of adults age 19 and over with a usual intake of vitamin C below the Estimated Average Requirement, Canada, 2015',
    'Vitamin D': 'Percentage of adults age 19 and over with a usual intake of vitamin D below the Estimated Average Requirement, Canada, 2015',
    'Zinc': 'Percentage of adults age 19 and over with a usual intake of zinc below the Estimated Average Requirement, Canada, 2015'
};

const nutrientFacts = {
    'Calcium': `Click <a href="#">here</a> for more information on the Sodium intake of Canadians.`,
    'Folate': '',
    'Total dietary fibre': '',
    'Iron': '',
    'Magnesium': '',
    'Percentage of total energy intake from carbohydrates': '',
    'Percentage of total energy intake from fat': '',
    'Percentage of total energy intake from protein': '',
    'Potassium': '',
    'Sodium': '',
    'Vitamin A': '',
    'Vitamin C': '',
    'Vitamin D': `Estimates of the prevalence of inadequate intakes of vitamin D from food must be interpreted with caution. Vitamin D is unique as it can also be synthesized by the body from sunlight (UV radiation). In addition, vitamin D intake from supplements has not been considered in this assessment. While there appears to be a high prevalence of inadequate intakes of vitamin D from dietary sources, available clinical measures do not suggest wide-spread vitamin D deficiency in the Canadian population (<a href="https://www150.statcan.gc.ca/n1/pub/82-003-x/2010001/article/11131-eng.pdf">Langlois et al., Health Reports, 2010</a>; <a href="https://pubmed.ncbi.nlm.nih.gov/21593503-the-vitamin-d-status-of-canadians-relative-to-the-2011-dietary-reference-intakes-an-examination-in-children-and-adults-with-and-without-supplement-use/">Whiting et al., Am J Clin Nutr. 2011)</a>. Vitamin D status in some sub-populations, however, may warrant further consideration.`,
    'Zinc': ''
};

// Grab values from the main data object to populate options from the select dropdown
const sexList = ['Female', 'Male', 'Males and females combined'];

d3.csv("../static/data/geographic-dec2015-en.csv", function (d) {
    return {
        nutrient: d['Nutrient/Item'],
        region: d['Reg_Prov'],
        sex: d['Sex'],
        age: d["Age (years)"],
        n: +d['n'],
        dri_type: d['DRI type'],
        prefix: d['Prefix-EN'],
        percentage: +d['Percentage'],
        percentage_se: +d['SE'],
        ref_value: d['Ref value'],
    };
}).then(function (data) {
    let masterData = d3.nest()
        .key(function (d) {
            return d.sex
        })
        .key(function (d) {
            return d.nutrient
        })
        .object(data);

    // Dropdown menus
    let sexDropdown = d3.select("#sexDropdown");
    let nutrientDropdown = d3.select("#nutrientDropdown");

    // Read in the map data
    d3.json("../static/data/gpr_000b11a_e.json").then(function (json) {
            // Setup dropdown menus
            sexDropdown.append("select")
                .attr("class", "select form-control")
                .attr("id", "sexDropdownSelector")
                .style("width", "100%")
                .on("change", update_data)
                .selectAll("option")
                .data(sexList)
                .enter()
                .append("option")
                .text(function (d) {
                    return d
                });
            $('select option:contains("combined")').prop('selected', true);


            nutrientDropdown.append("select")
                .attr("class", "select form-control")
                .attr("id", "nutrientDropdownSelector")
                .style("width", "100%")
                .on("change", update_data)
                .selectAll("option")
                .data(nutrientList.sort())
                .enter()
                .append("option")
                .text(function (d) {
                    return d
                });
            $('select option:contains("Sodium")').prop('selected', true);


            // Filter the data according to dropdown menu selections
            let sex = $("#sexDropdownSelector option:selected").text();
            let nutrient = $("#nutrientDropdownSelector option:selected").text();

            data = masterData[sex][nutrient];
            // const colorScale = d3.scaleLinear()
            //     .range(["#f7f4f9", "#1371a7"]);
            const colorScale = d3.scaleLinear()
                .domain([0, 50, 100])
                .range(colourRange);

            // colorScale.domain([
            //     d3.min(data, function (d) {
            //         return d.percentage;
            //     }),
            //     d3.max(data, function (d) {
            //         return d.percentage;
            //     })
            // ]);
            //

            // Makes more sense since we're dealing with percentages I think.
            colorScale.domain([0, 100]);

            for (let i = 0; i < data.length; i++) {
                // Grab region name
                let dataRegion = data[i].region;

                // Grab mean data value
                let dataValue = data[i].percentage;

                // Find corresponding region in geoJSON
                for (let j = 0; j < json.features.length; j++) {
                    let jsonRegion = json.features[j].properties.PRENAME;

                    if (dataRegion === jsonRegion) {
                        json.features[j].properties.percentage = dataValue;

                        // Found it, exit geoJSON loop
                        break;
                    }
                }
            }

            let projection = d3.geoAzimuthalEqualArea()
                .rotate([100, -45])
                .center([5, 20])
                .scale([680])
                .translate([w / 2, h / 2]);

            let path = d3.geoPath().projection(projection);

            // Legend setup
            let svgContainer = d3.select("#geolegend");
            let key = svgContainer
                .append("svg")
                .style("display", "block")
                .attr("width", (w / 1.5) + 40)
                .attr("height", (h / 12) + 40)
                .append("g")
                .attr("transform",
                    "translate(" + 10 + "," + 10 + ")");

            let legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "0%")
                .attr("y1", "100%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            const chartTitle = svg.append("g").attr("class", "chart-title");

            update_data();

            function update_data() {
                // Reset data with new dropdown selections
                let sex = $("#sexDropdownSelector option:selected").text();
                let nutrient = $("#nutrientDropdownSelector option:selected").text();
                data = masterData[sex][nutrient];

                // Update title of chart
                let chartTitleText = nutrientTitles[nutrient];

                // Update table
                $(".datatable-body").empty();
                data.forEach(function (d) {
                    $(".datatable-body").append(`<tr role="row">
                            <td>${d.nutrient}</td>
                            <td>${d.region}</td>
                            <td>${d.sex}</td>
                            <td>${d.age}</td>
                            <td>${d.n}</td>
                            <td>${d.percentage}</td>
                            <td>${d.percentage_se}</td>
                            <td>${d.dri_type}</td>
                            <td>${d.ref_value}</td>
                         </tr>`)
                });

                // Update nutrient facts disclaimer
                d3.select('#nutrient-notes').html(`
<!--                <p><strong>Notes</strong></p>-->
                <p>${nutrientFacts[nutrient]}</p>
                `);

                d3.select(".chart-title-text").remove();
                chartTitle.append("text")
                    .attr("class", "chart-title-text")
                    .style("text-anchor", "middle")
                    .style("font-weight", "bold")
                    .attr("x", function (d) {
                        return w / 2;
                    })
                    .attr("y", function (d) {
                        return 0;
                    })
                    .text(chartTitleText)
                    .call(wrap, w); // wrap the text in <= 30 pixels

                // prepare driObject which will be used to draw info on the DRI/reference value
                let driObject = {
                    'dri_type': data[0]['dri_type'],
                    'ref_value_raw': data[0]['ref_value'],
                    'ref_value': null,
                    'ref_min': null,
                    'ref_max': null,
                    'prefix': data[0]['prefix'],
                    'range': false  // whether or not the ref value is a range
                };

                // Logic to parse the reference value which might be null, a number, or a number range
                // TODO: Probably don't need this logic anymore, maybe remove
                if (data[0]['ref_value'].includes("-")) {
                    driObject['ref_min'] = Number(data[0]['ref_value'].split(' - ')[0]);
                    driObject['ref_max'] = Number(data[0]['ref_value'].split(' - ')[1]);
                    driObject['range'] = true;
                } else if (data[0]["ref_value"] !== null && data[0]["ref_value"] !== "") {
                    driObject['ref_value'] = Number(data[0]["ref_value"])
                } else {
                    driObject['ref_value_raw'] = 'N/A';
                }

                colorScale
                    .domain([0, 50, 100])
                    .range(colourRange);

                // Merge new data with geoJSON
                for (let i = 0; i < data.length; i++) {

                    // Grab region name
                    let dataRegion = data[i].region;

                    // Grab mean data value
                    let geoPercentage = data[i].percentage;
                    let geoPercentageSE = data[i].percentage_se;
                    let geoSex = data[i].sex;
                    let geoNutrient = data[i].nutrient;
                    let geoRegion = data[i].region;

                    // Find corresponding region in geoJSON
                    for (let j = 0; j < json.features.length; j++) {
                        let jsonRegion = json.features[j].properties.PRENAME;

                        if (dataRegion === jsonRegion) {
                            json.features[j].properties.percentage = geoPercentage;
                            json.features[j].properties.percentage_se = geoPercentageSE;
                            json.features[j].properties.sex = geoSex;
                            json.features[j].properties.nutrient = geoNutrient;
                            json.features[j].properties.region = geoRegion;

                            // Found it, exit geoJSON loop
                            break;
                        }
                    }
                }

                let maxValueY = 100;
                let minValueY = 0;

                // Cleanup
                svg.selectAll(".regions").remove();
                svgRegion.selectAll(".region-tooltip").remove();

                // Draw map
                svg.append("g").attr("class", "regions")
                    .selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("class", "region-borders")
                    .style('pointer-events', 'all')  // required to enable mouseover and mouseout on svg
                    .style("fill", function (d) {
                        if (d.properties.percentage) {
                            return colorScale(d.properties.percentage);
                        } else {
                            return "#ccc";
                        }
                    })
                    .on("mouseover", function (d) {
                        // Grab the region and store it the global variable
                        hoveredRegion = d.properties.region;

                        // Draw the legend
                        if (!regionList.includes(hoveredRegion)) {
                            d3.select("#legend-tick").remove();  // Remove legend tick for territories
                            return  // Break out of mouse handling if there's no data for region
                        } else {
                            draw_legend(minValueY, maxValueY, nutrient, d.properties.percentage, driObject);
                        }

                        // Texture settings for hovering over regions with textures.js
                        let texture = textures.lines()
                            .size(8)
                            .strokeWidth(2)
                            .background(colorScale(d.properties.percentage));
                        svg.call(texture);
                        d3.select(this).style("fill", texture.url());

                        // Register the hovered region as the current index. Skip this for territories.
                        if (regionList.includes(hoveredRegion)) {
                            currentRegionIndex = regionList.findIndex(x => x === hoveredRegion);
                            // console.log(`region=${hoveredRegion}, index=${currentRegionIndex}`);
                        }

                        // Update the tooltip with hovered map region/DRI info
                        tooltip_hover(d, driObject);

                    })
                    .on("mouseout", function (d) {
                        svgRegion.select(".region-tooltip").remove(); // remove hovered region tooltip
                        d3.select("#region-detail-text").html('<i>Hover your cursor over a region on the map for additional detail.</i>'); // remove hovered region tooltip
                        d3.select("#legend-tick").remove();  // Remove legend tick

                        // Set territories by default to original grey
                        if (typeof d.properties.percentage === "undefined") {
                            d3.select(this).style("fill", "#ccc");
                        }
                        // Restore original colors to regions
                        else {
                            d3.selectAll(".region-borders").style("fill", function (d) {
                                if (d.properties.percentage) {
                                    return colorScale(d.properties.percentage);
                                } else {
                                    return "#ccc";
                                }
                            })
                        }
                    });

                // Draw the legend - pass null into hovered percentage
                draw_legend(minValueY, maxValueY, nutrient, null, driObject);
            }

            function zoomed() {
                d3.select('.region-tooltip').style("stroke-width", 1.5 / d3.event.transform.k + "px");
                d3.select('.region-tooltip').attr("transform", d3.event.transform); // updated for d3 v4
            }

            function tooltip_hover(d, driObject) {
                // Zoom
                let zoom = d3.zoom().on("zoom", zoomed);
                let activeRegion = d.properties.PRENAME;

                // Set text
                d3.select("#region-detail-text").html(`
<div class="col-lg-4 col-md-4 col-sm-4"><strong>Region: </strong> ${activeRegion}</div>
<div class="col-lg-8 col-md-8 col-sm-8"><strong>% ${driObject['prefix']} ${driObject['dri_type']}: </strong> ${d.properties.percentage} (±${d.properties.percentage_se})
</div>
                `);

                //Draw hovered region in detail tooltip
                let bounds = path.bounds(d),
                    dx = bounds[1][0] - bounds[0][0],
                    dy = bounds[1][1] - bounds[0][1],
                    x = (bounds[0][0] + bounds[1][0]) / 2,
                    y = (bounds[0][1] + bounds[1][1]) / 2,
                    scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / wRegion, dy / hRegion))),
                    translate = [wRegion / 2 - scale * x, hRegion / 2 - scale * y];

                svgRegion.append("g").attr("class", "region-tooltip")
                    .selectAll("path")
                    .data(json.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("class", "region-borders")
                    .style('pointer-events', 'all')  // required to enable mouseover and mouseout on svg
                    .style("fill", function (d) {
                        if (d.properties.percentage && d.properties.PRENAME === activeRegion) {
                            return colorScale(d.properties.percentage);
                        } else if (d.properties.PRENAME === activeRegion) {
                            return 'grey';
                        } else {
                            return "transparent";
                        }
                    })
                    .style("stroke-width", 0)
                    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)); // updated for d3 v4
            }

            function previousRegion() {

            }

            function nextRegion() {

            }

            function wrap(text, width) {
                // https://stackoverflow.com/questions/24784302/wrapping-text-in-d3
                text.each(function () {
                    var text = d3.select(this),
                        words = text.text().split(/\s+/).reverse(),
                        word,
                        line = [],
                        lineNumber = 0,
                        lineHeight = 1.1, // ems
                        x = text.attr("x"),
                        y = text.attr("y"),
                        dy = 0, //parseFloat(text.attr("dy")),
                        tspan = text.text(null)
                            .append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", dy + "em");
                    while (word = words.pop()) {
                        line.push(word);
                        tspan.text(line.join(" "));
                        if (tspan.node().getComputedTextLength() > width) {
                            line.pop();
                            tspan.text(line.join(" "));
                            line = [word];
                            tspan = text.append("tspan")
                                .attr("x", x)
                                .attr("y", y)
                                .attr("dy", ++lineNumber * lineHeight + dy + "em")
                                .text(word);
                        }
                    }
                });
            }


            function draw_legend(minValueY, maxValueY, selectedNutrient, hoveredPercentage, driObject) {
                //Update legend (Derived from https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583)
                key.selectAll("rect").remove();
                key.select("#legend-label").remove();

                // Adjust min and max values slightly so the legend looks nicer
                // maxValueY = maxValueY * 1.03;
                // minValueY = minValueY * 0.97;

                legend.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", colorScale(minValueY))
                    .attr("stop-opacity", 1);
                legend.append("stop")
                    .attr("offset", "50%")
                    .attr("stop-color", colorScale((maxValueY + minValueY) / 2))
                    .attr("stop-opacity", 1);
                legend.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", colorScale(maxValueY))
                    .attr("stop-opacity", 1);
                key.append("rect")
                    .attr("width", (w / 1.5))
                    .attr("height", (h / 12) - 28)
                    .style("fill", "url(#gradient)")
                    .attr("transform", "translate(0,10)");

                let x = d3.scaleLinear()
                    .domain([maxValueY, minValueY])
                    .range([w / 1.5, 0]);
                let xAxis = d3.axisBottom()
                    .scale(x)
                    .ticks(4);

                key.select(".x.axis").remove();

                key.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,30)")
                    .call(xAxis);

                key.append("text")
                    .attr("id", "legend-label")
                    .attr("transform",
                        "translate(" + (w / 3) + " ," +
                        (h / 12 + 25) + ")")
                    .style("text-anchor", "middle")
                    .text(function () {
                        return `Percentage ${driObject.prefix.toLowerCase()} ${driObject.dri_type}`
                    });

                // Draw a tick on the legend with hoveredPercentage
                if (hoveredPercentage === null) {
                } else {
                    key.append("rect")
                        .attr("id", "legend-tick")
                        .attr("x", x(hoveredPercentage))
                        .attr("y", 0)
                        .attr("width", 2)
                        .attr("height", 20)
                }
            }
        }
    );
});

