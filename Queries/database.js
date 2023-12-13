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

function getTotalAverages(callback) {
    const query_string = "SELECT * FROM song_datasets;";
    con.query(query_string, function (err, result) {
        if (err) {
            console.error(err);
            callback(err, null);
            return;
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
            totalInstrumentalness += element.Instrumentalness; // Fixed property name
            totalLiveness += element.Liveness;
        });

        const totalAverages = [];
        if (result.length > 0) {
            totalAverages.push({x: "acoustic", value: parseInt(totalAcousticness / result.length)});
            totalAverages.push({x: "valence", value: parseInt(totalValence / result.length)});
            totalAverages.push({x: "speechiness", value: parseInt(totalSpeechiness / result.length)});
            totalAverages.push({x: "instrumentalness", value: parseInt(totalInstrumentalness / result.length)});
            totalAverages.push({x: "energy", value: parseInt(totalEnergy / result.length)});
            totalAverages.push({x: "liveness", value: parseInt(totalLiveness / result.length)});
        }

        callback(null, totalAverages); // Call the callback with processed data
    });
    // No return statement here, as con.query is asynchronous
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
getArtistAverages("Drake");

module.exports = {
    getArtistData,
    getArtistAverages,
    getTrackData,
    getAllArtists,
    getTotalAverages, 
};