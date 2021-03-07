// getting data from the json file
//function getPlot(id) {
id = "940"

    // Read in the JSON data
    d3.json("./data/samples.json").then((data) => {
    console.log(data)  
    
        //////////// bar /////////
        var selectedSample = data.samples.filter(item => item.id.toString() === id)[0];
        console.log(`ID Selected: ${id}`)
        console.log(selectedSample);

        // get only top 10 sample values to plot and reverse for the plotly
        var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
        console.log(`Selected Sample: ${sampleValues}`)
        
        //otu_ids
        var otuIds = selectedSample.otu_ids.slice(0, 10).reverse();
        console.log(`OTU ID: ${otuIds}`)
        //Add OTU to value for char visualization 
        otuIdsWord = otuIds.map(x => "OTU: " + x)


        //otu_labels
        var otuLabel = selectedSample.otu_labels.slice(0, 10).reverse();
        console.log(`OTU Labels: ${otuLabel}`)

        //trace
        var trace1 = {
            type: "bar",
            x: sampleValues,
            y: otuIdsWord,
            orientation: "h"
        };

        // create data variable
        var data1 = [trace1];

        // //create layout
        var layout1 = {
            title: "Top 10 OTU IDs for Selected ID",
            yaxis: {},
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        //create the bar plot
        Plotly.newPlot("bar", data1, layout1);


        // ////////// bubble/////////
        // // Use otu_ids for the x values.
        // // Use sample_values for the y values.
        // // Use sample_values for the marker size.
        // // Use otu_ids for the marker colors.
        // // Use otu_labels for the text values

        var sampleValuesBubble = selectedSample.sample_values;
        var otuIdsBubble = selectedSample.otu_ids;
        var otuLabelBubble = selectedSample.otu_labels;

        //trace
        var trace2 = {
            x: otuIdsBubble,
            y: sampleValuesBubble,
            mode: "markers",
            marker: {
                size: sampleValuesBubble,
                color: otuIdsBubble
            },
            text: otuLabelBubble
        };

        // create data variable
        var data2 = [trace2];

        //create layout
        var layout2 = {
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Freqeuncy"},
            height: 500,
            width: 1000
        };

        Plotly.newPlot("bubble", data2, layout2);

        //create guage chart
        var sampleValuesGauge = selectedSample.sample_values;
        var otuIdsGauge = selectedSample.otu_ids;
        var otuLabelGauge = selectedSample.otu_labels;

        var washFreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Frequency: ${washFreq}`);

        //trace
        var trace3 = {
            domain: {x: [0, 1], y: [0, 1]},
            type: "indicator",
            mode: "gauge+number",
            //
            value: washFreq,
            title: { text: "Belly Button Washing Frequency" },
            gauge: {
                axis: { range: [0, 9], tickwidth: 0.5, tickcolor: "black" },
                bar: { color: "#669999" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "transparent",
                steps: [
                    { range: [0, 1], color: "#fff" },
                    { range: [1, 2], color: "#e6fff5" },
                    { range: [2, 3], color: "#ccffeb" },
                    { range: [3, 4], color: "#b3ffe0" },
                    { range: [4, 5], color: "#99ffd6" },
                    { range: [5, 6], color: "#80ffcc" },
                    { range: [6, 7], color: "#66ffc2" },
                    { range: [7, 8], color: "#4dffb8" },
                    { range: [8, 9], color: "#33ffad" }

                ],
            }
        };

        //create data variable 
        data3 = [trace3];

        //layout
        var layout3 = {
            width: 600,
            height: 500,
            margin: {
                t: 0,
                b: 0
            }
        };

        Plotly.newPlot("gauge", data3, layout3);

    });

// Demographic Data

// //function buildMetadata(sample) {
// d3.json("./data/samples.json").then((data) => {
//     var metadata = data.metadata

//         // set drop down menu
//     var demoGraph = d3.select("#sample-metadata");
//     demoGraph.html("");
//     d3.json(metadata).then(function (data) {
//         Object.entries(data).forEach(([key, value]) => {
//             demoGraph.append("h5").text(`${key}: ${value}`);
//         });
//     });
// });


d3.json("./data/samples.json").then((data) => {
    var metadata = data.metadata

    var selectedSample2 = metadata.filter(item => item.id.toString() === id)[0];
    console.log(selectedSample2)

    // set drop down menu
    var demoGraph = d3.select("#sample-metadata");
    demoGraph.html("");
    d3.json(metadata).then(function (data) {
        Object.entries(data).forEach(([key, value]) => {
            demoGraph.append("h5").text(`${key}: ${value}`);
        });
    });

});

//};