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

async function getTrackInformation(track) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an assistant for someone looking into music."},
            { role: "user", content: "Desicribe what the track " + track + " is about in 3 sentences."}
        ],
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return response;
}

module.exports = {
    getArtistInformation,
    getTrackInformation
};