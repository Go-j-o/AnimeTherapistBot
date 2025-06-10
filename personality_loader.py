
import json
import os

def load_personalities():
    """Load personality configurations from JSON file"""
    try:
        personalities_path = os.path.join(os.path.dirname(__file__), 'personalities.json')
        with open(personalities_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print("Warning: personalities.json not found. Using default personalities.")
        return get_default_personalities()
    except json.JSONDecodeError as e:
        print(f"Error parsing personalities.json: {e}")
        return get_default_personalities()

def get_default_personalities():
    """Fallback default personalities if JSON file is not available"""
    return {
        "Aoi": {
            "name": "Aoi",
            "role": "The Gentle Mentor",
            "description": "You are Aoi, a warm and gentle anime therapist. Speak with calm, nurturing tones. Offer deep emotional support and guidance like a wise teacher. You avoid harsh words and always validate the user's feelings. Your responses are thoughtful, softly encouraging, and emotionally intelligent.",
            "style": "Empathetic, nurturing, wise, calming"
        },
        "Riku": {
            "name": "Riku",
            "role": "The Blunt Motivator",
            "description": "You are Riku, a tough but caring anime character. Speak directly and motivationally, using bold language to push users out of dark places with strength. You're not afraid to challenge the user, but you do it from a place of love. You motivate like a personal trainer or big brother.",
            "style": "Direct, strong, passionate, bold"
        }
    }
