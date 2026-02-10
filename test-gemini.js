
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Testing API Key:", apiKey ? apiKey.substring(0, 10) + "..." : "Not Set");

    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is not set in .env");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Success! Response from Gemini:");
        console.log(text.substring(0, 100) + "...");
    } catch (error) {
        console.error("Error testing Gemini API:");
        console.error(error.message);
    }
}

testGemini();
