# hexGPT 🤖

A modern UI chatbot powered by **LM Studio** running **phi-3.5-mini-instruct** locally.  
hexGPT gives you a sleek chat experience with conversation history, export options, image uploads, and theme toggling — all without needing cloud APIs.

---

## 🚀 Features

- 💬 Chat with a **local LLM** (via LM Studio API).
- 📝 Save & manage multiple conversations.
- 📤 Export any conversation as a JSON file.
- 🌓 Toggle **light/dark themes**.
- 🖼️ Upload and send **images inline** in the chat.
- ⚡ Simple Node.js + Express backend, no external dependencies beyond LM Studio.

---

## 📸 Demo Screenshot

<img width="1918" height="919" alt="Screenshot 2025-08-18 165744" src="https://github.com/user-attachments/assets/cfc08a62-296a-4ee3-af02-6e449f618adf" />
<img width="1919" height="927" alt="Screenshot 2025-08-18 165750" src="https://github.com/user-attachments/assets/d2924095-456b-4309-958f-9b2306174967" />



---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/pbharatchandra/hexGPT.git
cd hexGPT

2. Install dependencies
npm install

3. Run the server
node server.js


By default the app runs at:
👉 http://localhost:5000

⚙️ Configuration (LM Studio API)

hexGPT connects to your local LM Studio API.
Make sure LM Studio is running a model (e.g., phi-3.5-mini-instruct).

The default API URL in server.js is:

let LMSTUDIO_API_URL = "http://172.19.21.241:1234/v1/chat/completions";


If your LM Studio starts at a different URL (like http://127.0.0.1:1234), update it in server.js or send a POST request to dynamically update it:

curl -X POST http://localhost:5000/set_api \
  -H "Content-Type: application/json" \
  -d '{"url": "http://127.0.0.1:1234/v1/chat/completions"}'

📂 Project Structure
hexGPT/
├── index.html       # Frontend UI
├── style.css        # Styling for chat UI
├── server.js        # Backend (Express + LM Studio API proxy)
├── package.json     # Node.js dependencies
├── .gitignore       # Ignored files for GitHub
└── test/
    └── lmstudio.py  # Example test script

🧑‍💻 Usage

Open the app in your browser.

Type a message in the input bar and press Send (➤).

Manage conversations in the sidebar:

➕ New conversation

🧹 Clear messages

📤 Export conversation

🌗 Toggle theme

📎 Upload images to send inline inside the chat.

🤝 Contributing

Contributions are welcome!
If you’d like to improve hexGPT, open an issue or submit a pull request.

📜 License

MIT License © 2025 Bharat Chandra

⭐ Support

If you like this project, please ⭐ the repository on GitHub:
👉 https://github.com/pbharatchandra/hexGPT


---

✅ This README has everything:  
- Project description  
- Features  
- Installation & run guide  
- API config  
- Usage instructions  
- Contributing + License  
- GitHub star support  

Do you want me to also **add badges** (like Node.js, Express, MIT License, Stars) at the top for a more professional look?

