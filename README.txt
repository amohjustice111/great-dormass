GREAT DORMASS — JUSTICE AI WORKING STARTER

This package includes the Great Dormass website interface and a Vercel server-side API endpoint for real AI chat.

SETUP
1. Extract this ZIP. Upload index.html, the api folder, and the image files to the root of your GitHub repository.
2. Import the repository into Vercel (or redeploy your existing Vercel project).
3. In Vercel open Project Settings > Environment Variables. Add OPENAI_API_KEY with your secret API key from the OpenAI developer platform.
4. Optionally add OPENAI_MODEL set to a model available to your API account. Default: gpt-4.1-mini.
5. Redeploy after saving the environment variables, then test the deployed site.

IMPORTANT
- Until OPENAI_API_KEY is configured, real AI chat will not work.
- Never place the API key in index.html or commit it to GitHub.
- API usage may cost money; review pricing and configure usage limits.
- No AI can promise literally every answer or perfect accuracy. Justice AI is instructed to be friendly, explain clearly, and admit uncertainty.
- Profile and chat history are stored in localStorage on this browser only, not synced securely across devices.
- Image upload, speech input, and spoken answers depend on browser support.
- This API route is for Vercel; Netlify requires a Netlify Function conversion.
