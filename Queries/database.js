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
            console.log(result);
            return result;
        }
    });
}
console.log(getArtistData('Black Eyed Peas'));

function getTrackData(track, callback) {
    const query_string = "SELECT * FROM song_datasets WHERE Track = ?;";
    con.query(query_string, [track], function (err, result, fields){
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            console.log(result)
            return result;
        }
    });
}

module.exports = {
    getArtistData,
    getTrackData
};