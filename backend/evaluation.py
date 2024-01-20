from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
import openai
from llama import Llama
from weaviate import Weaviate

app = FastAPI()

# Set your API keys
openai.api_key = 'your-gpt-3-api-key'
llama_api_key = 'your-llama-api-key'
weaviate_api_key = 'your-weaviate-api-key'

# Initialize services
llama = Llama(api_key=llama_api_key)
weaviate = Weaviate(api_key=weaviate_api_key)

# Set up templates
templates = Jinja2Templates(directory="templates")

@app.get("/")
def read_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate_prompt")
async def generate_prompt(user_input: str = Form(...)):

    # Generate enhanced prompt using Llama
    enhanced_prompt = llama.enrich_prompt(user_input)

    # Generate AI response using GPT-3
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"User input: {enhanced_prompt}\nAI response:"
    )
    ai_response = response['choices'][0]['text']

    # Save enhanced prompt and AI response to Weaviate
    weaviate.create_object({
        "class": "UserPrompt",
        "properties": {
            "user_input": user_input,
            "enhanced_prompt": enhanced_prompt,
            "ai_response": ai_response
        }
    })

    return templates.TemplateResponse("result.html", {"request": request, "user_input": user_input, "enhanced_prompt": enhanced_prompt, "ai_response": ai_response})
