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