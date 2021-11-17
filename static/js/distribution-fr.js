const nutrientFacts = {

    'Folate': `
    <p>Folate est un terme générique qui inclut la forme présente
                naturellement dans les aliments et l'acide folique présent dans les suppléments
                et les aliments enrichis. Les besoins en folate sont basés sur la quantité
                d'équivalents de folate alimentaire (EFA) nécessaire pour maintenir les
                concentrations de folate dans les globules rouges. Les EFA tiennent compte des
                différences d'absorption entre le folate alimentaire naturel et l'acide folique
                synthétique. Bien qu'il semble y avoir une prévalence relativement élevée
                d'apports insuffisants inadéquats en folate, la mesure de la
                concentration de folate dans les globules rouges, un indicateur du statut en
                folate, suggèrent une très faible prévalence de carence en folate dans la
                population canadienne.<sup>1,2</sup></p>
    <p>Les femmes en âge de procréer nécessitent une attention particulière en ce qui
                concerne l'apport en folate. Pour réduire le risque d'anomalies du tube neural,
                <a href="https://www.canada.ca/fr/sante-publique/services/grossesse/acide-folique.html"
                   target="_blank">il est recommandé à toutes les femmes qui pourraient devenir
                    enceintes de prendre chaque jour un supplément multivitaminique contenant 400
                    µg d'acide folique</a>, en plus de la quantité de folate contenue dans un
                régime alimentaire sain. Les mesures de la concentration de folate dans les
                globules rouges suggèrent que certaines femmes canadiennes en âge de procréer ont
                des niveaux inférieurs à ceux considérés comme optimaux pour la plus grande
                réduction du risque d'anomalies du tube neural.
            .<sup>1,2</sup></p>
    <p><strong>Références :</strong></p> 
    <ol>
        <li>Statistique Canada.  Tableau  13-10-0336-01   État nutritionnel de la population à domicile. DOI:  https://doi.org/10.25318/1310033601-fra</li>
        <li>Colapinto, Cynthia K., Deborah L. O’Connor and Mark S. Tremblay. 2011. "Folate status of the population in the Canadian Health Measures Survey." Canadian Medical Association Journal. Vol. 183, no. 2. February. pp. E100 to E106. http://www.cmaj.ca/content/183/2/E100.full.pdf+html</li>
    </ol>`,

    'Fibres alimentaires totales': `
    <p>
        Bien que l'Institute of Medicine a établi
        un apport suffisant (AS) pour les fibres alimentaires totales (ION, 2005),
        aucune comparaison n’est présentée dans le tableau. En plus du fait que
        l'utilisation de l’AS est plutôt limitée quant à l'évaluation de groupes
        (Health Canada, 2017), l'AS pour les fibres alimentaires a été déterminé en
        fonction du risque de coronapathie. La définition de Santé Canada pour les
        fibres alimentaires reconnaît le rôle que les fibres jouent dans l'apport de
        produits de fermentation aux colonocytes et sur la laxation. (Health Canada, 2010)
        Aucun ANREF n'a été établi pour ces effets. Pour plus d'informations sur les
        méthodes utilisées pour analyser les fibres alimentaires pour cette enquête,
        veuillez consulter le <a
    href="https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/saine-alimentation/donnees-nutritionnelles/fichier-canadien-elements-nutritifs-recueil-donnees-canadiennes-composition-aliments-guide-utilisation.html"
    target="_blank">Fichier canadien sur les éléments nutritifs - Guide de l'utilisateur</a>.
    </p>
<p><strong>Références :</strong></p>
    <ol>
        <li>IOM (Institute of Medicine). Dietary Reference Intakes for energy, carbohydrate, fibre, fat, fatty acids, cholesterol, protein, and amino acids (Macronutrients). 2005. Food and Nutrition Board, Institute of Medicine. The National Academies Press, Washington, DC.</li>
        <li>Santé Canada. <a href="https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/surveillance-aliments-nutrition/sondages-sante-nutrition/enquete-sante-collectivites-canadiennes-escc/guide-reference-comprendre-utiliser-donnees-2015.html"
                             target="_blank">Guide de référence pour comprendre et utiliser les données - Enquête sur la
            santé dans les collectivités canadiennes - Nutrition de 2015</a>,
            2017.</li>
        <li>Santé Canada. <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/public-involvement-partnerships/proposed-policy-definition-energy-value-dietary-fibre/consultation.html"
                             target="_blank">Politique proposée : Définition et
            valeur énergétique des fibres alimentaires</a>. Direction des aliments,
            Direction générale des produits de santé et des aliments,
            Santé Canada. 2010.</li>
    </ol>`,

    'Fer': `Iron inadequacy was estimated using the full probability method as described in section 2.3.4 of the <a href="https://www.canada.ca/en/health-canada/services/food-nutrition/food-nutrition-surveillance/health-nutrition-surveys/canadian-community-health-survey-cchs/compendium-data-tables-intakes-energy-nutrients-other-food.html" target="_blank">Methodology Document.</a>L'insuffisance en fer a été estimer à l'aide de la méthode
                fondée sur les probabilités totales, comme décrit à la section 2.3.4 du
                <a href="https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/surveillance-aliments-nutrition/sondages-sante-nutrition/enquete-sante-collectivites-canadiennes-escc/compendium-tableaux-donnees-apports-energie-nutriments-autres-aliments.html"
                   target="_blank">document méthodologique</a>.`,

    "Pourcentage de l'apport énergétique total provenant des acides gras saturés": `
        Les
                <a href="https://guide-alimentaire.canada.ca/fr/directrices/"
                   target="_blank">Lignes directrices canadiennes en matière d’alimentation</a>
                recommandent que les canadiens consomment moins de 10 % de l’apport énergétique
                total provenant des gras saturé. 
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

    'Apport énergétique total': `
    <p>L'interprétation de l'apport énergétique
        autodéclaré doit être faite avec prudence car les répondants ont tendance à
        sous-estimer leur apport énergétique lors d’une enquête. L'Institute of Medicine
        (IOM) suggère d'utiliser des indicateurs du poids corporel relatif, tels que
        l'indice de masse corporelle (IMC), en tant que marqueurs d'un apport
        énergétique adéquat chez des groupes. Statistique Canada a publié les résultats
        pour l'IMC mesuré chez les <a href="https://www150.statcan.gc.ca/t1/tbl1/fr/tv.action?pid=1310079401&request_locale=fr"
                       target="_blank">adultes</a><sup>1</sup> et les
        <a href="https://www150.statcan.gc.ca/t1/tbl1/fr/tv.action?pid=1310079501&request_locale=fr"
           target="_blank">enfants<sup>2</sup></a> provenant de l’ESSC – Nutrition 2015.
    </p>
    <p><strong>Références :</strong></p>
    <ol>
        <li>Statistique Canada.  Tableau  13-10-0794-01   Indice de masse corporelle (IMC) mesuré chez les adultes (classification selon l'Organisation mondiale de la santé), selon le groupe d'âge et le sexe, Canada et provinces, Enquête sur la santé dans les collectivités canadiennes – Nutrition. DOI:  https://doi.org/10.25318/1310079401-fra</li>
        <li>Statistique Canada.  Tableau  13-10-0795-01   Indice de masse corporelle (IMC) mesuré chez les enfants et les jeunes (classification selon l'Organisation mondiale de la santé), selon le groupe d'âge et le sexe, Canada et provinces, Enquête sur la santé dans les collectivités canadiennes – Nutrition. DOI:  https://doi.org/10.25318/1310079501-fra</li>
    </ol>`,
    'Sodium': `Pour plus d'information sur les apports en sodium, veuillez
                consulter le rapport de Santé Canada intitulé
                <a href="https://www.canada.ca/fr/sante-canada/services/publications/aliments-et-nutrition/sodium-chez-canadiens-2017.html"
                   target="_blank">L'apport en sodium des Canadiens en 2017</a>.`,
    'Vitamine A': `Aucune prévalence pour les apports en dessus du AMT n’est
                calculée pour la vitamine A. Le AMT pour la vitamine A est fixé pour la vitamine
                A préformée seulement, et ces estimations n’avaient pas encore été faites lorsque
                cet outil a été produit.`,
    'Vitamine D': `
<p><strong>Les estimations de la prévalence d’un apport alimentaire insuffisant en
                    vitamine D doivent être interprétées avec prudence.</strong> </p>
<p>La vitamine D est unique car elle peut être obtenue par
    l’alimentation et les suppléments et peut également être synthétisée dans
    l'organisme à partir de la lumière du soleil (rayonnement UVB). L'apport de
    vitamine D provenant des suppléments n'a pas été considéré dans cette analyse.
    Bien que la prévalence d'un apport insuffisant de vitamine D semble élevée, les
    mesures de biomarqueurs sanguins ne suggèrent pas que la carence en vitamine D
    soit généralisée dans la population canadienne.<sup>1,2,3</sup>
    Bien qu'il semble y avoir une faible prévalence de carence en vitamine D,
    certaines sous-populations pourraient mériter un examen plus approfondi.
   </p>
   <p><strong>Références :</strong></p>
   <ol>
        <li>Langlois K, Greene-Finestone L, Little J, Hidiroglou N, Whiting S. Vitamin D status of Canadians as measured in the 2007 to 2009 Canadian Health Measures Survey. Health Rep. 2010;21(1):47–55.</li>
        <li>Whiting SJ, Langlois KA, Vatanparast H, Greene-Finestone LS. The vitamin D status of Canadians relative to the 2011 Dietary Reference Intakes: an examination in children and adults with and without supplement use. Am J Clin Nutr. 2011;94(1):128–135. doi:10.3945/ajcn.111.013268</li>
        <li>Statistique Canada. <a href="https://www150.statcan.gc.ca/n1/daily-quotidien/190206/dq190206c-fra.htm"
        target="_blank">Enquête canadienne sur les mesures de la santé : Données des mesures non
                        environnementales de laboratoire et de médicaments, 2016 et 2017</a>.
                        Le Quotidien. 2019.</li>
   </ol>`
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
                    .style("font-size", 12)
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
                    .style("font-size", 12)
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
            // let keysToKeep = ['Nutrient/Item (unit)', 'Reg_Prov', 'Sex', 'Age (years)', 'n',
            //     'Mean', 'SE_Mean','P5', 'P10','P25', 'P50', 'P75', 'P90', 'P95']

            let keysToKeep = ['Nutrient/Item (unit)', 'Reg_Prov', 'Sex', 'Age (years)', 'n',
                'Mean', 'SE_Mean','P5', "P5_SE", 'P10', "P10_SE",'P25', "P25_SE", 'P50', "P50_SE",
                'P75', "P75_SE", 'P90', "P90_SE", 'P95', "P95_SE", "EAR", "% <EAR", "%<EAR_SE",
                "AI", "% >AI", "%>AI_SE", "UL", "% >UL", "%>UL_SE", "CDRR", "% >CDRR", "%>CDRR_SE"]


            let tableDataCanada = tableData.filter( function (e) {
                return e.Reg_Prov === "Canada excluding territories"
            }); //console.log(tableDataCanada)

            // If all provinces wanted then "tableData.map(e => { "
            const tableDataReduced = tableDataCanada.map(e => {
                const obj = {};
                keysToKeep.forEach(k => {
                    obj[k] = e[k].toString()// to string to be able to
                    // get it
                })
                return obj;
            });//console.log(tableDataReduced.map(e=> Object.values(e)))

            // Get rid of NaN values from % and EAR...
            const reduced = tableDataReduced.map(e => {
                keysToKeep.map(k => {
                    if (e[k]=== 'NaN') {
                        e[k]= ""
                    }
                })
                return e
            });
            //console.log(reduced)
            // Filter data to only values contained in user selection
            let filteredData = reduced.filter(function (d) {
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

            if (stripNutrient in nutrientFacts) {
                d3.select('#nutrient-notes-header').html(
                    `<h3>Additional notes for ${stripNutrient}</h3>`
                )
                d3.select('#nutrient-notes').html(`
                    <p>${nutrientFacts[stripNutrient]}</p>
                `);
            }else {
                d3.select('#nutrient-notes-header').html(
                    ``
                )
                d3.select('#nutrient-notes').html(`
                    
                `);
            }

            // Add data source under map
            const mapSource = d3.select("#svg-container")
                .append('g').append('text')
                .style("text-anchor", "middle")
                .attr("x", function (d) {
                        return w / 2 + margin.left;
                    })
                    .attr("y", function (d) {
                        return h + margin.top + margin.bottom + 30;
                    })
                .text('Data Source: Statistics Canada, 2015 Canadian Community Health Survey ' +
                    '- Nutrition, 2015.')
                .call(wrap, w);


            //Update table title
            //let tableTitle = document.getElementById('table-title').innerHTML
            if (sex === 'Both') {
                document.getElementById('table-title').innerHTML = `Percentiles of ${nutrient} usual intake, ${sex.toLowerCase()} sexes, age ${age}, Canada, 2015`;
            } else {
                document.getElementById('table-title').innerHTML = `Percentiles of ${nutrient} usual intake, ${sex.toLowerCase()}, age ${age}, Canada, 2015`;
            }

            // Update description of chart
            if (sex === 'Both') {
                document.getElementById('curve-description-readers').ariaLabel = `A graph 
                displaying the usual intake distribution curve for ${nutrient} 
                in ${sex.toLowerCase()}, age ${age}, with the limit value(s) if applicable. 
                Percentiles of usual intake were statistically transformed so that the data 
                could be presented as a probability distribution curve. The non-transformed, 
                percentiles of usual intakes and limit values, if applicable, are displayed in 
                the table below the graph.`;
            } else {
                document.getElementById('curve-description-readers').ariaLabel = `A graph 
                displaying the usual intake distribution curve for ${nutrient} 
                in ${sex.toLowerCase()}s, age ${age}, with the limit value(s) if applicable. Percentiles of usual intake were statistically transformed so that the data 
                could be presented as a probability distribution curve. The non-transformed, 
                percentiles of usual intakes and limit values, if applicable, are displayed in 
                the table below the graph.`;
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