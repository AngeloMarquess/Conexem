import io
import sys
from pypdf import PdfReader

def main():
    reader = PdfReader("Webservice Onipublish 1.2.pdf")
    with open("extract.txt", "w", encoding="utf-8") as f:
        for page in reader.pages:
            f.write(page.extract_text() + "\n")

if __name__ == "__main__":
    main()
