const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: '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',
});

async function getArtistInformation(artist) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an asistant for someone looking into music."},
            { role: "user", content: "Describe who the artist " + artist + " is in 3 sentences."}
        ],
    });
    const response = completion.choices[0].message.content;
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
    const response = completion.choices[0].message.content;
    return response;
}

module.exports = {
    getArtistInformation,
    getSongInformation
};