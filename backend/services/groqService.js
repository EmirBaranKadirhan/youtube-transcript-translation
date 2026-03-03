const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const translateAndSummarize = async (transcriptText) => {

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
                            
                        Return your response in this exact format:
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

        const summaryMatch = text.split("SUMMARY");
        const translationMatch = summaryMatch[0].split("TRANSLATION")  // translationMatch ==> ["", " Merhaba dünya "]

        const translation = translationMatch[1].trim() ?? "Ceviri Yapilamadi";
        const summary = summaryMatch[1]?.trim() ?? "Ozet Yapilamadi";   // ?? ==> null veya undefined gelirse "Ozet Yapilamadi"

        return { translation, summary }

    } catch (error) {
        console.log(error)
    }
}




module.exports = translateAndSummarize