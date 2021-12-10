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
    'Colombie-Britannique',
    'Alberta',
    'Saskatchewan',
    'Manitoba',
    'Ontario',
    'Québec',
    'Terre-Neuve-et-Labrador',
    'Nouveau-Brunswick',
    'Île-du-Prince-Édouard',
    'Nouvelle-Écosse',
];

// Tracks index within the regionList to allow for keyboard/button cycling of map
let currentRegionIndex = null;

const nutrientList = [
    'Calcium',
    'Folate',
    'Fer',
    'Magnésium',
    "Pourcentage de l'apport énergétique total provenant des glucides",
    "Pourcentage de l'apport énergétique total provenant des lipides",
    "Pourcentage de l'apport énergétique total provenant des protéines",
    'Potassium',
    'Sodium',
    'Vitamine A',
    'Vitamine B6',
    'Vitamine C',
    'Vitamine D',
    'Zinc',
].sort();

const ageList = [
    '1 à 8 ans',
    '9 à 18 ans',
    '19 ans et plus',
];

const sexList = [
    'Femmes',
    'Hommes',
    'Les deux sexes'
].sort();

// Generates appropriate chart title for each nutrient
const generateTitle = (sex, age, nutrient) => {
    let cdrrNutrients = ['Sodium']
    let earNutrients = ['Calcium', 'Folate', 'Vitamine A', 'Vitamine B6', 'Vitamine C', 'Vitamine' +
    ' D', 'Zinc', 'Magnésium']
    let aiNutrients = ['Potassium']
    let inadequateNutrients = ['Fer']
    let amdrNutrients = [
        "Pourcentage de l'apport énergétique total provenant des glucides",
        "Pourcentage de l'apport énergétique total provenant des lipides",
        "Pourcentage de l'apport énergétique total provenant des protéines"
    ]

    // Age statement
    let ageString = ''
    switch (age) {
        case '1 à 8 ans':
            ageString += 'enfants de 1 à 8 ans' //âge
            break
        case '9 à 18 ans':
            ageString += 'adolescents de 9 à 18 ans'
            break
        case '19 ans et plus':
            ageString += 'adultes de 19 ans et plus'
            break
        default:
            console.log(`Error parsing age string "${age}"`)
    }

    // Sex statement
    let sexString = ''
    switch (sex) {
        case 'Hommes':
            sexString += ', hommes,'
            break
        case 'Femmes':
            sexString += ', femmes,'
            break
        case 'Les deux sexes':
            sexString += ', '
            break
        default:
            console.log(`Error parsing sex string "${sex}"`)
    }

    // Adequacy statement
    let adequacyString = ''
    let ironBool = false
    if (cdrrNutrients.includes(nutrient)) {
        adequacyString += "supérieur à l'apport lié à un risque réduit de maladie chronique"
    } else if (amdrNutrients.includes(nutrient)) {
        // clean up text for improved readability
        nutrient = nutrient.replace("Pourcentage de l'apport énergétique total provenant des", '')
        adequacyString += "inclus dans l'étendue des valeurs acceptables pour les macronutriments"
    } else if (earNutrients.includes(nutrient)) {
        adequacyString += "au-dessous du Besoin moyen estimatif"
    } else if (aiNutrients.includes(nutrient)) {
        adequacyString += "supérieur à l’apport suffisant"
    } else if (inadequateNutrients.includes(nutrient)) {
        adequacyString += "fer est insuffisant"
        ironBool = true
    }

    if (ironBool) {
        return `Pourcentage d’${ageString} dont l’apport en ${adequacyString}${sexString} Canada, 2015`
    } else {
        return `Pourcentage d’${ageString} dont l’apport en ${nutrient} est ${adequacyString}${sexString} Canada, 2015`
    }
}

