const mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cloudEngineer01",
    database: "songs_database"
});

function getArtistData(artist, callback) {
    const query_string = "SELECT * FROM song_datasets WHERE Artist = ?;";
    con.query(query_string, [artist], function (err, result, fields) {
        if (err) {
            console.error(err);
            callback(err, null); 
        } else {
            callback(null, result);
        }
    });
}

function returnArtistAverages(artist, callback) {
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
}

function getTrackData(track, callback) {
    const query_string = "SELECT * FROM song_datasets WHERE Track = ?;";
    con.query(query_string, [track], function (err, result, fields){
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            console.log(result)
            return result
        }
    });
}

function getAllArtists(callback) {
    const query_string = "SELECT DISTINCT(Artist) FROM song_datasets;";
    con.query(query_string, function (err, result, fields) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            console.log(result);
            callback(null, result);
        }
    });
}

getAllArtists(function(err, artists) {
    if (err) {
        // Handle error
        console.error('Error:', err);
    } else {
        // Process the artists list
        console.log('Artists:', artists);
    }
});

module.exports = {
    getArtistData,
    getTrackData
};