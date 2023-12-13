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
