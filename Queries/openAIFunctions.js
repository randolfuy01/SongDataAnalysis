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

async function getArtistLocation(artist) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an assitant for someone looking into music."},
            { role: "user", content: "In one or two words, What country  is " + artist + " from."}
        ],
        max_tokens: 10,
        temperature: 0
    });
    const response = completion.choices[0].message.content;
    console.log(response);
    return response;
}
getArtistLocation("Drake");
module.exports = {
    getArtistInformation,
    getTrackInformation,
    getArtistMusicType,
    getArtistLocation
};