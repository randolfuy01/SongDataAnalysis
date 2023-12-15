export function createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2) {
    // CREATING THE CHART 
    var song_chart = anychart.radar();
    song_chart.title("Vibe Comparison")
        .legend(true);

    song_chart.yScale()
        .minimum(0)
        .maximum(100)
        .ticks({'interval':20});

    song_chart.width = "500px";
    song_chart.height = "500px";
    song_chart.yGrid().palette(["white"]);
    // Set names for area series
    var areaSeries1 = song_chart.area(arrayData1);
    areaSeries1.name(compare1).markers(true).fill("#79AC78", 0.3).stroke("#79AC78");

    var areaSeries2 = song_chart.area(arrayData2);
    areaSeries2.name(compare2).markers(true).fill("#B0D9B1", 0.3).stroke("#B0D9B1");

    song_chart.container('spider_container');

    // Initiate chart drawing
    song_chart.draw();
};

export function createSingularChart(value1, array1) {
        // CREATING THE CHART 
        var song_chart = anychart.radar();
        song_chart.title("Vibe Comparison")
            .legend(true);
    
        song_chart.yScale()
            .minimum(0)
            .maximum(100)
            .ticks({'interval':20});
    
        song_chart.width = "500px";
        song_chart.height = "500px";
        song_chart.yGrid().palette(["white"]);
        // Set names for area series
        var areaSeries1 = song_chart.area(array1);
        areaSeries1.name(value1).markers(true).fill("#79AC78", 0.3).stroke("#79AC78");
        song_chart.background('transparent');
        song_chart.container('spider_container');
    
        // Initiate chart drawing
        song_chart.draw();
}