from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import re

# Load API key from environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize FastAPI
app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:5500"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for chat history
user_chat_history = {}

# Define request model
class TextRequest(BaseModel):
    text: str
    user_id: str  # To track chat history per user

# Chatbot function
def get_chatbot_response(history):
    prompt = "You are Kiwi, a friendly assistant and make sure the conversations are less than 150  words.\n"

    # Build conversation history
    for message in history[-5:]:  # Keep last 5 messages for context
        role = "User" if message["role"] == "user" else "Kiwi"
        prompt += f"{role}: {message['text']}\n"

    prompt += "Kiwi:"

    # Get response from Gemini API
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Error:", e)
        return "Sorry, I am having trouble responding."

# Chat endpoint
@app.post("/chat")
async def chat(request: TextRequest):
    user_id = request.user_id
    user_input = request.text

    # Initialize chat history if new user
    if user_id not in user_chat_history:
        user_chat_history[user_id] = []

    # Add user message to history
    user_chat_history[user_id].append({"role": "user", "text": user_input})

    # Get chatbot response
    bot_response = get_chatbot_response(user_chat_history[user_id])

    # Sanitize the response (remove unwanted special characters)
    bot_response = re.sub(r"[^\w\s.,!?]", "", bot_response)

    # Add bot response to history
    user_chat_history[user_id].append({"role": "bot", "text": bot_response})

    return {"response": bot_response}

# Run FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
