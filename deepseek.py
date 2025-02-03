import ollama
import re

model = "deepseek-r1:7b"

while True:
    Myprompt = input("You: ")
    answer = ollama.generate(model=model, prompt=Myprompt)
    only_ans = re.sub(r".*</think>\s*", "", answer["response"])
    print("DeepSeek:", answer)