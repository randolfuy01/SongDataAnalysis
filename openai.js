
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "",
});

async function getArtistInformation(artist) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an asistant for someone looking into music."},
            { role: "user", content: "Describe who the artist " + artist + " is in 3 sentences."}
        ],
    });
    response = completion.choices[0].message.content;
    console.log(response)
    return response;
}

async function getSongInformation(song) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an assistant for someone looking into music."},
            { role: "user", content: "Desicribe what the song " + song + " is about in 3 sentences."}
        ],
    });
    response = completion.choices[0].message.content;
    console.log(response);
    return response;
}

module.exports.getArtistInformation = getArtistInformation;
module.exports.getSongInformation = getSongInformation;
