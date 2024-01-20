from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()
import os
api_key = os.environ.get("OPENAI_API_KEY")

app = FastAPI()
client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatInput(BaseModel):
    user_message: str


@app.post("/get_prompt_completion")
def get_prompt_completion(chat_input: ChatInput):
    prompt = f"You will be provided with a prompt and I want you to improve the prompt into more accurate and detailed one\n\nUser Input: {chat_input.user_message}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {"role": "user", "content": " {chat_input.user_message}"},
        ],
        temperature=0.8,
        max_tokens=64,
        top_p=1,
    )
    gemerated_content = response.choices[0].message.content
    return {
        "generated_content": gemerated_content
    }
if __name__ == "__main__":
    import uvicorn

    # Run the FastAPI application
    uvicorn.run(app, host="127.0.0.1", port=8000)

