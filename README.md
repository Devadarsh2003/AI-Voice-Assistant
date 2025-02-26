# KIWI - AI Voice Assistant

KIWI is an AI-powered voice assistant built using FastAPI for the backend and a JavaScript-based frontend. It supports speech recognition, text processing via Gemini API, and speech synthesis.

## Features
- 🎤 **Voice Recognition**: Converts speech to text using Web Speech API.
- 🧠 **NLP Processing**: Processes queries with Gemini API.
- 🔊 **Text-to-Speech**: Speaks responses back to the user.
- 🌐 **Web Interface**: Simple UI for interacting with the assistant.
- 🐳 **Docker Support**: Easily deployable via Docker.
- ☁ **DockerHub Integration**: Pre-built images for easy setup.

## Project Structure
```
AI-Voice-Assistant/
├── frontend/          # UI and scripts
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
├── backend/           # FastAPI server
│   ├── main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
├── docker-compose.yml # Docker Compose setup
├── README.md          # Project documentation
└── images/            # Screenshots and visual assets
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Devadarsh2003/AI-Voice-Assistant.git
cd AI-Voice-Assistant
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```
This will start both the frontend and backend services.

### 3. Access the Application
- **Frontend**: Open `http://localhost:8080`
- **Backend API**: Access FastAPI docs at `http://localhost:8000/docs`

## Pull from DockerHub
You can directly pull and run the images from DockerHub:
```bash
docker pull devadarsh2003/voiceassistance-backend
```
```bash
docker pull devadarsh2003/voiceassistance-frontend
```

## Kubernetes Deployment (Coming Soon)
Stay tuned for Kubernetes deployment steps!

## Showcase
![KIWI home page - Demo](images/.png)


Future Additions

- 🌍 Multi-language Support
- 📞 Integration with WhatsApp & Telegram
- 🤖 AI-powered Smart Responses with Context Awareness
- 🎵 Music & Media Control

## Contributing
Feel free to fork this repo, submit pull requests, or suggest improvements.

## License
This project is licensed under the MIT License.

