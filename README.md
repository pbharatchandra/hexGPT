# 🚀 hexGPT

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Stars](https://img.shields.io/github/stars/pbharatchandra/hexGPT?style=social)

A modern local chatbot UI powered by **LM Studio** and **Express.js**, featuring:
- 🖥️ Sleek sidebar & chat interface  
- 💬 Multi-conversation support  
- 📎 Inline image uploads  
- 🌗 Dark/light theme toggle  
- 🧹 Conversation clearing & export  

---

## 📦 Installation
# 1. Clone the repository
git clone https://github.com/pbharatchandra/hexGPT.git
cd hexGPT

# 2. Install dependencies
npm install

# 3. Run the server
node server.js
By default, the app runs at:
👉 http://localhost:5000

⚙️ Configuration (LM Studio API)
hexGPT connects to your local LM Studio API.
Make sure LM Studio is running a model (e.g., phi-3.5-mini-instruct).

Default API URL in server.js:

let LMSTUDIO_API_URL = "http://172.19.21.241:1234/v1/chat/completions";
If LM Studio runs at a different URL (e.g. http://127.0.0.1:1234), you can update it dynamically:

curl -X POST http://localhost:5000/set_api \
  -H "Content-Type: application/json" \
  -d '{"url": "http://127.0.0.1:1234/v1/chat/completions"}'
  
📂 Project Structure
---
hexGPT/
├── index.html       # Frontend UI
├── style.css        # Chat UI styles
├── server.js        # Backend (Express + LM Studio proxy)
├── package.json     # Node.js dependencies
├── .gitignore       # Ignored files for GitHub
└── test/
    └── lmstudio.py  # Example test script
🧑‍💻 Usage
Open the app in your browser at http://localhost:5000.

➕ New conversation – start fresh

🧹 Clear messages – delete conversation

📤 Export conversation – save as JSON

🌗 Toggle theme – switch dark/light mode

📎 Upload images – appear inline in chat

🤝 Contributing
Contributions are welcome!
If you’d like to improve hexGPT, open an issue or submit a pull request.

📜 License
---
👉 [MIT License © 2025 Bharat Chandra ](https://github.com/pbharatchandra)

⭐ Support
---
If you like this project, please star ⭐ the repository:
👉 [hexGPT on GitHub](https://github.com/pbharatchandra/hexGPT)

---
```bash
