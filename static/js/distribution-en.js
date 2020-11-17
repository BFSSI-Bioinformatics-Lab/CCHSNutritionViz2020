$(document).on("wb-ready.wb", function (event) {
    //Width and height
    const margin = {top: 120, right: 80, bottom: 60, left: 80};
    const w = 780 - margin.left - margin.right;
    const h = 480 - margin.top - margin.bottom;
    const chartFontSize = '14px';

    Promise.all([
        d3.csv("../static/data/distributions-en-20th.csv"),
        d3.csv("../static/data/data_table_age-corrected-en.csv"),
        // Values were generated with ./data_processing/reformat_distribution_data.ipynb script
        d3.json("../static/data/distribution_coding_object.json")
    ]).then(function (files) {

        // Unpack csv files into distribution data, table data
        let data = files[0]
        let table_data = files[1]
        const coding_object = files[2]

        // Iterate over every column and cast it to a float if it looks like a number
        data.forEach(function (obj) {
                Object.keys(obj).map(function (a) {
                    if (!isNaN(obj[a])) {
                        obj[a] = parseFloat(obj[a]);
                    }
                })
            }
        );

        table_data.forEach(function (obj) {
                Object.keys(obj).map(function (a) {
                    if (!isNaN(obj[a])) {
                        obj[a] = parseFloat(obj[a]);
                    }
                })
            }
        );

        // Nest data by age, nutrient, sex
        data = d3.nest()
            .key(function (d) {
                return d['Age (years)'];
            })
            .key(function (d) {
                return d['Nutrient/Item (unit)'];
            })
            .key(function (d) {
                return d['Sex'];
            })
            .object(data);

        // Unaltered data goes here
        const master_data = data;

        // Labels for charts
        const yearCategories = [2015];
        const ageCategories = [
            // '1-3', '4-8',
            '9 to 13', '14 to 18', '19 to 30', '31 to 50', '51 to 70',
            '19 and over', '71 and over'
        ];

        const nutrientList = [
            'Calcium (mg/d)',
            'Vitamin D (mcg/d)',
            'Iron (mg/d)',
            'Sodium (mg/d)',
            'Potassium (mg/d)',
            'Percentage of total energy intake from saturated fats',
            'Percentage of total energy intake from sugars',
            'Total energy intake (kcal/d)',
            'Total dietary fibre (g/d)',
            'Folate (DFE/d)',
            'Vitamin B12 (mcg/d)',
            'Total carbohydrates (g/d)',
            'Total sugars (g/d)',
            'Vitamin C (mg/d)',
            'Zinc (mg/d)',
            'Magnesium (mg/d)',
            'Vitamin A (RAE/d)',
            'Percentage of total energy intake from carbohydrates',
            'Percentage of total energy intake from fat',
            'Percentage of total energy intake from protein',
            'Cholesterol (mg/d)',
            'Phosphorus (mg/d)',
            'Vitamin B6 (mg/d)',
            'Niacin (NE/d)',
            'Riboflavin (mg/d)',
            'Thiamin (mg/d)',
            'Percentage of total energy intake from linoleic acid',
            'Percentage of total energy intake from linolenic acid'
        ].sort();
        const sexCategories = [
            'Male',
            'Female',
            // 'Both'
        ];

        // Filter the data according to dropdown menu selections
        const sexDropdown = d3.select("#sexDropdown");
        const nutrientDropdown = d3.select("#nutrientDropdown");
        const ageDropdown = d3.select("#ageDropdown");

        // Setup dropdown menus
        sexDropdown.append("select")
            .attr("class", "select form-control")
            .attr("id", "sexDropdownSelector")
            .style("width", "100%")
            .on("change", draw_curves)
            .selectAll("option")
            .data(sexCategories)
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            });
        $('select option:contains("Male")').prop('selected', true);


        ageDropdown.append("select")
            .attr("class", "select form-control")
            .attr("id", "ageDropdownSelector")
            .style("width", "100%")
            .on("change", draw_curves)
            .selectAll("option")
            .data(ageCategories)
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            });
        $('select option:contains("19 and over")').prop('selected', true);


        nutrientDropdown.append("select")
            .attr("class", "select form-control")
            .attr("id", "nutrientDropdownSelector")
            .style("width", "100%")
            .on("change", draw_curves)
            .selectAll("option")
            .data(nutrientList)
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            });
        // Set default nutrient
        $('select option:contains("Total energy intake")').prop('selected', true);

        let sex = $("#sexDropdownSelector option:selected").text();
        let nutrient = $("#nutrientDropdownSelector option:selected").text();
        let age = $("#ageDropdownSelector option:selected").text();

        // Filter data according to dropdown selection
        data = master_data[age][nutrient][sex];

        //Create SVG element
        let svgContainer = d3.select("#distribution-chart");
        let svg = svgContainer
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        let renderAdequacyTracker = {
            render_exceedance: false,
            render_adequacy: false
        };

        // xAxis for mean nutrient values
        let xExtent = d3.extent(data, d => d.x);
        let xAxis = d3.scaleLinear()
            .domain([xExtent[0], xExtent[1]]) // data range
            .range([0, w]); // pixel range

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${h})`)
            .call(d3.axisBottom(xAxis));

        svg.append("text")
            .attr("transform", `translate(${w / 2},${h + margin.top - 20})`)
            .attr("class", "x-axis-text")
            .style("text-anchor", "middle")
            .attr("font-family", "Helvetica,Arial,sans-serif")
            .style("font-weight", "bold")
            .style("font-size", chartFontSize);

        // yAxis for density function values
        let yExtent = d3.extent(data, d => d.y);
        let yAxis = d3.scaleLinear()
            .domain([yExtent[0], yExtent[1]])
            .range([h, 0]);
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yAxis));

        // Y Axis placement and text label
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "rotate(-90)")
            .call(yAxis);

        svg.append("text")
            .attr("id", "y-axis-text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 50)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("font-family", "Helvetica,Arial,sans-serif")
            .style("font-weight", "bold")
            .style("font-size", chartFontSize)
            .text("Relative probability density");

        // Chart title
        const chartTitle = svg.append("g").attr("class", "chart-title");

        const colourScale = d3.scaleOrdinal().range(["#1371a7", "#e200c1"]);

        // Setup area curve container
        let curves = svg.append("g").attr("class", "curves");

        // track whether or not to draw limit line
        let drawLimit = true;

        // Checkbox functionality
        d3.select("#checkboxLimit").attr("checked", "checked").on("change", limit_tickbox);

        // Plot UL/AI
        let referenceCode = 0;
        let adequacyVal = 0;
        let exceedanceVal = 0;
        let ul = svg.append("g").attr("class", "upper-limit");
        let lineGenerator = d3.line();
        let activeReferenceObject = {};

        // Legend
        let legend = svg.selectAll(".legend")
            .data(yearCategories)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            })
            .style("opacity", "1");

        // Enter the initial dataset
        draw_curves();

        function draw_limit() {
            // Prepare adequacy line data
            adequacyVal = activeReferenceObject['Adequacy-Value'];
            let adequacyPoints = [
                [xAxis(adequacyVal), yAxis(0)],
                [xAxis(adequacyVal), yAxis(yExtent[1])],
            ];
            let adequacyPathData = lineGenerator(adequacyPoints);

            // Adequacy line
            ul.selectAll(".adequacy-line").data([null]).join(
                enter => enter
                    .append("path")
                    .attr("class", "adequacy-line")
                    .style("stroke", "#52873f")
                    // .style("stroke-dasharray", "3, 3")
                    .style("opacity", 1)
                    .attr('d', function () {
                        if (drawLimit && renderAdequacyTracker.render_adequacy) {
                            return adequacyPathData
                        } else {
                            return 0
                        }
                    }),
                update => update
                    .attr('d', function () {
                            if (drawLimit && renderAdequacyTracker.render_adequacy) {
                                return adequacyPathData
                            } else {
                                return 0
                            }
                        }
                    ));

            let textPadding_line1 = 22; // Controls height of text above yMax
            let textPadding_line2 = 5; // Controls height of text above yMax
            let units = extractUnitsFromNutrient(nutrient);

            // Correct for the 'Percentage' values
            if (units === "") {
                units = "%"
            }

            // Adequacy text
            let adequacyTypeText = null;
            if (typeof activeReferenceObject['Adequacy-Type'] == "string") {
                adequacyTypeText = activeReferenceObject['Adequacy-Type'];
            }

            ul.selectAll(".adequacy-line-text-line1").data([null]).join(
                enter => enter
                    .append("text")
                    .attr("class", "adequacy-line-text-line1")
                    .attr("x", xAxis(adequacyVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line1)
                    .style("text-anchor", "middle")
                    .style("font-size", chartFontSize)
                    .text(adequacyTypeText),
                update => update
                    .attr("x", xAxis(adequacyVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line1)
                    .text(function () {
                        if (drawLimit && renderAdequacyTracker.render_adequacy) {
                            return adequacyTypeText
                        } else {
                            return null;
                        }
                    })
            );

            ul.selectAll(".adequacy-line-text-line2").data([null]).join(
                enter => enter
                    .append("text")
                    .attr("class", "adequacy-line-text-line2")
                    .attr("x", xAxis(adequacyVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line2)
                    .style("text-anchor", "middle")
                    .style("font-size", chartFontSize)
                    .text(adequacyTypeText),
                update => update
                    .attr("x", xAxis(adequacyVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line2)
                    .text(function () {
                        if (drawLimit && renderAdequacyTracker.render_adequacy) {
                            if (units === "%") {
                                return `${adequacyVal}${units}`
                            } else {
                                return `${adequacyVal} ${units}`
                            }
                        } else {
                            return null;
                        }
                    })
            );

            // Prepare exceedance line data
            exceedanceVal = activeReferenceObject['Excess-Value'];
            let exceedancePoints

            if (exceedanceVal !== null) {
                exceedancePoints = [
                    [xAxis(exceedanceVal), yAxis(0)],
                    [xAxis(exceedanceVal), yAxis(yExtent[1])],
                ];
            } else {
                exceedancePoints = [[0, 0], [0, 0],]; // Draw nothing if exceedance value is null
            }

            let exceedancePathData = lineGenerator(exceedancePoints);

            // Exceedance line
            ul.selectAll(".exceedance-line").data([null]).join(
                enter => enter
                    .append("path")
                    .attr("class", "exceedance-line")
                    .style("stroke", "#ab6c22")
                    // .style("stroke-dasharray", "3, 3")
                    .style("opacity", 1)
                    .attr('d', function () {
                        if (drawLimit) {
                            return exceedancePathData
                        } else {
                            return 0
                        }
                    }),
                update => update
                    .attr('d', function () {
                            if (drawLimit && renderAdequacyTracker.render_exceedance) {
                                return exceedancePathData
                            } else {
                                return 0
                            }
                        }
                    ));

            // Exceedance text
            let exceedanceTypeText = null;
            if (typeof activeReferenceObject['Excess-Type'] == "string") {
                exceedanceTypeText = activeReferenceObject['Excess-Type'];
            }
            ul.selectAll(".exceedance-line-text-line1").data([null]).join(
                enter => enter
                    .append("text")
                    .attr("class", "exceedance-line-text-line1")
                    .attr("x", xAxis(exceedanceVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line1)
                    .style("text-anchor", "middle")
                    .style("font-size", chartFontSize)
                    .text(exceedanceTypeText),
                update => update
                    .attr("x", xAxis(exceedanceVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line1)
                    .text(function () {
                        if (drawLimit && renderAdequacyTracker.render_exceedance) {
                            return exceedanceTypeText
                        } else {
                            return null;
                        }
                    })
            );

            ul.selectAll(".exceedance-line-text-line2").data([null]).join(
                enter => enter
                    .append("text")
                    .attr("class", "exceedance-line-text-line2")
                    .attr("x", xAxis(exceedanceVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line2)
                    .style("text-anchor", "middle")
                    .style("font-size", chartFontSize)
                    .text(exceedanceTypeText),
                update => update
                    .attr("x", xAxis(exceedanceVal))
                    .attr("y", yAxis(yExtent[1]) - textPadding_line2)
                    .text(function () {
                        if (drawLimit && renderAdequacyTracker.render_exceedance) {
                            if (units === "%") {
                                return `${exceedanceVal}${units}`
                            } else {
                                return `${exceedanceVal} ${units}`
                            }
                        } else {
                            return null;
                        }
                    })
            )
        }

        function update_data_table(table_data, sex, nutrient, age) {
            /*
                    <th>Nutrient/Item (unit)</th>
                    <th>Reg_Prov</th>
                    <th>Sex</th>
                    <th>Age (years)</th>
                    <th>n</th>
                    <th>Mean</th>
                    <th>SE_Mean</th>
             */

            // Only include columns we are interested in displaying
            let keys_to_keep = ['Nutrient/Item (unit)', 'Reg_Prov', 'Sex', 'Age (years)', 'n', 'Mean', 'SE_Mean']
            const table_data_reduced = table_data.map(e => {
                const obj = {};
                keys_to_keep.forEach(k => obj[k] = e[k])
                return obj;
            });

            // Filter data to only values contained in user selection
            let filtered_data = table_data_reduced.filter(function (d) {
                return d['Sex'] === sex && d['Nutrient/Item (unit)'] === nutrient && d['Age (years)'] === age
            })

            // Update table
            let datatable = $('.wb-tables').DataTable()
            datatable.clear()
            datatable.rows.add(filtered_data).draw()
        }

        function wrap(text, width) {
            // https://stackoverflow.com/questions/24784302/wrapping-text-in-d3
            text.each(function () {
                let text = d3.select(this),
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

        function draw_curves() {
            // Main method for drawing the curves, limit lines, and updating the axes

            // Grab most recent user selected data
            age = $("#ageDropdownSelector option:selected").text();
            nutrient = $("#nutrientDropdownSelector option:selected").text();
            sex = $("#sexDropdownSelector option:selected").text();

            // Store new dataset
            data = master_data[age][nutrient][sex];

            // Grab reference code --> gets used in draw_limit() and retrieves pertinent adequacy/exceedance reference code
            referenceCode = data[0]['ref_code'];
            activeReferenceObject = retrieve_reference_values(referenceCode);
            update_render_tracker_adequacy(activeReferenceObject);

            // Update title of chart
            let chartTitleText = `${nutrient} usual intake distribution, ${sex}, ${age}, Canada, 2015`;

            // Chart title
            d3.select(".chart-title-text").remove();
            chartTitle.append("text")
                .attr("class", "chart-title-text")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
                .attr("x", function (d) {
                    return w / 2;
                })
                .attr("y", function (d) {
                    return -60;
                })
                .text(chartTitleText)
                .call(wrap, w); // wrap the text in <= 30 pixels

            // Update x-axis min and max values
            xExtent = d3.extent(data, d => d.x);
            let minX = xExtent[0];
            let maxX = xExtent[1];

            if (drawLimit) {
                // Determine if maxX needs to be adjusted
                if (renderAdequacyTracker.render_adequacy && (activeReferenceObject['Adequacy-Value'] > maxX)) {
                    maxX = activeReferenceObject['Adequacy-Value']
                }
                if (renderAdequacyTracker.render_exceedance && (activeReferenceObject['Excess-Value'] > maxX)) {
                    maxX = activeReferenceObject['Excess-Value']
                }

                // Determine if minX needs to be adjusted
                if (renderAdequacyTracker.render_adequacy && (activeReferenceObject['Adequacy-Value'] < minX)) {
                    minX = activeReferenceObject['Adequacy-Value']
                }
                if (renderAdequacyTracker.render_exceedance && (activeReferenceObject['Excess-Value'] < minX)) {
                    minX = activeReferenceObject['Excess-Value']
                }
            }

            // Update x-axis
            xAxis = d3.scaleLinear()
                .domain([minX, maxX]) // data range
                .range([0, w]); // pixel range

            // x-axis text
            svg.selectAll(".x-axis-text").remove();  // Remove old text
            svg.append("text")
                .attr("transform", `translate(${w / 2},${h + margin.bottom - 20})`)
                .attr("class", "x-axis-text")
                .style("text-anchor", "middle")
                .attr("font-family", "Helvetica,Arial,sans-serif")
                .style("font-weight", "bold")
                .style("font-size", chartFontSize)
                .text(`${nutrient}`);

            // Update y-axis
            yExtent = d3.extent(data, d => d.y);
            yAxis = d3.scaleLinear()
                .domain([yExtent[0], yExtent[1]])
                .range([h, 0]);

            svg.select(".y-axis").transition().duration(500).call(d3.axisLeft(yAxis));
            svg.select(".x-axis").call(d3.axisBottom(xAxis));

            svg.selectAll(".y-axis .tick").remove();  // This removes the ticks and text for the y-axis

            // Nest data by year so we can draw the two curves separately
            data = d3.nest()
                .key(function (d) {
                    return d['Year'];
                })
                .object(data);

            // Draw area curve for each year
            for (const year of yearCategories) {
                curves.selectAll(`.curve-${year}`)
                    .data([data[year]])
                    .join(
                        enter => enter.append("path")
                            .attr("class", `curve-${year}`)
                            .attr("fill", colourScale(year))
                            .attr("fill-opacity", "0")
                            .attr("stroke", colourScale(year))
                            .attr("stroke-width", 2)
                            .attr("stroke-linejoin", "round")
                            .attr("d", d3.line()
                                .curve(d3.curveBasis)
                                .x(function (d) {
                                    return xAxis(d.x);
                                })
                                .y(function (d) {
                                    return yAxis(d.y);
                                })
                            ),
                        update => update.transition().duration(500)
                            // Stroke width shrinks to 0 if curve is disabled by user
                            .attr("stroke-width", 2)
                            .attr("d", d3.line()
                                .curve(d3.curveBasis)
                                .x(function (d) {
                                    return xAxis(d.x);
                                })
                                .y(function (d) {
                                    return yAxis(d.y);
                                })
                            )
                    );
            }
            draw_limit();
            update_data_table(table_data, sex, nutrient, age);
        }

        function update_render_tracker_adequacy(reference_object) {
            // There are cases where one value is available, both values are available, and neither value is available.
            // The graphic must respond accordingly.

            // True if there's a string value available
            let adequacy_type_available = typeof (reference_object['Adequacy-Type']) == "string";
            let exceedance_type_available = typeof (reference_object['Excess-Type']) == "string";

            // Update the render object
            renderAdequacyTracker.render_adequacy = adequacy_type_available;
            renderAdequacyTracker.render_exceedance = exceedance_type_available;
        }

        function retrieve_reference_values(refCode) {
            // Grabs the Adequacy-Value, Adequacy-Type, Excess-Value, and Excess-Type for a particular reference code
            let ids = [refCode];
            let reference_object = coding_object.filter(i => ids.includes(i['Ref-code']));
            return reference_object[0]['metadata']
        }

        function extractUnitsFromNutrient(nutrient) {
            // This will return the term inside the brackets
            let re = new RegExp('\\(([^)]+)\\)');
            let result = re.exec(nutrient);
            try {
                return result[1];
            } catch (err) {
                return '';
            }
        }

        function limit_tickbox() {
            // Updates the drawLimit bool depending on user selection for the Limit Value(s) tickbox
            drawLimit = !!d3.select("#checkboxLimit").property("checked");
            draw_curves();
        }
    });
})