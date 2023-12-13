import { createSingularChart } from "./radar.js";
// Async functions 
async function fetchTrackInfo(trackName) {
    const response = await fetch(`/track-info/${trackName}`);
    console.log("fetch successful");
    const data = await response.text();
    return data;
}

async function fetchTrackType(trackName) {
    const response = await fetch(`/track-type/${trackName}`);
    const data = await response.text();
    return data;
}

async function fetchTrackArtist(trackName) {
    const response = await fetch(`/track-artist/${trackName}`);
    const data = await response.text();
    return data;
}

async function fetchAlbum(trackName) {
    try {
        const response = await fetch(`http://localhost:3000/track/${trackName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data[0].Album);
        return data[0].Album; // Return the mapped array
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array or handle error
        }
}

fetchAlbum("21 Questions");
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
        return data.map(item => item.Track.slice(0,30)); // Return the mapped array
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

// Event listener for dropdowns change
document.getElementById("compare1Dropdown").addEventListener("change", updateChart);

async function updateChart() {
    // Fetch selected values
    const compare1 = document.getElementById("compare1Dropdown").value;

    // Updates Title for Artists in real time
    const Title1 = document.getElementById("song-name");

    if (Title1) {
        Title1.textContent = "Song: " + compare1;
    } else {
        console.log('Element with id "song-name" not found');
    }

    const Artist1 = document.getElementById("track-artist");
    if (Artist1) {
        fetchTrackArtist(compare1)
            .then(data => {
                Artist1.textContent = "Artist: " + data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist name for artist:', error));
    } else {
        console.log('Element with id "track-artist" not found');
    }

    const artistName = document.getElementById("artist-name");

    if (artistName) {
        fetchTrackArtist(compare1)
            .then(data => {
                artistName.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist name for Description1:', error));
    } else {
        console.log('Element with id "artist-name" not found');
    }

    const trackType = document.getElementById("track-type");

    if (trackType ) {
        fetchTrackType(compare1)
            .then(data => {
                trackType.textContent = "Genre: " + data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for "track-type":', error));
    } else {
        console.log('Element with id "track-type" not found');
    }

    // Updates Description for Artists in real time
    const Description1 = document.getElementById("Description1");

    if (Description1) {
        fetchTrackInfo(compare1)
            .then(data => {
                Description1.textContent = data; // Ensure assignment is inside .then()
            })
            .catch(error => console.error('Error fetching artist info for Description1:', error));
    } else {
        console.log('Element with id "Description1" not found');
    }

    const Album1 = document.getElementById("Album1");

    if (Album1) {
        const data = await fetchAlbum(compare1);
        Album1.textContent = "Album: " + data;
    } else {
        console.log('Element with id "Album" not found');
    }
    // Fetch array data from the dictionary
    const arrayData1 = await fetchTrackData(compare1);

    // Call the chart creation function
    const chartContainer = document.getElementById("spider_container");
    chartContainer.innerHTML = '';
    
    createSingularChart(compare1, arrayData1);
}