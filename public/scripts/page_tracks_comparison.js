import { createComparisonRadarChart } from "./radar.js";
// Async functions 
async function fetchTrackInfo(trackName) {
    const response = await fetch(`/track-info/${trackName}`);
    console.log("fetch successful");
    const data = await response.text();
    return data;
}

async function fetchTrackData(trackName) {
    try {
        const response = await fetch(`http://localhost:3000/track/${trackName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const trackArray = [];
        let Energy = 0;
        let Acousticness = 0;
        let Valence = 0;
        let Speechiness = 0;
        let Instrumentalness = 0;
        let Liveness = 0;
        console.log(data)
        data.forEach(element => {
            Energy += element.Energy;
            Acousticness += element.Acousticness;
            Valence += element.Valence;
            Speechiness += element.Speechiness;
            Instrumentalness += element.Acousticness;
            Liveness += element.Liveness;
        });
        trackArray.push({x: "accoustic", value: Acousticness});
        trackArray.push({x: "valence", value: Valence});
        trackArray.push({x: "speechiness", value: Speechiness});
        trackArray.push({x: "instrumentalness", value: Instrumentalness});
        trackArray.push({x: "energy", value: Energy});
        trackArray.push({x: "liveness", value: Liveness});
        console.log(trackArray);
        return trackArray; // Return the mapped array
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array or handle error
        }
}

async function fetchAllTracks() {
    try {
        const response = await fetch('http://localhost:3000/tracks');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data.map(item => item.Track.slice(0,20)); // Return the mapped array
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array or handle error
    }
}

// Display Functions
const trackList = await fetchAllTracks();
function createDropdownOptions(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    // Clear existing options
    dropdown.innerHTML = "";

    // Populate the dropdown with new options from the array
    trackList.forEach(item => {
        const option = document.createElement('option');
        option.value = item; // Set the value to the item in the array
        option.textContent = item; // Set the text to the item in the array
        dropdown.appendChild(option);
    });
}

// Initialize dropdowns
createDropdownOptions("compare1Dropdown");
createDropdownOptions("compare2Dropdown");

// Event listener for dropdowns change
document.getElementById("compare1Dropdown").addEventListener("change", updateChart);
document.getElementById("compare2Dropdown").addEventListener("change", updateChart);

async function updateChart() {
    // Fetch selected values
    const compare1 = document.getElementById("compare1Dropdown").value;
    const compare2 = document.getElementById("compare2Dropdown").value;

    // Updates Title for Artists in real time
    const Title1 = document.getElementById("Title1");
    const Title2 = document.getElementById("Title2");

    if (Title1) {
        Title1.textContent = "Song: " + compare1;
    } else {
        console.log('Element with id "Title1" not found');
    }

    if (Title2) {
        Title2.textContent = "Song: " + compare2;
    } else {
        console.log('Element with id "Title2" not found');
    }
    
    // Updates Description for Artists in real time
    const Description1 = document.getElementById("Description1");
    const Description2 = document.getElementById("Description2");

    if (Description1) {
        fetchTrackInfo(compare1)
            .then(data => {
                Description1.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Description1:', error));
    } else {
        console.log('Element with id "Description1" not found');
    }

    if (Description2) {
        fetchTrackInfo(compare2)
            .then(data => {
                Description2.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Description2:', error));
    } else {
        console.log('Element with id "Description2" not found');
    }

    // Fetch array data from the dictionary
    const arrayData1 = await fetchTrackData(compare1);
    const arrayData2 = await fetchTrackData(compare2);
    console.log(arrayData1);
    console.log(arrayData2);
    // Call the chart creation function
    const chartContainer = document.getElementById("spider_container");
    chartContainer.innerHTML = '';
    
    createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2);
}