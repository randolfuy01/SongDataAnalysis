import { createComparisonRadarChart } from "./radar.js";

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
    "Unchained Melody" : [
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
    "Peaches" : [
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

const songsInfo = {
    "Nights" : [
        "Frank Ocean", 2435234, "Blonde"
    ],
    "Bed Peace" : [
        "Jhene Aiko", 653221, "Sail Out"
    ], 
    "Run BTS" : [
        "BTS", 1254222
    ], 
    "Unchained Melody" : [
        "The Righteous Brothers", 978432, "N/A"
    ], 
    "Runaway" : [
        "Kanye", 7584920, "My Beautiful Dark Twisted Fantasy"
    ], 
    "What is Love" : [
        "Twice", 120398, "Summer Nights"
    ], 
    "Peaches" : [
        "Kai", 54390, "Peaches"
    ], 
    "Fein" : [
        "Travis Scott", 234516, "Utopia"
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

    if (Title1) {
        Title1.textContent = "Song Name: " + compare1;
    } else {
        console.log('Element with id "Title1" not found');
    }

    if (Title2) {
        Title2.textContent = "Song Name: " + compare2;
    } else {
        console.log('Element with id "Title2" not found');
    };

    const Artist1 = document.getElementById("Artist1");
    const Artist2 = document.getElementById("Artist2");

    if (Artist1) {
        Artist1.textContent = "Artist: " + songsInfo[compare1][0];
    } else {
        console.log('Element with id "Artist1" not found');
    };

    if (Artist2) {
        Artist2.textContent = "Artist: " + songsInfo[compare2][0];
    } else {
        console.log('Element with id "Artist2" not found');
    };

    const Views1 = document.getElementById("Views1");
    const Views2 = document.getElementById("Views2");

    if (Views1) {
        Views1.textContent = "Artist: " + songsInfo[compare1][1];
    } else {
        console.log('Element with id "Views1" not found');
    };

    if (Views2) {
        Views2.textContent = "Artist: " + songsInfo[compare2][1];
    } else {
        console.log('Element with id "Views2" not found');
    };

    const Album1 = document.getElementById("Album1");
    const Album2 = document.getElementById("Album2");
    // Fetch array data from the dictionary
    const arrayData1 = songs[compare1];
    const arrayData2 = songs[compare2];
    if (Album1) {
        Album1.textContent = "Album: " + songsInfo[compare1][2];
    } else {
        console.log('Element with id "Album1" not found');
    };

    if (Album2) {
        Album2.textContent = "Album: " + songsInfo[compare2][2];
    } else {
        console.log('Element with id "Album2" not found');
    };

    // Call the chart creation function
    const chartContainer = document.getElementById("spider_container");
    chartContainer.innerHTML = '';
    createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2);
};