// Grab values from the main data object to populate options from the select dropdown
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


    'Fer': `L'insuffisance en fer a été estimer à l'aide de la méthode
                fondée sur les probabilités totales, comme décrit à la section 2.3.4 du
                <a href="https://www.canada.ca/fr/sante-canada/services/aliments-nutrition/surveillance-aliments-nutrition/sondages-sante-nutrition/enquete-sante-collectivites-canadiennes-escc/compendium-tableaux-donnees-apports-energie-nutriments-autres-aliments.html"
                   target="_blank">document méthodologique</a>`,

    "Pourcentage de l'apport énergétique total provenant des acides gras saturés": `
        Les <a href="https://guide-alimentaire.canada.ca/fr/directrices/"
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

d3.csv("../static/data/geographic-oct2020-fr.csv", function (d) {
    return {
        nutrient: d['Nutriment/Item'],
        region: d['Rég_Prov'],
        sex: d['Sexe'],
        age: d["Âge (en années)"],
        n: +d['n'],
        dri_type: d['Type de ANREF'],
        prefix: d['Prefix-FR'],
        percentage: d['Percentage'],
        percentage_se: d['SE'],
        flag: d['E flag'],
        ref_value: d['Ref value'],
        ref_value_unit: d['Ref value unit_FR'],
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
            initializeDropdowns("Les deux sexes", "19 ans et plus", "Sodium")

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
                let dataValue = data[i].percentage;console.log(dataValue)

                // Find corresponding region in geoJSON
                for (let j = 0; j < json.features.length; j++) {
                    let jsonRegion = json.features[j].properties.PRFNAME;
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
                .text('Source des données: Statistique Canada, Enquête sur la santé dans les ' +
                    'collectivités canadiennes (ESCC) - Nutrition, 2015 - Fichier partagé.')
                .call(wrap, w);

            updateData();

            function initializeDropdowns(selectedSex, selectedAge, selectedNutrient) {
                // Method to populate dropdown options. Some options are not available for certain selections
                // (e.g. Vitamin B6 is only available for 19 years and over) and this code accounts for that.

                let validNutrientsForChildren = [
                    'Calcium',
                    "Pourcentage de l'apport énergétique total provenant des glucides",
                    "Pourcentage de l'apport énergétique total provenant des lipides",
                    "Pourcentage de l'apport énergétique total provenant des protéines",
                    'Potassium',
                    'Sodium',
                    'Vitamine D'
                ].sort()

                let validNutrientsForAdolescents = [
                    'Calcium',
                    'Folate',
                    'Fer',
                    'Magnésium',
                    "Pourcentage de l'apport énergétique total provenant des glucides",
                    "Pourcentage de l'apport énergétique total provenant des lipides",
                    "Pourcentage de l'apport énergétique total provenant des protéines",
                    'Potassium',
                    'Sodium',
                    'Vitamine A',
                    'Vitamine C',
                    'Vitamine D',
                    'Zinc',
                ].sort()

                let validNutrientsForAdults = [
                    'Calcium',
                    'Folate',
                    'Fer',
                    'Magnésium',
                    "Pourcentage de l'apport énergétique total provenant des glucides",
                    "Pourcentage de l'apport énergétique total provenant des lipides",
                    "Pourcentage de l'apport énergétique total provenant des protéines",
                    'Potassium',
                    'Sodium',
                    'Vitamine A',
                    'Vitamine B6',
                    'Vitamine C',
                    'Vitamine D',
                    'Zinc',
                ].sort()

                // Initialize
                let ageToDisplay
                let nutrientsToDisplay
                let sexToDisplay

                // Set ages to display by selected sex
                if (selectedSex === 'Hommes' || selectedSex === 'Femmes') {
                    ageToDisplay = ['19 ans et plus']
                } else {
                    ageToDisplay = ['1 à 8 ans', '9 à 18 ans', '19 ans et plus']
                }

                // Set nutrients/sex to display by selected age
                if (selectedAge === '1 à 8 ans') {
                    nutrientsToDisplay = validNutrientsForChildren
                    sexToDisplay = ['Les deux sexes']
                } else if (selectedAge === '9 à 18 ans') {
                    nutrientsToDisplay = validNutrientsForAdolescents
                    sexToDisplay = ['Les deux sexes']
                } else {
                    nutrientsToDisplay = validNutrientsForAdults
                    sexToDisplay = ['Hommes', 'Femmes', 'Les deux sexes'].sort()
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
                     if (nutrient === 'Sodium'|| nutrient ==='Fer'||
                        nutrient === "Folate") {
                        d3.select('#nutrient-notes-header').html(
                        `<h3>Notes supplémentaires sur le ${nutrient}</h3>`
                        )
                    } else if (nutrient === "Pourcentage de l'apport énergétique total provenant" +
                         " des glucides" || nutrient === "Pourcentage de l'apport énergétique" +
                         " total provenant des lipides" || nutrient === "Pourcentage de l'apport énergétique total provenant des protéines"){
                        d3.select('#nutrient-notes-header').html(
                        `<h3>Notes supplémentaires sur le ${nutrient.toLowerCase()}</h3>`
                        )
                    } else if (nutrient === 'Vitamine A' || nutrient === 'Vitamine D' || nutrient === 'Vitamine C' || nutrient === 'Vitamine B6'){
                        d3.select('#nutrient-notes-header').html(
                        `<h3>Notes supplémentaires sur la ${nutrient}</h3>`
                        )
                    } else {
                        d3.select('#nutrient-notes-header').html(
                        `<h3>Notes supplémentaires sur ${nutrient}</h3>`
                        )
                    }
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
                        let jsonRegion = json.features[j].properties.PRFNAME;
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
                        d3.select("#region-detail-text").html(`<div class="container-fluid"><i>Passez votre curseur sur une région de la carte pour obtenir des détails supplémentaires.</div></i>`); // remove hovered region tooltip
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
                            <td>${d.percentage.replace('.',',')}</td>
                            <td>${d.percentage_se.replace('.',',')}</td>
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
                let activeRegion = d.properties.PRFNAME;

                // Set text
                d3.select("#region-detail-text").html(`
                    <div class="container-fluid">
<!--                        <div class="row"><strong>Canada excluding territories: </strong> ${activeRegion}</div>-->
                        <div class="row"><strong>Region: </strong> ${activeRegion}</div>
                        <div class="row"><strong>% ${driObject['prefix']} ${driObject['dri_type']}:
                         </strong> ${d.properties.percentage.replace('.',',')} <br> (± ${d.properties.percentage_se.replace('.',',')})</div>
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
                        if (d.properties.percentage && d.properties.PRFNAME === activeRegion) {
                            return colorScale(d.properties.percentage);
                        } else if (d.properties.PRFNAME === activeRegion) {
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
                console.log(minValueY, maxValueY, selectedNutrient, hoveredPercentage, driObject)
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

