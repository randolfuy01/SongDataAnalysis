const openAIFunctions = require('./openAIFunctions.js');
const getArtistInformation = openAIFunctions.getArtistInformation;
const getSongInformation = openAIFunctions.getSongInformation;

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
      const info = await getArtistInformation(artist);
      res.send(info);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send('Error retrieving artist information');
    }
  });
  
  app.get('/song-info/:song', async (req, res) => {
    try {
      const song = req.params.song;
      const info = await getSongInformation(song);
      res.send(info);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).send('Error retrieving song information');
    }
  });