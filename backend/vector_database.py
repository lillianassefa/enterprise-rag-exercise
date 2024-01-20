import weaviate
import os
from dotenv import load_dotenv

load_dotenv()

weaviate_api_key = os.getenv("WEAVIATE_API_kEY")
openai_api_key = os.getenv("OPENAI_API_KEY")

client = weaviate.Client(
    url="https://precision-rag-ov8u665q.weaviate.network", 
    auth_client_secret=weaviate.AuthApiKey(api_key= weaviate_api_key),
     additional_headers={
        "X-OpenAI-Api-Key": openai_api_key  
    }
      )

client.schema.get()