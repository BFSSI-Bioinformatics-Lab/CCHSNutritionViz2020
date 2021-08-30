const nutrientFacts = {
    'Calcium': `N/A`,

    'Folate': `
    <p>Folate is a generic term that includes the naturally occurring form found in food and folic acid found in supplements and fortified foods. The requirements for folate are based on the amount of dietary folate equivalents (DFEs) needed to maintain red blood cell folate concentrations. DFEs adjust for differences in absorption between naturally-occurring food folate and synthetic folic acid. While there appears to be a relatively high prevalence of inadequate intakes of folate (5.7 to 44.2%), red blood cell folate measures, an indicator of folate status, suggest a very low prevalence of folate deficiency in the Canadian population.<super>1, 2</super></p>
    <p>Women capable of becoming pregnant require special consideration when it comes to folate intake. To reduce the risk of neural tube defects, women who could become pregnant should consume 400 µg of folic acid per day in addition to the amount of folate in a healthy diet. Red blood cell folate measures suggest that some Canadian women of childbearing age have levels below that considered optimal for greatest reduction of risk of neural tube defects.<super>1,2</super></p>
    <p><strong>References:</strong></p> 
    <ol>
        <li>
        Statistics Canada. Table  13-10-0336-01   Nutritional status of the household population. DOI:   https://doi.org/10.25318/1310033601-eng
        </li>
        <li>Colapinto, Cynthia K., Deborah L. O’Connor and Mark S. Tremblay. 2011. "Folate status of the population in the Canadian Health Measures Survey." Canadian Medical Association Journal. Vol. 183, no. 2. February. pp. E100 to E106.
        http://www.cmaj.ca/content/183/2/E100.full.pdf+html
        </li>
    </ol>`,

    'Total dietary fibre': `
    <p>Total dietary fibre: Although the Institute of Medicine has established an Adequate Intake 
    (AI) for total dietary fibre, no comparison is presented in the table (IOM, 2005). In addition 
    to the fact that the AI for any nutrient has limited uses in assessing groups 
    (Health Canada, 2017), the AI for dietary fibre was determined in relation to coronary heart 
    disease risk. Health Canada’s definition for dietary fibre recognizes the role that fibre 
    plays in supplying fermentation products to colonocytes and on laxation (Health Canada, 2010). 
    No DRIs have been established for these effects. For more information on the methods used 
    to analyze dietary fibre for this survey, please refer to the 
     <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrient-data/canadian-nutrient-file-compilation-canadian-food-composition-data-users-guide.html" target="_blank">Canadian Nutrient File – Users Guide</a></p>
    <p><strong>References:</strong></p>
    <ol>
       <li>IOM (Institute of Medicine). Dietary Reference Intakes for energy, carbohydrate, fibre, fat, fatty acids, cholesterol, protein, and amino acids (Macronutrients). 2005. Food and Nutrition Board, Institute of Medicine. The National Academies Press, Washington, DC.</li>
       <li>Health Canada. Reference Guide to Understanding and Using the Data - 2015 Canadian Community Health Survey- Nutrition. 2017. Available at: https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/reference-guide-understanding-using-data-2015.html</li>
       <li>Health Canada. Proposed Policy: Definition and Energy Value for Dietary Fibre. Food Directorate, Health Products and Food Branch, Health Canada. 2010. Available at: https://www.canada.ca/en/health-canada/services/food-nutrition/public-involvement-partnerships/proposed-policy-definition-energy-value-dietary-fibre/consultation.html</li>
    </ol>`,

    'Iron': `Iron inadequacy was estimated using the full probability method as described in section 2.3.4 of the <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/compendium-data-tables-intakes-energy-nutrients-other-food.html" target="_blank">Methodology Guide.</a>`,
    'Magnesium': `N/A`,
    'Percentage of total energy intake from fat': `
        <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/compendium-data-tables-intakes-energy-nutrients-other-food.html" target="_blank">Canada’s Dietary Guidelines</a> recommend that Canadians consume less than 10% of total energy intake from saturated fat. 
    `,
    'Percentage of total energy intake from carbohydrates': `
    <p>The interpretation of self-reported energy intake should be done with caution as energy intake tends to be underestimated by survey respondents. The Institute of Medicine (IOM) suggests using indicators of relative body weight, such as the Body Mass Index (BMI), as markers of energy intake adequacy within groups. Statistics Canada has released 2015 CCHS – Nutrition results for measured BMI in adults<super>1</super> and children<super>2</super>. </p>
    <p><strong>References:</strong></p>
    <ol>
        <li>Statistics Canada.  Table  13-10-0794-01   Measured adult body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI: <a href="https://doi.org/10.25318/1310079401-eng">https://doi.org/10.25318/1310079401-eng</a></li>
        <li>Statistics Canada.  Table  13-10-0795-01   Measured children and youth body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI:   <a href="https://doi.org/10.25318/1310079501-eng">https://doi.org/10.25318/1310079501-eng</a></li>
    </ol>`,
    'Percentage of total energy intake from protein': `
    <p>The interpretation of self-reported energy intake should be done with caution as energy intake tends to be underestimated by survey respondents. The Institute of Medicine (IOM) suggests using indicators of relative body weight, such as the Body Mass Index (BMI), as markers of energy intake adequacy within groups. Statistics Canada has released 2015 CCHS – Nutrition results for measured BMI in adults<super>1</super> and children<super>2</super>. </p>
    <p><strong>References:</strong></p>
    <ol>
        <li>Statistics Canada.  Table  13-10-0794-01   Measured adult body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI: <a href="https://doi.org/10.25318/1310079401-eng">https://doi.org/10.25318/1310079401-eng</a></li>
        <li>Statistics Canada.  Table  13-10-0795-01   Measured children and youth body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI:   <a href="https://doi.org/10.25318/1310079501-eng">https://doi.org/10.25318/1310079501-eng</a></li>
    </ol>`,
    'Potassium': `N/A`,
    'Total energy intake': `
    <p>The interpretation of self-reported energy intake
        should be done with caution as energy intake tends to be underestimated by survey
        respondents. The Institute of Medicine (IOM) suggests using indicators of relative
        body weight, such as the Body Mass Index (BMI), as markers of energy intake adequacy
        within groups. Statistics Canada has released 2015 CCHS – Nutrition results for
        measured BMI in <a href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1310079401" target="_blank">adults</a><sup>1</sup> 
        and <a href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1310079501" target="_blank">children<sup>2</sup>.</a>
    </p>
    <p><strong>References:</strong></p>
    <ol>
        <li>Statistics Canada.  Table  13-10-0794-01   Measured adult body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI: <a href="https://doi.org/10.25318/1310079401-eng">https://doi.org/10.25318/1310079401-eng</a></li>
        <li>Statistics Canada.  Table  13-10-0795-01   Measured children and youth body mass index (BMI) (World Health Organization classification), by age group and sex, Canada and provinces, Canadian Community Health Survey – Nutrition. DOI:   <a href="https://doi.org/10.25318/1310079501-eng">https://doi.org/10.25318/1310079501-eng</a></li>
    </ol>`,
    'Sodium': `<a href="https://www.canada.ca/en/health-canada/services/publications/food-nutrition/sodium-intake-canadians-2017.html" target="_blank">Click here for more information on the Sodium Intake of Canadians.</a>`,
    'Vitamin A': `No prevalence of intakes above the UL are shown for vitamin A. The UL for vitamin A applies to preformed vitamin A only, and those estimates had not yet been conducted at the time these tables were produced.`,
    'Vitamin B6': `N/A`,
    'Vitamin C': `N/A`,
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
        <li>Statistics Canada. Canadian Health Measures Survey: Non-environmental laboratory and medication data, 2016 and 2017. The Daily. 2019. Available from: https://www150.statcan.gc.ca/n1/daily-quotidien/190206/dq190206c-eng.htm</li>
   </ol>`,
    'Zinc': `N/A`
};

$(document).on("wb-ready.wb", function (event) {
    //Width and height
    const margin = {top: 120, right: 80, bottom: 60, left: 80};
    const w = 780 - margin.left - margin.right;
    const h = 480 - margin.top - margin.bottom;
    const chartFontSize = '14px';

    Promise.all([
        d3.csv("../static/data/distributions-en-20th.csv"),
        d3.csv("../static/data/corrected2021_data_table_age-corrected-en.csv"),
        // Values were generated with ./data_processing/reformat_distribution_data.ipynb script
        d3.json("../static/data/corrected2021_distribution_coding_object.json")
    ]).then(function (files) {

        // Unpack csv files into distribution data, reference table data, and reference coding object
        let data = files[0]
        let tableData = files[1]
        const codingObject = files[2]

        // Iterate over every column and cast it to a float if it looks like a number
        data.forEach(function (obj) {
                Object.keys(obj).map(function (a) {
                    if (!isNaN(obj[a])) {
                        obj[a] = parseFloat(obj[a]);
                    }
                })
            }
        );

        tableData.forEach(function (obj) {
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

        // Unaltered copy of data goes here
        const masterData = data;

        // Labels for charts
        const yearCategories = [2015];
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
            'Both'  // Only supports age categories ['1 to 3', '4 to 8']
        ];

        // Filter the data according to dropdown menu selections
        const sexDropdown = d3.select("#sexDropdown");
        const nutrientDropdown = d3.select("#nutrientDropdown");
        const ageDropdown = d3.select("#ageDropdown");

        initializeDropdowns('Male', '19 and over', 'Total energy intake (kcal/d)',)

        //
        // // Setup dropdown menus
        // sexDropdown.append("select")
        //     .attr("class", "select form-control")
        //     .attr("id", "sexDropdownSelector")
        //     .style("width", "100%")
        //     .on("change", drawCurves)
        //     .selectAll("option")
        //     .data(sexCategories)
        //     .enter()
        //     .append("option")
        //     .text(function (d) {
        //         return d;
        //     });
        // $('select option:contains("Male")').prop('selected', true);
        //
        // ageDropdown.append("select")
        //     .attr("class", "select form-control")
        //     .attr("id", "ageDropdownSelector")
        //     .style("width", "100%")
        //     .on("change", drawCurves)
        //     .selectAll("option")
        //     .data(ageCategories)
        //     .enter()
        //     .append("option")
        //     .text(function (d) {
        //         return d;
        //     });
        // $('select option:contains("19 and over")').prop('selected', true);
        //
        // // Nutrients available are consistent across all ages and sexes
        // nutrientDropdown.append("select")
        //     .attr("class", "select form-control")
        //     .attr("id", "nutrientDropdownSelector")
        //     .style("width", "100%")
        //     .on("change", drawCurves)
        //     .selectAll("option")
        //     .data(nutrientList)
        //     .enter()
        //     .append("option")
        //     .text(function (d) {
        //         return d;
        //     });
        // $('select option:contains("Total energy intake")').prop('selected', true);

        let sex = $("#sexDropdownSelector option:selected").text();
        let nutrient = $("#nutrientDropdownSelector option:selected").text();
        let age = $("#ageDropdownSelector option:selected").text();

        // Filter data according to dropdown selection
        data = masterData[age][nutrient][sex];

        //Create SVG element
        let svgContainer = d3.select("#distribution-chart");
        let svg = svgContainer
            .append("svg")
            .attr("id", "svg-container")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        let renderAdequacyTracker = {
            renderExceedance: false,
            renderAdequacy: false
        };

        // xAxis for mean nutrient values
        // TODO: nice to have, normalize the x-axis scale across sex/age options to allow for easier comparisons
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
        let drawLimitLine = true;

        // Checkbox functionality
        d3.select("#checkboxLimit").attr("checked", "checked").on("change", limitTickbox);

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
        drawCurves();

        function drawLimit() {
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
                        if (drawLimitLine && renderAdequacyTracker.renderAdequacy) {
                            return adequacyPathData
                        } else {
                            return 0
                        }
                    }),
                update => update
                    .attr('d', function () {
                            if (drawLimitLine && renderAdequacyTracker.renderAdequacy) {
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
                        if (drawLimitLine && renderAdequacyTracker.renderAdequacy) {
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
                        if (drawLimitLine && renderAdequacyTracker.renderAdequacy) {
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
                        if (drawLimitLine) {
                            return exceedancePathData
                        } else {
                            return 0
                        }
                    }),
                update => update
                    .attr('d', function () {
                            if (drawLimitLine && renderAdequacyTracker.renderExceedance) {
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
                        if (drawLimitLine && renderAdequacyTracker.renderExceedance) {
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
                        if (drawLimitLine && renderAdequacyTracker.renderExceedance) {
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

        function updateDataTable(tableData, sex, nutrient, age) {
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
            let keysToKeep = ['Nutrient/Item (unit)', 'Reg_Prov', 'Sex', 'Age (years)', 'n',
                'Mean', 'SE_Mean','P5', 'P10','P25', 'P50', 'P75', 'P90', 'P95']

            let tableDataCanada = tableData.filter( function (e) {
                return e.Reg_Prov === "Canada excluding territories"
            }); //console.log(tableDataCanada)

            const tableDataReduced = tableDataCanada.map(e => {
                const obj = {};
                keysToKeep.forEach(k => obj[k] = e[k])
                return obj;
            });
            //console.log(tableDataReduced)
            // Filter data to only values contained in user selection
            let filteredData = tableDataReduced.filter(function (d) {
                return d['Sex'] === sex && d['Nutrient/Item (unit)'] === nutrient && d['Age (years)'] === age
            })

            // Update table
            let datatable = $('.wb-tables').DataTable()
            datatable.clear()
            datatable.rows.add(filteredData).draw()
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

        function initializeDropdowns(selectedSex, selectedAge, selectedNutrient) {
            /*
            Method to populate dropdown options

            Sex is the main controller for what is available; if Both is selected, only 1-3 and 4-8 will be available.
            If the user wants to select other data, they need to switch sex to Male or Female.

            TODO: Include disclaimer on webpage about this functionality. While inconvenient, it is necessary
             */

            let agesToDisplay

            // CASE: User selected 'Both' sex but age is not 1-3 or 4-8
            if (selectedSex === 'Both' && (selectedAge !== '1 to 3' && selectedAge !== '4 to 8')) {
                selectedAge = '1 to 3'
                agesToDisplay = ['1 to 3', '4 to 8']
            }
                // CASE: Currently selected sex is Both and user flips to Male or Female
            // this means the currently selected age is not valid and needs to be defaulted to a new value
            else if (selectedSex !== 'Both' && (selectedAge === '1 to 3' || selectedAge === '4 to 8')) {
                selectedAge = '19 and over'  // default to 19 and over
                agesToDisplay = [
                    '9 to 13', '14 to 18', '19 to 30', '31 to 50', '51 to 70',
                    '19 and over', '71 and over'
                ]
            } else if (selectedSex === 'Both' && (selectedAge === '1 to 3' || selectedAge === '4 to 8')) {
                agesToDisplay = ['1 to 3', '4 to 8']
            } else {
                agesToDisplay = [
                    '9 to 13', '14 to 18', '19 to 30', '31 to 50', '51 to 70',
                    '19 and over', '71 and over'
                ]
            }

            $('#ageDropdownSelector').val(selectedAge)
            $("#ageDropdownSelector option:selected").text(selectedAge);

            // Setup dropdown menus
            sexDropdown.selectAll("*").remove()
            sexDropdown.append("select")
                .attr("class", "select form-control")
                .attr("id", "sexDropdownSelector")
                .style("width", "100%")
                .on("change", drawCurves)
                .selectAll("option")
                .data(sexCategories)
                .enter()
                .append("option")
                .text(function (d) {
                    return d;
                });
            $('#sexDropdownSelector').val(selectedSex)

            ageDropdown.selectAll("*").remove()
            ageDropdown.append("select")
                .attr("class", "select form-control")
                .attr("id", "ageDropdownSelector")
                .style("width", "100%")
                .on("change", drawCurves)
                .selectAll("option")
                .data(agesToDisplay)
                .enter()
                .append("option")
                .text(function (d) {
                    return d;
                });
            $('#ageDropdownSelector').val(selectedAge)

            // Nutrients available are consistent across all ages and sexes
            nutrientDropdown.selectAll("*").remove()
            nutrientDropdown.append("select")
                .attr("class", "select form-control")
                .attr("id", "nutrientDropdownSelector")
                .style("width", "100%")
                .on("change", drawCurves)
                .selectAll("option")
                .data(nutrientList)
                .enter()
                .append("option")
                .text(function (d) {
                    return d;
                });
            $('#nutrientDropdownSelector').val(selectedNutrient)

            return [selectedSex, selectedAge, selectedNutrient]
        }

        function drawCurves() {
            // Main method for drawing the curves, limit lines, and updating the axes

            // Grab most recent user selected data
            sex = $("#sexDropdownSelector option:selected").text();
            age = $("#ageDropdownSelector option:selected").text();
            nutrient = $("#nutrientDropdownSelector option:selected").text();

            [sex, age, nutrient] = initializeDropdowns(sex, age, nutrient)

            // Store new dataset
            data = masterData[age][nutrient][sex];

            // Grab reference code --> gets used in drawLimit() and retrieves pertinent adequacy/exceedance reference code
            referenceCode = data[0]['ref_code'];
            activeReferenceObject = retrieveReferenceValues(referenceCode);
            updateRenderTrackerAdequacy(activeReferenceObject);

            // Update title of chart
            let chartTitleText
            if (sex === 'Both') {
                chartTitleText = `${nutrient} usual intake distribution, ${sex} sexes, age ${age}, Canada, 2015`;
            } else {
                chartTitleText = `${nutrient} usual intake distribution, ${sex}, age ${age}, Canada, 2015`;
            }


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
                if (renderAdequacyTracker.renderAdequacy && (activeReferenceObject['Adequacy-Value'] > maxX)) {
                    maxX = activeReferenceObject['Adequacy-Value']
                }
                if (renderAdequacyTracker.renderExceedance && (activeReferenceObject['Excess-Value'] > maxX)) {
                    maxX = activeReferenceObject['Excess-Value']
                }

                // Determine if minX needs to be adjusted
                if (renderAdequacyTracker.renderAdequacy && (activeReferenceObject['Adequacy-Value'] < minX)) {
                    minX = activeReferenceObject['Adequacy-Value']
                }
                if (renderAdequacyTracker.renderExceedance && (activeReferenceObject['Excess-Value'] < minX)) {
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
            drawLimit();
            updateDataTable(tableData, sex, nutrient, age);

            // Update nutrient facts disclaimer
            let stripNutrient = nutrient.replace(/ *\([^)]*\) */g, "");
            d3.select('#nutrient-notes-header').html(
                `<h3>Additional notes for ${stripNutrient}</h3>`
            )
            d3.select('#nutrient-notes').html(`
                <p>${nutrientFacts[stripNutrient]}</p>
            `);

            //Update table title
            //let tableTitle = document.getElementById('table-title').innerHTML
            if (sex === 'Both') {
                document.getElementById('table-title').innerHTML = `Percentiles of ${nutrient} usual intake, ${sex.toLowerCase()} sexes, age ${age}, Canada, 2015`;
            } else {
                document.getElementById('table-title').innerHTML = `Percentiles of ${nutrient} usual intake, ${sex.toLowerCase()}, age ${age}, Canada, 2015`;
            }

            // Update description of chart
            if (sex === 'Both') {
                document.getElementById('distribution-caption').innerHTML = `A graph displaying the usual intake distribution curve for ${nutrient} in ${sex.toLowerCase()}, age ${age}, with the limit value(s) if applicable.`;
            } else {
                document.getElementById('distribution-caption').innerHTML = `A graph displaying the usual intake distribution curve for ${nutrient} in ${sex.toLowerCase()}s, age ${age}, with the limit value(s) if applicable.`;
            }
        }

        function updateRenderTrackerAdequacy(referenceObject) {
            // There are cases where one value is available, both values are available, and neither value is available.
            // The graphic must respond accordingly.

            // True if there's a string value available
            let adequacyTypeAvailable = typeof (referenceObject['Adequacy-Type']) == "string";
            let exceedanceTypeAvailable = typeof (referenceObject['Excess-Type']) == "string";

            // Update the render object
            renderAdequacyTracker.renderAdequacy = adequacyTypeAvailable;
            renderAdequacyTracker.renderExceedance = exceedanceTypeAvailable;
        }

        function retrieveReferenceValues(refCode) {
            // Grabs the Adequacy-Value, Adequacy-Type, Excess-Value, and Excess-Type for a particular reference code
            let ids = [refCode];
            let referenceObject = codingObject.filter(i => ids.includes(i['Ref-code']));
            return referenceObject[0]['metadata']
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

        function limitTickbox() {
            // Updates the drawLimit bool depending on user selection for the Limit Value(s) tickbox
            drawLimitLine = !!d3.select("#checkboxLimit").property("checked");
            drawCurves();
        }
    });
})