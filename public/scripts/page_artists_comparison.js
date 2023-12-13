import { createComparisonRadarChart } from "./radar.js";
// Async functions 
async function fetchArtistInfo(artistName) {
    const response = await fetch(`/artist-info/${artistName}`);
    console.log("fetch successful");
    const data = await response.text();
    return data;
}
async function fetchArtistMusicType(artistName) {
    const response = await fetch(`/music-type/${artistName}`);
    console.log("fetch successful");
    const data = await response.text();
    return data;
}

async function fetchArtistLocation(artistName) {
    const response = await fetch(`/artist-location/${artistName}`);
    console.log("fetch successful" );
    const data = await response.text();
    return data;
}

async function fetchArtistData(artistName) {
    try {
        const response = await fetch(`http://localhost:3000/artist/${artistName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const artistAveragesArray = [];
        let totalEnergy = 0;
        let totalAcousticness = 0;
        let totalValence = 0;
        let totalSpeechiness = 0;
        let totalInstrumentalness = 0;
        let totalLiveness = 0;
        data.forEach(element => {
            totalEnergy += element.Energy;
            totalAcousticness += element.Acousticness;
            totalValence += element.Valence;
            totalSpeechiness += element.Speechiness;
            totalInstrumentalness += element.Acousticness;
            totalLiveness += element.Liveness;
        });
        artistAveragesArray.push({x: "accoustic", value: parseInt(totalAcousticness/10)});
        artistAveragesArray.push({x: "valence", value: parseInt(totalValence/10)});
        artistAveragesArray.push({x: "speechiness", value: parseInt(totalSpeechiness/10)});
        artistAveragesArray.push({x: "instrumentalness", value: parseInt(totalInstrumentalness/10)});
        artistAveragesArray.push({x: "energy", value: parseInt(totalEnergy/10)});
        artistAveragesArray.push({x: "liveness", value: parseInt(totalLiveness/10)})
        console.log(artistAveragesArray);
        return artistAveragesArray; // Return the mapped array
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array or handle error
        }
}

async function fetchAllArtists() {
    try {
        const response = await fetch('http://localhost:3000/artists');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data.map(item => item.Artist); // Return the mapped array
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array or handle error
    }
}

// Display Functions
const artistList = await fetchAllArtists();
function createDropdownOptions(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    // Clear existing options
    dropdown.innerHTML = "";

    // Populate the dropdown with new options from the array
    artistList.forEach(item => {
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
        Title1.textContent = "Artist: " + compare1;
    } else {
        console.log('Element with id "Title1" not found');
    }

    if (Title2) {
        Title2.textContent = "Artist: " + compare2;
    } else {
        console.log('Element with id "Title2" not found');
    }
    
    const Music1 = document.getElementById("Music1");
    const Music2 = document.getElementById("Music2");
    if (Music1) {
        fetchArtistMusicType(compare1)
            .then(data => {
                Music1.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Music1: ', error));
    } else {
            console.log('Element with id "Music1" not found');
    }

    if (Music2) {
        fetchArtistMusicType(compare2)
            .then(data => {
                Music2.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Music2: ', error));
    } else {
            console.log('Element with id "Music2" not found');
    }

    const Location1 = document.getElementById("Location1");
    const Location2 = document.getElementById("Location2");
    if (Location1) {
        fetchArtistLocation(compare1)
            .then(data => {
                Location1.textContent = "Location: " + data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Location1:', error));
    } else {
            console.log('Element with id "Location1" not found');
    }

    if (Location2) {
        fetchArtistLocation(compare2)
            .then(data => {
                Location2.textContent = "Location: " + data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Location2:', error));
    } else {
            console.log('Element with id "Location2" not found');
    }
    // Updates Description for Artists in real time
    const Description1 = document.getElementById("Description1");
    const Description2 = document.getElementById("Description2");

    if (Description1) {
        fetchArtistInfo(compare1)
            .then(data => {
                Description1.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Description1:', error));
    } else {
            console.log('Element with id "Description1" not found');
    }

    if (Description2) {
        fetchArtistInfo(compare2)
            .then(data => {
                Description2.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Description2:', error));
        } else {
            console.log('Element with id "Description2" not found');
    }

    // Fetch array data from the dictionary
    const arrayData1 = await fetchArtistData(compare1);
    const arrayData2 = await fetchArtistData(compare2);
    console.log(arrayData1);
    console.log(arrayData2);
    // Call the chart creation function
    const chartContainer = document.getElementById("spider_container");
    chartContainer.innerHTML = '';
    
    createComparisonRadarChart(compare1, compare2, arrayData1, arrayData2);
}