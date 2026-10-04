# StudyShelf - Online Digital Library Platform

StudyShelf is a modern, student-friendly digital library platform developed with **React** and **Tailwind CSS**. It provides students, educators, and community members with instant, open access to educational textbooks, study materials, and reading resources.

---

## 🌟 Key Features

- **Intuitive Header & Navigation**:
  - Clean brand identity: **StudyShelf** with custom logo & icon.
  - Quick navigation: **Home**, **About**, and **Search**.
  - **3-Dot Menu (`⋮`)**: Instant class and stream dropdown selector:
    - 8th Standard
    - 9th Standard
    - 10th Standard
    - 11th Commerce
    - 11th Science
    - 12th Commerce
    - 12th Science
    - Novels & Literature(marathi , hindi , english)

- **Stream Segregation for 11th & 12th**:
  - **11th & 12th Commerce**: Dedicated subject tabs for *Bookkeeping & Accountancy*, *Economics*, *Organisation of Commerce & Management (OCM)*, *Secretarial Practice (SP)*, and *Mathematics & Statistics*.
  - **11th & 12th Science**: Dedicated subject tabs for *Physics*, *Chemistry*, *Mathematics*, *Biology*, and *Information Technology (IT)*.

- **Maharashtra State Board Alignment**:
  - Official curriculum textbooks (eBalbharati syllabus).
  - Clean textbook cards displaying cover image, subject badge, board title, standard PDF tag, and chapter previews.

- **Novels & Literature Section**:
  - Vertical, aesthetic book-cover cards.
  - Curated classics (*The Alchemist*, *Wings of Fire*, *Shyamchi Aai*, *Mrutyunjay*, *Sherlock Holmes*, *1984*, *The Great Gatsby*, etc.).
  - Novel title, author, genre, and instant **Download** button.

- **Instant PDF Downloads & Previews**:
  - Built-in client-side PDF generation powered by `jsPDF`.
  - Downloads clean, verified PDF study guides with unit breakdowns and tips.
  - In-app preview modal to view chapters and table of contents before downloading.

- **Quick Real-Time Search**:
  - Search across all books, subjects, authors, and classes (`Ctrl + K` or `/`).

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/` (or the port indicated in terminal).

### 3. Build for Production
```bash
npm run build
```

## ☁️ Deploy to Vercel

This repository is configured for Vercel as a static Vite application:

1. Push the repository to GitHub.
2. In Vercel, select **Add New Project** and import the repository.
3. Keep the detected framework as **Vite**, then click **Deploy**.

The included `vercel.json` builds the app with `npm run build`, serves the generated `dist/` directory, and routes client-side URLs back to `index.html`. PDF files in `data/` are copied into the production output automatically.

For a CLI deployment, install the Vercel CLI and run:

```bash
npm install --global vercel
vercel
```

---

## 📁 Project Architecture

```
digital-library/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── main.jsx                   # Entry point
│   ├── App.jsx                    # Core application router & state
│   ├── index.css                  # Tailwind styles & custom scrollbars
│   ├── data/
│   │   └── booksData.js           # Curated book catalog & subjects
│   ├── components/
│   │   ├── Header.jsx             # Top bar with 3-dot class menu & search
│   │   ├── ClassDropdownMenu.jsx  # 3-dot dropdown for classes & streams
│   │   ├── BookCard.jsx           # Horizontal textbook card (User wireframe)
│   │   ├── NovelCard.jsx          # Vertical novel card with book cover
│   │   ├── BookReaderModal.jsx    # Table of contents preview modal
│   │   ├── SearchModal.jsx        # Instant live search across catalog
│   │   └── Footer.jsx             # Clean responsive footer
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with category directory
│   │   ├── ClassBooksPage.jsx     # Class & stream textbook list
│   │   ├── NovelsPage.jsx         # Novels & literature catalog
│   │   └── AboutPage.jsx          # Project background & college mission
│   └── utils/
│       └── pdfGenerator.js        # PDF generation utility using jsPDF
```

---

## 📖 Navigation Flow

$$\text{Home} \longrightarrow \text{3 Dots Menu / Directory} \longrightarrow \text{Select Class/Stream} \longrightarrow \text{Select Book} \longrightarrow \text{View Info/Preview} \longrightarrow \text{Download PDF}$$
