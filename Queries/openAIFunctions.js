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

async function getArtistMusicType(artist) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an assistant for someone looking into music."},
            { role: "user", content: "Describe what genre of musc " + artist + "makes in 2 words."}
        ],
        max_tokens: 3,
        temperature: 0
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return response;
}

async function getArtistViews(artist) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are an assistant for someone looking into music."},
            { role: "user", content: "How many views does " + artist + " have."}
        ],
        max_tokens: 10,
        temperature: 0
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return response;
}

getArtistViews("Kanye");
module.exports = {
    getArtistInformation,
    getTrackInformation,
    getArtistMusicType
};