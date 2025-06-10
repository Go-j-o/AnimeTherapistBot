from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from together import Together
import os
from personality_loader import load_personalities
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize Together AI client
client = Together(api_key=os.getenv("TOGETHER_API_KEY"))

# --- Personality configuration (modular & readable) ---
PERSONALITIES = load_personalities()

@app.route("/")
def home():
    return send_from_directory('frontend', 'index.html')

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory('frontend', filename)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        message = data.get("message", "").strip()
        personality = data.get("personality", "Aoi")

        if not message:
            return jsonify({"error": "No message provided."}), 400

        # Get the appropriate prompt
        persona = PERSONALITIES.get(personality)
        if not persona:
            return jsonify({"error": "Invalid personality selected."}), 400

        prompt = persona["description"]

        # Generate the AI response using Together AI
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": message}
            ],
            max_tokens=150,
            temperature=0.7,
        )

        reply = response.choices[0].message.content.strip()

        return jsonify({"reply": reply, "personality": personality})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
