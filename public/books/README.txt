======================================================================
              STUDYSHELF - PDF STORAGE DIRECTORY
======================================================================

Put your PDF files directly into this "public/books/" folder!

In Vite and React, any file placed inside the "public/" folder is 
served directly as a static file and can be downloaded by the browser.

Recommended Folder Structure:
-----------------------------
public/
  └── books/
        ├── 8th/
        ├── 9th/
        ├── 10th/
        ├── 11th-commerce/
        ├── 11th-science/
        ├── 12th-commerce/
        ├── 12th-science/
        └── novels/

For example:
- For 10th Maths:
    public/books/10th/10th-maths1.pdf
- For 11th Commerce Bookkeeping:
    public/books/11th-commerce/11th-comm-bk.pdf
- For The Alchemist novel:
    public/books/novels/novel-alchemist.pdf

Or you can specify any custom file path in "src/data/booksData.js":
    pdfFile: '/books/my_custom_book.pdf'

When a student clicks "Download Book", StudyShelf will directly download
your real PDF file!
======================================================================
