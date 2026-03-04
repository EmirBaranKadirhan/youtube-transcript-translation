const axios = require("axios")
const translateAndSummarize = require("../services/groqService")
const Transcript = require("../models/Transcript")

const getTranscript = async (req, res) => {

    const fromUserGetUrl = req.body.videoUrl;


    try {

        const response = await axios.get("https://api.scrapecreators.com/v1/youtube/video/transcript", {

            headers: {
                'x-api-key': process.env.ScrapeCreators_API_KEY
            },
            params: {
                'url': fromUserGetUrl,
            }

        })

        const cleanedText = response.data.transcript_only_text.replace(/\s+/g, ' ').trim();

        // console.log(response)
        console.log("Orjinal Metin:", cleanedText)

        const completedTranslation = await translateAndSummarize(cleanedText)

        if (!completedTranslation) {
            return res.status(503).json({
                message: "Çeviri servisi şu an kullanılamıyor, lütfen daha sonra tekrar deneyin."
            })
        }


        const savedTranscript = await Transcript.create({
            videoId: response.data.videoId,
            title: completedTranslation["title"],
            originalText: cleanedText,
            translatedText: completedTranslation["translation"],
            summarizedText: completedTranslation["summary"],


        });

        res.status(200).json({
            success: true,
            videoId: response.data.videoId,
            transcript: completedTranslation
        })
    } catch (error) {
        console.log(error)
    }

}


const getHistory = async (req, res) => {

    try {

        const transcripts = await Transcript.find().sort({ createdAt: -1 }).limit(20)
        res.status(200).json(transcripts)

    } catch (error) {
        res.status(500).json({ message: "Geçmiş alınamadı" })
    }


}


module.exports = {
    getTranscript,
    getHistory
}