import ollama
import re
import sys
import json

# Get prompt from command-line arguments
if len(sys.argv) > 1:
    Myprompt = sys.argv[1]
else:
    Myprompt = "Default prompt"

model = "deepseek-r1:7b"
answer = ollama.generate(model=model, prompt=Myprompt)
response =  answer["response"].split('</think>')[-1].strip()


output = {"DeepSeek": response}
print(json.dumps(output))  # Print JSON output
