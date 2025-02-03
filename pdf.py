import pdfplumber
import re
import json

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() 
    return text

def extract_info(text):
    data = {}
    data["name"] = re.search(r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)", text).group(0) if re.search(r"([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)", text) else None
    data["email"] = re.search(r"[\w\.-]+@[\w\.-]+", text).group(0) if re.search(r"[\w\.-]+@[\w\.-]+", text) else None
    data["phone"] = re.search(r"\+?\d{10,}", text).group(0) if re.search(r"\+?\d{10,}", text) else None
    return json.dumps(data, indent=4)

# Example usage
pdf_path = r"C:\Users\compt\Downloads\fuad.pdf"
text = extract_text_from_pdf(pdf_path)
json_output = extract_info(text)
print(text)
print(json_output)
