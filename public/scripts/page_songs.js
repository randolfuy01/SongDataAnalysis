var song_data1 = [
    {x: "Danceability", value: 55},
    {x: "Energy", value: 65},
    {x: "Speechiness", value: 75},
    {x: "Acousticness", value: 75},
    {x: "Instrumentalness", value: 60},
    {x: "Liveness",value: 60},
    {x: "Valence",value: 60},
];

// CREATING THE CHART 
var song_chart = anychart.radar();
song_chart.title("Vibe Comparison")
    .legend(true);

song_chart.yScale()
  .minimum(0)
  .maximum(100)
  .ticks({'interval':20});

song_chart.line(song_data1)

song_chart.width = "1000px"
song_chart.height = "1000px"
song_chart.yGrid().palette(["white"]);
song_chart.area(song_data1).name('Nights').markers(true).fill("#79AC78", 0.3).stroke("#79AC78")
song_chart.container("song_chart");
// initiate chart drawing
song_chart.draw();
