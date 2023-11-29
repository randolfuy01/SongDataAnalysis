
const artists = {
    "Drake" : [
        {x: "frequency", value: 20},
        {x: "tempo", value: 40},
        {x: "accoustic", value: 30},
        {x: "liveness", value: 50},
        {x: "valence", value: 70},
        {x: "energy",value: 90},
    ],
    "Kanye" : [
        {x: "frequency", value: 20},
        {x: "tempo", value: 55},
        {x: "accoustic", value: 90},
        {x: "liveness", value: 70},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "The 1975" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Elvis" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 40},
        {x: "energy",value: 75},
    ], 
    "SZA" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Lana Del Rey" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Beabadoobee" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Laufey" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 100},
    ]
};

const artistList= Object.keys(artists);

// Keys of the dictionary as items for the dropdowns
const items = Object.keys(artistList);

// Function to create dropdown options
function createDropdownOptions(arr, dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    // Clear existing options
    dropdown.innerHTML = "";

    // Populate the dropdown with new options
    Object.keys(artists).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key; // Set the text to the key of the dictionary
        dropdown.appendChild(option);
    });
}

// Initialize dropdowns
createDropdownOptions(items, "compare1Dropdown");
createDropdownOptions(items, "compare2Dropdown");

// Event listener for dropdowns change
document.getElementById("compare1Dropdown").addEventListener("change", updateChart);
document.getElementById("compare2Dropdown").addEventListener("change", updateChart);

function updateChart() {
    // Fetch selected values
    const compare1 = document.getElementById("compare1Dropdown").value;
    const compare2 = document.getElementById("compare2Dropdown").value;

    // Fetch array data from the dictionary
    const arrayData1 = artists[compare1];
    const arrayData2 = artists[compare2];
    console.log(arrayData1);
    console.log(arrayData2);
    // Call the chart creation function
    const chartContainer = document.getElementById("spider_container");
    chartContainer.innerHTML = '';
    createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2);
}

var currentChart = null;

function createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2) {
    // CREATING THE CHART 
    var song_chart = anychart.radar();
    song_chart.title("Vibe Comparison")
        .legend(true);

    song_chart.yScale()
        .minimum(0)
        .maximum(100)
        .ticks({'interval':20});

    song_chart.line(arrayData1)
    song_chart.line(arrayData2)

    song_chart.width = "500px"
    song_chart.height = "500px"
    song_chart.yGrid().palette(["white"]);
    song_chart.area(arrayData1).name(compare1).markers(true).fill("#79AC78", 0.3).stroke("#79AC78")
    song_chart.area(arrayData2).name(compare2).markers(true).fill("#B0D9B1", 0.3).stroke("#B0D9B1")
    song_chart.container('spider_container');
    // initiate chart drawing
    song_chart.draw();

    currentChart = song_chart;
}
