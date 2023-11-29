const songs = {
    "Nights" : [
        {x: "frequency", value: 20},
        {x: "tempo", value: 40},
        {x: "accoustic", value: 30},
        {x: "liveness", value: 50},
        {x: "valence", value: 70},
        {x: "energy",value: 90},
    ],
    "Bed Peace" : [
        {x: "frequency", value: 20},
        {x: "tempo", value: 55},
        {x: "accoustic", value: 90},
        {x: "liveness", value: 70},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Run BTS" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Righteous Melody" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 40},
        {x: "energy",value: 75},
    ], 
    "Runaway" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "What is Love" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Peaces" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ], 
    "Fein" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 10},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 100},
    ]
};

const songList= Object.keys(songs);

// Keys of the dictionary as items for the dropdowns
const items = Object.keys(songList);

// Function to create dropdown options
function createDropdownOptions(arr, dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    // Clear existing options
    dropdown.innerHTML = "";

    // Populate the dropdown with new options
    Object.keys(songs).forEach(key => {
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

    const Title1 = document.getElementById("Title1");
    const Title2 = document.getElementById("Title2");
    console.log(Title1)
    console.log(Title2)
    if (Title1) {
        Title1.textContent = "Artist: " + compare1;
    } else {
        console.log('Element with id "Title1" not found');
    }

    if (Title2) {
        Title2.textContent = "Artist: " + compare2;
    } else {
        console.log('Element with id "Title2" not found');
    }

    // Fetch array data from the dictionary
    const arrayData1 = songs[compare1];
    const arrayData2 = songs[compare2];

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

    currentChart = song_chart;
}
