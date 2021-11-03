//Width and height of main map
const margin = {top: 30, right: 40, bottom: 0, left: 40};
const w = 580 - margin.left - margin.right;
const h = 720 - margin.top - margin.bottom;

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
    .attr("id", "svg-container")
    .style("display", "block")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("id", "svg-map")
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
//let clickRegion = null;

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

const nutrientList = [
    'Calcium',
    'Folate',
    'Iron',
    'Magnesium',
    'Percentage of total energy intake from carbohydrates',
    'Percentage of total energy intake from fat',
    'Percentage of total energy intake from protein',
    'Potassium',
    'Sodium',
    'Vitamin A',
    'Vitamin B6',
    'Vitamin C',
    'Vitamin D',
    'Zinc',
].sort();

const ageList = [
    '1 to 8 years',
    '9 to 18 years',
    '19 years and over',
];

const sexList = [
    'Female',
    'Male',
    'Males and females combined'
].sort();

// Generates appropriate chart title for each nutrient
const generateTitle = (sex, age, nutrient) => {
    let cdrrNutrients = ['Sodium']
    let earNutrients = ['Calcium', 'Folate', 'Vitamin A', 'Vitamin B6', 'Vitamin C', 'Vitamin D', 'Zinc', 'Magnesium']
    let aiNutrients = ['Potassium']
    let inadequateNutrients = ['Iron']
    let amdrNutrients = [
        'Percentage of total energy intake from carbohydrates',
        'Percentage of total energy intake from fat',
        'Percentage of total energy intake from protein'
    ]

    // Age statement
    let ageString = ''
    switch (age) {
        case '1 to 8 years':
            ageString += 'children age 1 to 8 years'
            break
        case '9 to 18 years':
            ageString += 'adolescents age 9 to 18 years'
            break
        case '19 years and over':
            ageString += 'adults age 19 and over'
            break
        default:
            console.log(`Error parsing age string "${age}"`)
    }

    // Sex statement
    let sexString = ''
    switch (sex) {
        case 'Male':
            sexString += ', male,'
            break
        case 'Female':
            sexString += ', female,'
            break
        case 'Males and females combined':
            sexString += ''
            break
        default:
            console.log(`Error parsing sex string "${sex}"`)
    }

    // Adequacy statement
    let adequacyString = ''
    let ironBool = false
    if (cdrrNutrients.includes(nutrient)) {
        adequacyString += 'above the Chronic Disease Risk Reduction intake'
    } else if (amdrNutrients.includes(nutrient)) {
        // clean up text for improved readability
        nutrient = nutrient.replace('Percentage of total energy intake from', '')
        adequacyString += 'within the Acceptable Macronutrient Distribution Range'
    } else if (earNutrients.includes(nutrient)) {
        adequacyString += 'below the Estimated Average Requirement'
    } else if (aiNutrients.includes(nutrient)) {
        adequacyString += 'above the Adequate Intake'
    } else if (inadequateNutrients.includes(nutrient)) {
        adequacyString += 'inadequate iron intake'
        ironBool = true
    }

    if (ironBool) {
        return `Percentage of ${ageString}${sexString} with ${adequacyString}, Canada, 2015`
    } else {
        return `Percentage of ${ageString}${sexString} with a usual intake of ${nutrient} ${adequacyString}, Canada, 2015`
    }
}

