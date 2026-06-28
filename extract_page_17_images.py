import fitz
doc = fitz.open("Wadi Jeddah Startups.pdf")
page = doc[16] # 0-indexed for page 17
image_list = page.get_images(full=True)
print(f"Found {len(image_list)} images on Page 17")
for img_index, img in enumerate(image_list):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_ext = base_image["ext"]
    with open(f"page17_img{img_index}.{image_ext}", "wb") as f:
        f.write(base_image["image"])
