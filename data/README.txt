================================================================================
                    STUDYSHELF - PDF FOLDER STRUCTURE
================================================================================

All individual category folders have been created for you!

You can put your PDF files into EITHER of these two locations:

Option A: Root "data/" folder (Easiest to access):
-------------------------------------------------
digital-library/
└── data/
    ├── 8th/                <-- Drop your 8th Standard PDFs here
    ├── 9th/                <-- Drop your 9th Standard PDFs here
    ├── 10th/               <-- Drop your 10th Standard PDFs here
    ├── 11th-commerce/      <-- Drop your 11th Commerce PDFs here
    ├── 11th-science/       <-- Drop your 11th Science PDFs here
    ├── 12th-commerce/      <-- Drop your 12th Commerce PDFs here
    ├── 12th-science/       <-- Drop your 12th Science PDFs here
    └── novels/             <-- Drop your Novels PDFs here

Option B: Inside "src/data/" folder:
-------------------------------------------------
digital-library/
└── src/
    └── data/
        ├── 8th/            <-- Contains index.js + place 8th PDFs here
        ├── 9th/            <-- Contains index.js + place 9th PDFs here
        ├── 10th/           <-- Contains index.js + place 10th PDFs here
        ├── 11th-commerce/  <-- Contains index.js + place 11th Commerce PDFs here
        ├── 11th-science/   <-- Contains index.js + place 11th Science PDFs here
        ├── 12th-commerce/  <-- Contains index.js + place 12th Commerce PDFs here
        ├── 12th-science/   <-- Contains index.js + place 12th Science PDFs here
        └── novels/         <-- Contains index.js + place Novels PDFs here

================================================================================
HOW TO NAME YOUR PDFS:
================================================================================
1. You can name your PDF using the book's ID or Subject Name:
   Examples for 10th Standard:
   - 10th-maths1.pdf  (or Mathematics.pdf)
   - 10th-maths2.pdf  (or Geometry.pdf)
   - 10th-science1.pdf (or Science.pdf)

2. Or name it anything you like (e.g. MyBook.pdf) and update the `pdfFile`
   property in `src/data/<folder>/index.js`!

When a user clicks [ Download Book ], StudyShelf automatically finds your PDF
and triggers an instant direct download!
================================================================================