// Grab values from the main data object to populate options from the select dropdown
const nutrientFacts = {

    'Folate': `
    <p>Folate is a generic term that includes the naturally occurring form found in food and folic acid found in supplements and fortified foods. The requirements for folate are based on the amount of dietary folate equivalents (DFEs) needed to maintain red blood cell folate concentrations. DFEs adjust for differences in absorption between naturally-occurring food folate and synthetic folic acid. While there appears to be a relatively high prevalence of inadequate intakes of folate, red blood cell folate measures, an indicator of folate status, suggest a very low prevalence of folate deficiency in the Canadian population.<super>1, 2</super></p>
    <p>Women capable of becoming pregnant require special consideration when it comes to folate intake. To reduce the risk of neural tube defects, women who could become pregnant should take a multivitamin containing 400 µg of folic acid per day in addition to the amount of folate in a healthy diet. Red blood cell folate measures suggest that some Canadian women of childbearing age have levels below that considered optimal for greatest reduction of risk of neural tube defects.<super>1,2</super></p>
    <p><strong>References:</strong></p> 
    <ol>
        <li>
        Statistics Canada. Table  13-10-0336-01   Nutritional status of the household population. DOI:   https://doi.org/10.25318/1310033601-eng
        </li>
        <li>Colapinto, Cynthia K., Deborah L. O’Connor and Mark S. Tremblay. 2011. "Folate status of the population in the Canadian Health Measures Survey." Canadian Medical Association Journal. Vol. 183, no. 2. February. pp. E100 to E106.
        http://www.cmaj.ca/content/183/2/E100.full.pdf+html
        </li>
    </ol>`,

    //'Total dietary fibre': `
    //<p>Total dietary fibre: Although the Institute of Medicine has established an Adequate Intake (AI) for total dietary fibre, no comparison is presented in the table (IOM, 2005). In addition to the fact that the AI for any nutrient has limited uses in assessing groups (Health Canada, 2017), the AI for dietary fibre was determined in relation to coronary heart disease risk. Health Canada’s definition for dietary fibre recognizes the role that fibre plays in supplying fermentation products to colonocytes and on laxation. (Health Canada, 2010) No DRIs have been established for these effects. For more information on the methods used to analyze dietary fibre for this survey, please refer to the Canadian Nutrient File – Users Guide available at: <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrient-data/canadian-nutrient-file-compilation-canadian-food-composition-data-users-guide.html">https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrient-data/canadian-nutrient-file-compilation-canadian-food-composition-data-users-guide.html</a></p>
    //<p><strong>References:</strong></p>
    //<ol>
    //    <li>IOM (Institute of Medicine). Dietary Reference Intakes for energy, carbohydrate, fibre, fat, fatty acids, cholesterol, protein, and amino acids (Macronutrients). 2005. Food and Nutrition Board, Institute of Medicine. The National Academies Press, Washington, DC.</li>
    //    <li>Health Canada. <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/reference-guide-understanding-using-data-2015.html"
    //        target="_blank">Reference Guide to Understanding and Using the Data - 2015 Canadian Community Health Survey- Nutrition. 2017</a>.</li>
    //    <li>Health Canada. <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/public-involvement-partnerships/proposed-policy-definition-energy-value-dietary-fibre/consultation.html"
    //    target="_blank">Proposed Policy: Definition and Energy Value for Dietary Fibre</a>. Food Directorate, Health Products and Food Branch, Health Canada. 2010.</li>
    //</ol>`,


    'Iron': `Iron inadequacy was estimated using the full probability method as described in section 2.3.4 of the <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/compendium-data-tables-intakes-energy-nutrients-other-food.html" target="_blank">Methodology Document.</a>`,

    'Percentage of total energy intake from saturated fats': `
        <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/compendium-data-tables-intakes-energy-nutrients-other-food.html" target="_blank">Canada’s Dietary Guidelines</a> recommend that Canadians consume less than 10% of total energy intake from saturated fat. 
    `,
    // 'Percentage of total energy intake from carbohydrates': `
    // <p>The interpretation of self-reported energy intake should be done with caution as energy intake tends to be underestimated by survey respondents. The Institute of Medicine (IOM) suggests using indicators of relative body weight, such as the Body Mass Index (BMI), as markers of energy intake adequacy within groups. Statistics Canada has released 2015 CCHS – Nutrition results for measured BMI in adults<super>1</super> and children<super>2</super>. </p>
    // <p><strong>References:</strong></p>
    // <ol>
    //     <li>Statistics Canada.  Table  13-10-0794-01   Measured adult body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI: <a href="https://doi.org/10.25318/1310079401-eng">https://doi.org/10.25318/1310079401-eng</a></li>
    //     <li>Statistics Canada.  Table  13-10-0795-01   Measured children and youth body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI:   <a href="https://doi.org/10.25318/1310079501-eng">https://doi.org/10.25318/1310079501-eng</a></li>
    // </ol>`,
    // 'Percentage of total energy intake from protein': `
    // <p>The interpretation of self-reported energy intake should be done with caution as energy intake tends to be underestimated by survey respondents. The Institute of Medicine (IOM) suggests using indicators of relative body weight, such as the Body Mass Index (BMI), as markers of energy intake adequacy within groups. Statistics Canada has released 2015 CCHS – Nutrition results for measured BMI in adults<super>1</super> and children<super>2</super>. </p>
    // <p><strong>References:</strong></p>
    // <ol>
    //     <li>Statistics Canada.  Table  13-10-0794-01   Measured adult body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI: <a href="https://doi.org/10.25318/1310079401-eng">https://doi.org/10.25318/1310079401-eng</a></li>
    //     <li>Statistics Canada.  Table  13-10-0795-01   Measured children and youth body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI:   <a href="https://doi.org/10.25318/1310079501-eng">https://doi.org/10.25318/1310079501-eng</a></li>
    // </ol>`,

    'Sodium': `For more information on sodium intakes, please consult<a
                    href="https://www.canada.ca/en/health-canada/services/publications/food-nutrition/sodium-intake-canadians-2017.html"
                    target="_blank">Health Canada's Sodium intake of Canadians in 2017</a> report.`,
    'Vitamin A': `No prevalence of intakes above the UL are shown for vitamin A. The UL for vitamin A applies to preformed vitamin A only, and those estimates had not yet been conducted at the time these tables were produced.`,
    'Vitamin D': `
<p><strong>Estimates of the prevalence of inadequate intakes of vitamin D from food must be interpreted with caution.</strong> </p>
<p>Vitamin D is unique as it can also be synthesized by the body from sunlight (UV radiation). In addition, vitamin D intake 
from supplements has not been considered in this assessment. While there appears to be a high prevalence of inadequate 
intakes of vitamin D from dietary sources, available clinical measures do not suggest wide-spread vitamin D deficiency
 in the Canadian population (<a href="https://www150.statcan.gc.ca/n1/pub/82-003-x/2010001/article/11131-eng.pdf" target="_blank">Langlois et al., Health Reports, 2010</a>;
  <a href="https://pubmed.ncbi.nlm.nih.gov/21593503-the-vitamin-d-status-of-canadians-relative-to-the-2011-dietary-reference-intakes-an-examination-in-children-and-adults-with-and-without-supplement-use/" target="_blank">Whiting et al., Am J Clin Nutr. 2011)</a>.
   Vitamin D status in some sub-populations, however, may warrant further consideration.
   </p>
   <p><strong>References:</strong></p>
   <ol>
        <li>Langlois K, Greene-Finestone L, Little J, Hidiroglou N, Whiting S. Vitamin D status of Canadians as measured in the 2007 to 2009 Canadian Health Measures Survey. Health Rep. 2010;21(1):47–55.</li>
        <li>Whiting SJ, Langlois KA, Vatanparast H, Greene-Finestone LS. The vitamin D status of Canadians relative to the 2011 Dietary Reference Intakes: an examination in children and adults with and without supplement use. Am J Clin Nutr. 2011;94(1):128–135. doi:10.3945/ajcn.111.013268</li>
        <li>Statistics Canada. <a href="https://www150.statcan.gc.ca/n1/daily-quotidien/190206/dq190206c-eng.htm" 
        target="_blank">Canadian Health Measures Survey: Non-environmental laboratory and medication data, 2016 and 2017</a>. The Daily. 2019.</li>
   </ol>`
};

