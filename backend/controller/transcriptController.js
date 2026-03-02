const axios = require("axios")


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

        console.log(response)
        res.status(200).json({
            success: true,
            videoId: response.data.videoId,
            transcript: response.data.transcript_only_text
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getTranscript
}