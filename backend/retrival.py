import os
from dotenv import load_dotenv
import sys

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")


def file_reader(path: str, ) -> str:
    filename = os.path.join(path)
    with open(filename, 'r') as f:
        system_message = f.read()
    return system_message


def test_contextualized_answer():
    context_message = file_reader("/context.txt")
    prompt_message = file_reader("")
    context = str(context_message)
    prompt = str(prompt_message)


