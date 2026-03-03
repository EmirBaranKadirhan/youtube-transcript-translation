const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const translateAndSummarize = async (transcriptText, title) => {

    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `You are a helpful assistant. The following is a YouTube video transcript in English.
                    STRICT INSTRUCTIONS:
                        1. Translate the entire transcript to Turkish.
                        2. Write a concise summary in Turkish (max 3-4 sentences).
                        3. Use the EXACT headers provided below. DO NOT translate the headers "TRANSLATION:" and "SUMMARY:".
                        4. Do not include any introductory text like "Sure, here is the translation".
                        5. Create a short Turkish title (max 10 words) for this video
                            
                        Return your response in this exact format:

                            TITLE:
                            [Turkish title here]

                            TRANSLATION:
                            [Turkish translation here]

                            SUMMARY:
                            [Turkish summary here]

                            Transcript:
                            ${transcriptText}`
                    ,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const text = chatCompletion.choices[0].message.content;
        console.log(text)

        const titleMatch = text.split("TITLE:");
        console.log("SPLIT RESULT:", titleMatch);

        const translationMatch = titleMatch[1].split("TRANSLATION:");
        const summaryMatch = translationMatch[1].split("SUMMARY:")  // summaryMatch ==> ["", " Merhaba dünya "]

        const title = translationMatch[0]?.trim() ?? "Baslik Yapilamadi"
        const translation = translationMatch[1]?.trim() ?? "Ceviri Yapilamadi";
        const summary = summaryMatch[1]?.trim() ?? "Ozet Yapilamadi";   // ?? ==> null veya undefined gelirse "Ozet Yapilamadi"

        return { title, translation, summary }

    } catch (error) {
        console.log("GROQ HATASI:", error)
        return null
    }
}




module.exports = translateAndSummarize