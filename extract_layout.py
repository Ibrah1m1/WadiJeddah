import fitz

doc = fitz.open("Wadi Jeddah Startups.pdf")
for page_num in range(len(doc)):
    page = doc[page_num]
    blocks = page.get_text("blocks")
    # Sort blocks primarily by y0 (top to bottom), then by x0 (right to left for Arabic)
    blocks.sort(key=lambda b: (b[1], -b[0]))
    print(f"--- PAGE {page_num + 1} ---")
    for b in blocks:
        text = b[4].strip().replace("\n", " ")
        if len(text) > 2:
            print(f"Y:{int(b[1]):04d} X:{int(b[0]):04d} | {text}")

