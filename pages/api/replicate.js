export default async function handler(req, res) {
  if (req.method === 'POST') {
    // In a real scenario, you would get the user's prompt from req.body
    // const { prompt } = req.body;

    // Simulate calling the OpenAI API
    // IMPORTANT: Replace this with actual OpenAI API call.
    // You'll need to install the 'openai' package (e.g., `npm install openai` or `yarn add openai`)
    // and configure your OpenAI API key securely (e.g., via environment variables).
    
    try {
      // Example of what an actual OpenAI call might look like (this is commented out):
      // import OpenAI from 'openai';
      // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      // const completion = await openai.chat.completions.create({
      //   messages: [{ role: "user", content: prompt || "Tell me a joke." }],
      //   model: "gpt-3.5-turbo",
      // });
      // const gptResponse = completion.choices[0].message.content;

      // For this example, we'll return a mock response after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const mockGptResponse = "This is a sample response from the mock GPT service. You asked about: " + (req.body.prompt || "something interesting!");
      
      res.status(200).json({ reply: mockGptResponse });
    } catch (error) {
      console.error("Error in mock GPT API:", error);
      res.status(500).json({ error: "Failed to get response from GPT (mock)" });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
