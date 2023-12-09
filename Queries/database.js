const mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cloudEngineer01",
    database: "songs_database"
});

// Getting singular data for artist or track
function getArtistData(artist, callback) {
    const query_string = "SELECT * FROM song_datasets WHERE Artist = ?;";
    con.query(query_string, [artist], function (err, result) {
        if (err) {
            console.error(err);
            callback(err, null); 
        } else {
            callback(null, result);
        }
    });
};

function getTrackData(track, callback) {
    const query_string = "SELECT * FROM song_datasets WHERE Track = ?;";
    con.query(query_string, [track], function (err, result){
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            console.log(result)
            return result
        }
    });
};

// Getting data for all artists
function getArtistAverages(artist, callback) {
    const artistAveragesArray = [];
    getArtistData(artist, function(err, result) {
        if (err) {
            console.error('Error fetching artist data:', err);
            return;
        }

        // Assuming 'result' is an array of song data
        let totalEnergy = 0;
        let totalAcousticness = 0;
        let totalValence = 0;
        let totalSpeechiness = 0;
        let totalInstrumentalness = 0;
        let totalLiveness = 0;
        result.forEach(element => {
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
        artistAveragesArray.push({x: "Instrumentalness", value: parseInt(totalInstrumentalness/10)});
        artistAveragesArray.push({x: "Energy", value: parseInt(totalEnergy/10)});
        artistAveragesArray.push({x: "liveness", value: parseInt(totalLiveness/10)})
        console.log(artistAveragesArray)
    });
    return artistAveragesArray;
};

function getTotalAverages(callback) {
    const totalAverages = []
    const query_string = "SELECT * FROM song_datasets;";
    con.query(query_string, function (err, result) {
        if (err) {
            console.error(err);
            callback(err, null); 
        } else {
            console.log(result);
            callback(null, result);
        }
        let totalEnergy = 0;
        let totalAcousticness = 0;
        let totalValence = 0;
        let totalSpeechiness = 0;
        let totalInstrumentalness = 0;
        let totalLiveness = 0;
        result.forEach(element => {
            totalEnergy += element.Energy;
            totalAcousticness += element.Acousticness;
            totalValence += element.Valence;
            totalSpeechiness += element.Speechiness;
            totalInstrumentalness += element.Acousticness;
            totalLiveness += element.Liveness;
        });
        totalAverages.push({x: "accoustic", value: parseInt(totalAcousticness/17841)});
        totalAverages.push({x: "valence", value: parseInt(totalValence/17841)});
        totalAverages.push({x: "speechiness", value: parseInt(totalSpeechiness/17841)});
        totalAverages.push({x: "Instrumentalness", value: parseInt(totalInstrumentalness/17841)});
        totalAverages.push({x: "Energy", value: parseInt(totalEnergy/17841)});
        totalAverages.push({x: "liveness", value: parseInt(totalLiveness/17841)})
        console.log(totalAverages);
    });
    return totalAverages;
}


function getAllArtists(callback) {
    const query_string = "SELECT DISTINCT(Artist) FROM song_datasets;";
    const allArtists = []
    con.query(query_string, function (err, result) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
        result.forEach(element => {
            value = element.Artist;
            allArtists.push(value);
        });
    });
    return allArtists;
};


// Testing 
getAllArtists(function(err, artists) {
   if (err) {
        console.error('Error:', err);
    } else {
        console.log('Artists:', artists);
    }
});

getTotalAverages(function(err, data) {
   if (err) {
        // Handle the error
        console.error('Error fetching data:', err);
    } else {
        // Process the data
       console.log('Data:', data);
        // Here you can calculate averages or any other operation
    }
});
getArtistAverages("Black Eyed Peas");

module.exports = {
    getArtistData,
    getArtistAverages,
    getTrackData,
    getAllArtists,
    getTotalAverages, 
};