d3.csv("../static/data/geographic-oct2020-en.csv", function (d) {
    return {
        nutrient: d['Nutrient/Item'],
        region: d['Reg_Prov'],
        sex: d['Sex'],
        age: d["Age (years)"],
        n: +d['n'],
        dri_type: d['DRI type'],
        prefix: d['Prefix-EN'],
        percentage: d['Percentage'],
        percentage_se: +d['SE'],
        flag: d['E flag'],
        ref_value: d['Ref value'],
        ref_value_unit: d['Ref value unit_EN'],
    };
}).then(function (data) {
    let masterData = d3.nest()
        .key(function (d) {
            return d.sex
        })
        .key(function (d) {
            return d.age
        })
        .key(function (d) {
            return d.nutrient
        })
        .object(data);

    // Dropdown menus
    let sexDropdown = d3.select("#sexDropdown");
    let ageDropdown = d3.select("#ageDropdown");
    let nutrientDropdown = d3.select("#nutrientDropdown");

    /*
    SHAPEFILE:
        1. Retrieved Cartographic Boundary File from here:
        https://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/bound-limit-2011-eng.cfm
        2. Dropped contents into www.mapshaper.com and exported to GeoJSON
    */
    d3.json("../static/data/gpr_000b11a_e.json").then(function (json) {
            // Setup dropdown menus and set default values
            initializeDropdowns("Males and females combined", "19 years and over", "Sodium")

            // Filter the data according to dropdown menu selections
            let sex = $("#sexDropdownSelector option:selected").text();
            let age = $("#ageDropdownSelector option:selected").text();
            let nutrient = $("#nutrientDropdownSelector option:selected").text();
            data = masterData[sex][age][nutrient];

            const colorScale = d3.scaleLinear()
                .domain([0, 50, 100])
                .range(colourRange);
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
                        break; // Found it, exit geoJSON loop
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
            let svgContainer = d3.select("#svg-container");
            let key = svgContainer
                .append("g") //.append("g") // if the key is the svg-map to have legend inside
                .style("display", "block")
                .attr("width", (w / 1.5) + 40)
                .attr("height", (h / 12) + 40)
                .append("g")
                .attr("transform",
                    "translate(" + (w / 4) + "," + (h-60) + ")"); // "translate(" + 10 + "," +
        // 10 + ")");

            let legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "0%")
                .attr("y1", "100%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            const chartTitle = svg.append("g").attr("class", "chart-title");

            // Add data source under map
            const mapSource = d3.select("#svg-container")
                .append('g').append('text')
                .style("text-anchor", "middle")
                .attr("x", function (d) {
                        return w / 2 + margin.left;
                    })
                    .attr("y", function (d) {
                        return h+65;
                    })
                .text('Data Source: Statistics Canada, 2015 Canadian Community Health Survey ' +
                    '- Nutrition, 2015.')
                .call(wrap, w);

            updateData();

            function initializeDropdowns(selectedSex, selectedAge, selectedNutrient) {
                // Method to populate dropdown options. Some options are not available for certain selections
                // (e.g. Vitamin B6 is only available for 19 years and over) and this code accounts for that.

                let validNutrientsForChildren = [
                    'Calcium',
                    'Percentage of total energy intake from carbohydrates',
                    'Percentage of total energy intake from fat',
                    'Percentage of total energy intake from protein',
                    'Potassium',
                    'Sodium',
                    'Vitamin D'
                ].sort()

                let validNutrientsForAdolescents = [
                    'Calcium',
                    'Folate',
                    'Magnesium',
                    'Percentage of total energy intake from carbohydrates',
                    'Percentage of total energy intake from fat',
                    'Percentage of total energy intake from protein',
                    'Potassium',
                    'Sodium',
                    'Vitamin A',
                    'Vitamin C',
                    'Vitamin D',
                    'Zinc',
                    'Iron',
                ].sort()

                let validNutrientsForAdults = [
                    'Calcium',
                    'Folate',
                    'Iron',
                    'Magnesium',
                    'Percentage of total energy intake from carbohydrates',
                    'Percentage of total energy intake from fat',
                    'Percentage of total energy intake from protein',
                    'Potassium',
                    'Sodium',
                    'Vitamin A',
                    'Vitamin C',
                    'Vitamin D',
                    'Zinc',
                    'Vitamin B6'
                ].sort()

                // Initialize
                let ageToDisplay
                let nutrientsToDisplay
                let sexToDisplay

                // Set ages to display by selected sex
                if (selectedSex === 'Male' || selectedSex === 'Female') {
                    ageToDisplay = ['19 years and over']
                } else {
                    ageToDisplay = ['1 to 8 years', '9 to 18 years', '19 years and over']
                }

                // Set nutrients/sex to display by selected age
                if (selectedAge === '1 to 8 years') {
                    nutrientsToDisplay = validNutrientsForChildren
                    sexToDisplay = ['Males and females combined']
                } else if (selectedAge === '9 to 18 years') {
                    nutrientsToDisplay = validNutrientsForAdolescents
                    sexToDisplay = ['Males and females combined']
                } else {
                    nutrientsToDisplay = validNutrientsForAdults
                    sexToDisplay = ['Male', 'Female', 'Males and females combined'].sort()
                }

                /*
                    It's possible that the user can select an invalid age group for the currently selected nutrient.
                    If they do select something invalid, we need to allow the user to continue with their selection as
                    expected, though the currently selected nutrient must be forced to change to something valid.
                    By default, this the nutrient is set to Calcium. While this might be jarring to the user,
                     this is the only way to account for the inconsistently available data.
                */

                if (!nutrientsToDisplay.includes(selectedNutrient)) {
                    selectedNutrient = 'Calcium'
                    $("#nutrientDropdownSelector option:selected").text(selectedNutrient);
                }

                // Populate dropdown menus
                sexDropdown.selectAll("*").remove()
                sexDropdown.append("select")
                    .attr("class", "select form-control")
                    .attr("id", "sexDropdownSelector")
                    .style("width", "100%")
                    .on("change", updateData)
                    .selectAll("option")
                    .data(sexToDisplay)
                    .enter()
                    .append("option")
                    .text(function (d) {
                        return d
                    });
                $('#sexDropdownSelector').val(selectedSex)

                ageDropdown.selectAll("*").remove()
                ageDropdown.append("select")
                    .attr("class", "select form-control")
                    .attr("id", "ageDropdownSelector")
                    .style("width", "100%")
                    .on("change", updateData)
                    .selectAll("option")
                    .data(ageToDisplay)
                    .enter()
                    .append("option")
                    .text(function (d) {
                        return d
                    });
                $('#ageDropdownSelector').val(selectedAge)

                nutrientDropdown.selectAll("*").remove()
                nutrientDropdown.append("select")
                    .attr("class", "select form-control")
                    .attr("id", "nutrientDropdownSelector")
                    .style("width", "100%")
                    .on("change", updateData)
                    .selectAll("option")
                    .data(nutrientsToDisplay)
                    .enter()
                    .append("option")
                    .text(function (d) {
                        return d
                    });
                $('#nutrientDropdownSelector').val(selectedNutrient)
                return [selectedSex, selectedAge, selectedNutrient]
            }


            function updateData() {
                // Main method to populate the map with data

                // Grab new dropdown selections
                let sex = $("#sexDropdownSelector option:selected").text();
                let age = $("#ageDropdownSelector option:selected").text();
                let nutrient = $("#nutrientDropdownSelector option:selected").text();

                // Reset the drop down menus
                [sex, age, nutrient] = initializeDropdowns(sex, age, nutrient)

                // Filter dataset
                data = masterData[sex][age][nutrient];

                // Update title of chart
                let chartTitleText = generateTitle(sex, age, nutrient);

                // Update nutrient facts disclaimer
                if (nutrient in nutrientFacts) {
                    d3.select('#nutrient-notes-header').html(
                        `<h3>Additional notes for ${nutrient}</h3>`
                    )
                    d3.select('#nutrient-notes').html(`
                        <p>${nutrientFacts[nutrient]}</p>
                    `);
                } else {
                    d3.select('#nutrient-notes-header').html(
                        ``
                    )
                    d3.select('#nutrient-notes').html(`
                        
                    `);
                }


                // Update chart title
                d3.select(".chart-title-text").remove();
                chartTitle.append("text")
                    .attr("class", "chart-title-text")
                    .style("text-anchor", "middle")
                    .style("font-weight", "bold")
                    .attr("x", function (d) {
                        return w / 2;
                    })
                    .attr("y", function (d) {
                        return 10;
                    })
                    .text(chartTitleText)
                    .call(wrap, w); // wrap the text in <= 30 pixels

                // prepare driObject which will be used to draw info on the DRI/reference value
                let driObject = {
                    'dri_type': data[0]['dri_type'],
                    'ref_value': data[0]['ref_value'],
                    'ref_value_unit': data[0]['ref_value_unit'],
                    'ref_min': null,
                    'ref_max': null,
                    'prefix': data[0]['prefix'],
                    'range': false  // whether or not the ref value is a range
                };

                if (data[0]['ref_value'].includes("-") && typeof (data[0]['ref_value']) == 'string') {
                    driObject['ref_min'] = Number(data[0]['ref_value'].split(' - ')[0]);
                    driObject['ref_max'] = Number(data[0]['ref_value'].split(' - ')[1]);
                    driObject['range'] = true;
                } else if (data[0]["ref_value"] !== null && data[0]["ref_value"] !== "") {
                    driObject['ref_value'] = Number(data[0]["ref_value"])
                } else {
                    driObject['ref_value_raw'] = 'N/A';
                }

                // Set colour scale
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
                    let geoAge = data[i].age;
                    let geoNutrient = data[i].nutrient;
                    let geoRegion = data[i].region;

                    // Find corresponding region in geoJSON
                    for (let j = 0; j < json.features.length; j++) {
                        let jsonRegion = json.features[j].properties.PRENAME;
                        if (dataRegion === jsonRegion) {
                            json.features[j].properties.percentage = geoPercentage;
                            json.features[j].properties.percentage_se = geoPercentageSE;
                            json.features[j].properties.sex = geoSex;
                            json.features[j].properties.age = geoAge;
                            json.features[j].properties.nutrient = geoNutrient;
                            json.features[j].properties.region = geoRegion;
                            break; // Found it, exit geoJSON loop
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
                    //.attr("tabindex", 0)
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
                            drawLegend(minValueY, maxValueY, nutrient, d.properties.percentage, driObject);
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
                        tooltipHover(d, driObject);

                    })
                    .on("mouseout", function (d) {
                        svgRegion.select(".region-tooltip").remove(); // remove hovered region tooltip
                        d3.select("#region-detail-text").html(`<div class="container-fluid"><i>Hover your cursor over a region on the map for additional detail.</div></i>`); // remove hovered region tooltip
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
                drawLegend(minValueY, maxValueY, nutrient, null, driObject);

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
                            <td>${d.flag}</td>
                            <td>${d.dri_type}</td>
                            <td>${d.ref_value}</td>
                            <td>${d.ref_value_unit}</td>
                         </tr>`)
                });

                // Update table title
                //if (sex === 'Males and females combined') {
                document.getElementById('table-title').innerHTML = chartTitleText
                //} else {
                    //document.getElementById('table-title').innerHTML = `Percentiles of
                // ${nutrient.toLowerCase()} usual intake, ${sex.toLowerCase()}, age ${age}, Canada, 2015`;
                //}

                // Update description of chart
                if (sex === 'Males and females combined') {
                    document.getElementById('geo-caption').ariaLabel = `An interactive map of Canada that uses colour to represent the percentage of ${sex.toLowerCase()}, age ${age}, with a usual intake of ${nutrient.toLowerCase()} ${driObject.prefix.toLowerCase()} ${driObject.dri_type} in each province. Users can hover over a specific province to see that province’s value and standard error.`;
                } else {
                    document.getElementById('geo-caption').ariaLabel = `An interactive map of Canada that uses colour to represent the percentage of ${sex.toLowerCase()}s, age ${age}, with a usual intake of ${nutrient.toLowerCase()} ${driObject.prefix.toLowerCase()} ${driObject.dri_type} in each province. Users can hover over a specific province to see that province’s value and standard error.`;
                }
                //Percentage ${driObject.prefix.toLowerCase()} ${driObject.dri_type}

            }

            function zoomed() {
                d3.select('.region-tooltip').style("stroke-width", 1.5 / d3.event.transform.k + "px");
                d3.select('.region-tooltip').attr("transform", d3.event.transform); // updated for d3 v4
            }

            function tooltipHover(d, driObject) {
                // Zoom
                let zoom = d3.zoom().on("zoom", zoomed);
                let activeRegion = d.properties.PRENAME;

                // Set text
                d3.select("#region-detail-text").html(`
                    <div class="container-fluid">
<!--                        <div class="row"><strong>Canada excluding territories: </strong> ${activeRegion}</div>-->
                        <div class="row"><strong>Region: </strong> ${activeRegion}</div>
                        <div class="row"><strong>% ${driObject['prefix']} ${driObject['dri_type']}:
                         </strong> ${d.properties.percentage} (±${d.properties.percentage_se})</div>
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
                    //.attr("tabindex", 0)
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
                    // .on("focus", function (d) {
                    //     clickRegion = d.properties.region;
                    //     d3.select(this)
                    //     .style("outline", "none")
                    //     .attr("class", "");
                    //
                    //    tooltipHover(d, driObject);
                    //
                    //
                    // })
                    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)); // updated for d3 v4
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

            function drawLegend(minValueY, maxValueY, selectedNutrient, hoveredPercentage, driObject) {
                //Update legend (Derived from https://bl.ocks.org/duspviz-mit/9b6dce37101c30ab80d0bf378fe5e583)
                key.selectAll("rect").remove();
                key.select("#legend-label").remove();

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
                    .attr("transform", "translate(0,40)")
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

