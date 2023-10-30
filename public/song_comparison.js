function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
}
  
function filterFunction1() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput1");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown1");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";    
        } else {
            a[i].style.display = "none";
        }
    }
}

function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}
  
function filterFunction2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput2");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown2");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";    
        } else {
            a[i].style.display = "none";
        }
    }
}

var song_data1 = [
    {x: "frequency", value: 55},
    {x: "tempo", value: 35},
    {x: "accoustic", value: 30},
    {x: "liveness", value: 50},
    {x: "valence", value: 80},
    {x: "energy",value: 25},
];

var song_data2 = [
    {x: "frequency", value: 80},
    {x: "tempo", value: 24},
    {x: "accoustic", value: 10},
    {x: "liveness", value: 95},
    {x: "valence", value: 50},
    {x: "energy",value: 73},
]

// CREATING THE CHART 
var song_chart = anychart.radar();
song_chart.title("Vibe Comparison")
    .legend(true);

song_chart.yScale()
  .minimum(0)
  .maximum(100)
  .ticks({'interval':20});

song_chart.line(song_data1)
song_chart.line(song_data2)

song_chart.width = "500px"
song_chart.height = "500px"
song_chart.yGrid().palette(["white"]);
song_chart.area(song_data1).name('Nights').markers(true).fill("#79AC78", 0.3).stroke("#79AC78")
song_chart.area(song_data2).name('Bed Peace').markers(true).fill("#B0D9B1", 0.3).stroke("#B0D9B1")
song_chart.container('spider_container');
// initiate chart drawing
song_chart.draw();