# Anime Therapist Bot

A web application that provides therapeutic conversations with AI-powered anime characters. The bot uses Together AI's language model to generate responses in the style of different anime personalities.

🌐 **Live Demo**: [Anime Therapist Bot](https://animetherapistbot-1.onrender.com)

## Features

- Multiple anime character personalities to chat with
- Real-time conversation using AI
- Modern, responsive web interface
- Easy-to-use chat interface

## Prerequisites

- Python 3.11 or higher
- Together AI API key
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Go-j-o/AnimeTherapistBot.git
cd AnimeTherapistBot
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory and add your Together AI API key:
```
TOGETHER_API_KEY=your_api_key_here
```

## Running the Application

1. Start the Flask server:
```bash
python main.py
```

2. Open your web browser and navigate to:
```
http://localhost:5001
```

## Project Structure

```
AnimeTherapistBot/
├── frontend/              # Frontend files
│   ├── index.html        # Main HTML file
│   ├── style.css         # CSS styles
│   ├── script.js         # Frontend JavaScript
│   └── images/           # Character portraits
├── main.py               # Flask application
├── personality_loader.py # Personality configuration loader
├── personalities.json    # Character personalities
├── requirements.txt      # Python dependencies
└── .env                  # Environment variables (not in repo)
```

## Available Characters

- Aoi: A gentle and empathetic therapist
- Riku: A wise and experienced counselor
- Kuro: A mysterious and insightful guide
- Yumi: A cheerful and supportive friend
- Sora: A calm and understanding mentor

## Development

To modify or add new characters:
1. Edit the `personalities.json` file to add or modify character descriptions
2. Add corresponding character portraits in the `frontend` directory
3. Update the frontend interface in `frontend/index.html` and `frontend/script.js`

## Deployment

This project is deployed on Render. To deploy your own version:

1. Fork this repository
2. Sign up for a free Render account at [render.com](https://render.com)
3. Create a new Web Service and connect your repository
4. Configure the deployment with these settings:
   ```
   Name: your-preferred-name
   Environment: Python
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn main:app
   ```
5. Add these environment variables in Render:
   ```
   TOGETHER_API_KEY: your_together_ai_api_key
   FLASK_ENV: production
   ```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Acknowledgments

- Together AI for providing the language model
- Flask for the web framework
- Render for hosting the application