from flask import Flask, request, jsonify, send_from_directory
import requests
from flask_cors import CORS


app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Allow all CORS requests

# LM Studio API settings
# HERE EVERY TIME YOU RUN A MODEL YOU HAVE TO CHANGE API URL E.G(http://172.19.24.88:1234) SO EVERYTIME WE START THE MODEL WE HAVE TO UPDATE THE API URL 
LMSTUDIO_API_URL = "http://192.168.31.152:1234/v1/chat/completions"
MODEL_NAME = "phi-3.5-mini-instruct"

@app.route("/")
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    temperature = data.get("temperature", 0.7)
    max_tokens = data.get("max_tokens", 200)

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    try:
        lm_response = requests.post(LMSTUDIO_API_URL, json=payload)
        lm_response.raise_for_status()
        reply = lm_response.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Run the Flask server
    app.run(host="0.0.0.0", port=5000, debug=True)