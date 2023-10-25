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


var artist_data1 = [
    {x: "frequency", value: 65},
    {x: "tempo", value: 60},
    {x: "accoustic", value: 10},
    {x: "liveness", value: 40},
    {x: "valence", value: 30},
    {x: "energy",value: 75},
];

var artist_data2 = [
    {x: "frequency", value: 80},
    {x: "tempo", value: 35},
    {x: "accoustic", value: 15},
    {x: "liveness", value: 75},
    {x: "valence", value: 50},
    {x: "energy",value: 80},
];

// CREATING THE CHART 
var artist_chart = anychart.radar();
artist_chart.title("Vibe Comparison")
    .legend(true);

artist_chart.yScale()
  .minimum(0)
  .maximum(100)
  .ticks({'interval':20});

artist_chart.line(artist_data1)
artist_chart.line(artist_data2)

artist_chart.width = "500px"
artist_chart.height = "500px"
artist_chart.yGrid().palette(["white"]);
artist_chart.area(artist_data1).name('Kanye').markers(true).fill("#79AC78", 0.3).stroke("#79AC78")
artist_chart.area(artist_data2).name('Drake').markers(true).fill("#B0D9B1", 0.3).stroke("#B0D9B1")
artist_chart.container('spider_container');

// initiate chart drawing
artist_chart.draw();