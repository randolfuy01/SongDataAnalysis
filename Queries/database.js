const mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL123",
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
            callback(null, result);
        }
    });
};


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

function getAllTracks(callback) {
    const query_string = "SELECT DISTINCT(Track) FROM song_datasets;";
    const allTracks = []
    con.query(query_string, function (err, result) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, result);
        }
        result.forEach(element => {
            value = element.Artist;
            allTracks.push(value);
        });
    });
    return allTracks;
};

module.exports = {
    getArtistData,
    getTrackData,
    getAllArtists, 
    getAllTracks
};