const apikey = import.meta.env.VITE_GEMINI_API;
const ai = new GoogleGenerativeAI(apikey);

const Generatesummary = async () => {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Job title: ${resumeinfo?.jobTitle || "Software Engineer"}.
    Based on this job title, write a professional resume summary in 4-5 lines.`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    setsummary(text);
  } catch (error) {
    console.error("AI Error:", error);
    toast("Failed to generate summary");
  }
};
