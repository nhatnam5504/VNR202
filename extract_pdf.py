import fitz
import os

pdf_path = "d:\\VNR\\VNR0-compressed (1).pdf"
doc = fitz.open(pdf_path)

for page_num in range(min(5, len(doc))):
    page = doc.load_page(page_num)
    pix = page.get_pixmap(dpi=150)
    output_path = f"d:\\VNR\\page_{page_num}.png"
    pix.save(output_path)
    print(f"Saved {output_path}")
