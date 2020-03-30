// This script is just used for creating the output json file that is read into the table
// Right click the console log object, and Copy As Object, save to a JSON file
// Make sure to minify the file aftewards as this will reduce the size by over 50%.

d3.csv("../static/data/data_table-en.csv").then(function (data) {
    // Iterate over every column and cast it to a float if it looks like a number
    data.forEach(function (obj) {
            Object.keys(obj).map(function (a) {
                if (!isNaN(obj[a])) {
                    obj[a] = parseFloat(obj[a]);
                }
            })
        }
    );

    // Full object
    // console.log(data)

    // Flattened array
    let flattened = []
    data.forEach(function(d){
        flattened.push(Object.values(d))
    })
    console.log({"data":flattened})

})
