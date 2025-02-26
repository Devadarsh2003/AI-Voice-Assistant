import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key from environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# System prompt to guide the chatbot's behavior
KIWI_PROMPT = """You are Kiwi, an AI assistant. 
You are friendly, engaging, and aim to have short, meaningful conversations. 
Keep responses concise and helpful.
"""

def get_chatbot_response(chat_history):
    """
    Generates a chatbot response using Google's Gemini API.
    :param chat_history: List of user-bot messages to maintain context.
    :return: AI-generated response.
    """
    # Combine system instruction with user chat history
    user_messages = "\n".join([f"{msg['role']}: {msg['text']}" for msg in chat_history])

    prompt = KIWI_PROMPT + "\n\n" + user_messages  # Ensure it follows Kiwi's persona

    model = genai.GenerativeModel("gemini-pro")
    
    response = model.generate_content(prompt)
    
    return response.text if response.text else "I'm not sure how to respond."
