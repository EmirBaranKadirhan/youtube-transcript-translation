import { YoutubeTranscript } from 'youtube-transcript';

const extractVideoId = (url) => {

    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;


}


const getTranscript = async (req, res) => {

    try {

        const { videoUrl } = req.body       // frontend gelen url
        const videoId = extractVideoId(videoUrl);

        if (!videoId) {
            return res.send(400).json({ message: "Geçersiz YouTube URL'si!" })
        }

        const transcriptConfig = await YoutubeTranscript.fetchTranscript(videoId);

        const fullText = transcriptConfig.map((item) => item.text).join(" ");

        res.status(200).json({
            success: true,
            videoId: videoId,
            transcript: fullText
        })
    } catch (error) {

        console.error("Transkript hatası:", error);
        res.status(500).json({ message: "Transkript alınırken bir hata oluştu. (Altyazılar kapalı olabilir)" });
    }

}