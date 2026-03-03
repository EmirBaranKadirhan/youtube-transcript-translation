const axios = require("axios")
const translateAndSummarize = require("../services/groqService")

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

        // console.log(response)
        console.log(response.data.transcript_only_text)
        const completedTranslation = await translateAndSummarize(response.data.transcript_only_text)
        res.status(200).json({
            success: true,
            videoId: response.data.videoId,
            transcript: completedTranslation
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getTranscript
}