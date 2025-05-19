import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.");
      return res.status(500).json({ error: "API key not configured on server." });
    }

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        model: "gpt-4.1", // You can change this to gpt-4 or other models you have access to
      });

      const gptResponse = completion.choices[0]?.message?.content?.trim();

      if (gptResponse) {
        res.status(200).json({ reply: gptResponse });
      } else {
        console.error("Received an empty or unexpected response from OpenAI API:", completion);
        res.status(500).json({ error: "Failed to get a valid response from GPT." });
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      // Provide more specific error messages if possible
      let errorMessage = "Failed to get response from GPT.";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        errorMessage = `OpenAI API Error: ${error.response.data?.error?.message || error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        errorMessage = "No response received from OpenAI API.";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
