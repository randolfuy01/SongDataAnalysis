const openAIFunctions = require('./Queries/openAIFunctions.js');
const database = require('./Queries/database.js')

var port = 3000;
var path = require('path');
var express = require('express');
var app = express();
const fs = require('fs');
var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(StaticDirectory));
// Set up a route for the home page

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

// Route Handing for openai API
app.get('/artist-info/:artist', async (req, res) => {
    try {
      const artist = req.params.artist;
      const info = await openAIFunctions.getArtistInformation(artist);
      res.send(info);
    } catch (error) {
      console.error(error); 
      res.status(500).send('Error retrieving artist description');
    }
});
  
app.get('/track-info/:track', async (req, res) => {
  try {
    const song = req.params.track;
    const info = await openAIFunctions.getTrackInformation(song); 
    res.send(info);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Error retrieving song description');
  }
});

app.get('/music-type/:artist', async (req, res) => {
  try {
    const artist = req.params.artist;
    const info = await openAIFunctions.getArtistMusicType(artist);
    res.send(info);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving artist type')
  }
});

// Database Queries
app.get('/artist/:artistName', (req, res) => {
  database.getArtistData(req.params.artistName, (err, result) => {
      if (err) {
          res.status(500).send('Error retrieving artist data');
      } else {
          res.json(result);
      }
  });
});

app.get('/track/:trackName', (req, res) => {
  database.getTrackData(req.params.trackName, (err, result) => {
      if (err) {
          res.status(500).send('Error retrieving track data');
      } else {
          res.json(result);
      }
  });
});

app.get('/artists', (req, res) => {
  database.getAllArtists((err, artists) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error retrieving artists');
      } else {
          res.json(artists);
      }
  });
});

app.get('/tracks', (req, res) => {
  database.getAllTracks((err, tracks) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving tracks');
    } else {
      res.json(tracks);
    }
  });
});
