
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
        {x: "valence", value: 58},
        {x: "energy",value: 90},
    ], 
    "The 1975" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 20},
        {x: "liveness", value: 40},
        {x: "valence", value: 15},
        {x: "energy",value: 65},
    ],
    "Elvis" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 70},
        {x: "liveness", value: 40},
        {x: "valence", value: 40},
        {x: "energy",value: 75},
    ], 
    "SZA" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 70},
        {x: "liveness", value: 40},
        {x: "valence", value: 23},
        {x: "energy",value: 35},
    ], 
    "Lana Del Rey" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 90},
        {x: "liveness", value: 40},
        {x: "valence", value: 30},
        {x: "energy",value: 75},
    ],
    "Beabadoobee" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 50},
        {x: "liveness", value: 80},
        {x: "valence", value: 25},
        {x: "energy",value: 75},
    ],
    "Laufey" : [
        {x: "frequency", value: 65},
        {x: "tempo", value: 60},
        {x: "accoustic", value: 65},
        {x: "liveness", value: 40},
        {x: "valence", value: 90},
        {x: "energy",value: 25},
    ],
};

const artistsInfo = {
    "Drake" : ["Toronto, Canada", 95, "rap"],
    "Kanye" : ["Atlanta, United States", 95, "rap"],
    "The 1975" : ["Sydney, Autralia", 85, "Alternative pop"],
    "SZA" : ["Los Angeles, United States", 89, "RnB"],
    "Elvis" : ["Memphis, United States", 92, "Classic Rock"],
    "Lana Del Rey" : ["Chicago, United States", 90, "Pop"],
    "Beabadoobee" : ["London, United Kingdom", 65, "Indie"],
    "Laufey" : ["Amsterdam, Netherlands", 65, "Indie"]
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

    // Updates Title for Artists in real time
    const Title1 = document.getElementById("Title1");
    const Title2 = document.getElementById("Title2");

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
    
    // Updates Location for Artists in real time
    const Location1 = document.getElementById("Location1");
    const Location2 = document.getElementById("Location2");

    if (Location1) {
        Location1.textContent = "Location: " + artistsInfo[compare1][0];
    } else {
        console.log('Element with id "Location1" not found');
    }

    if (Location2) {
        Location2.textContent = "Location: " + artistsInfo[compare2][0];
    } else {
        console.log('Element with id "Location2" not found');
    }

    // Updates Popularity for Aritsts in real time
    const Popularity1 = document.getElementById("Popularity1");
    const Popularity2 = document.getElementById("Popularity2");
    if (Location1) {
        Popularity1.textContent = "Popularity: " + artistsInfo[compare1][1];
    } else {
        console.log('Element with id "Popularity1" not found');
    }

    if (Location2) {
        Popularity2.textContent = "Popularity: " + artistsInfo[compare2][1];
    } else {
        console.log('Element with id "Popularity2" not found');
    }

    const Music1 = document.getElementById("Music1");
    const Music2 = document.getElementById("Music2");
    if (Music1) {
        Music1.textContent = "Music Type: " + artistsInfo[compare1][2];
    } else {
        console.log('Element with id "Music1" not found');
    }

    if (Music2) {
        Music2.textContent = "Music Type: " + artistsInfo[compare2][2];
    } else {
        console.log('Element with id "Music2" not found');
    }

    // Fetch array data from the dictionary
    const arrayData1 = artists[compare1];
    const arrayData2 = artists[compare2];

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
};
