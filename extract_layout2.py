import fitz

doc = fitz.open("Wadi Jeddah Startups.pdf")
for page_num in range(29, len(doc)):
    page = doc[page_num]
    text = page.get_text("text").strip()
    if len(text) > 5:
        print(f"--- PAGE {page_num + 1} ---")
        print(text)
