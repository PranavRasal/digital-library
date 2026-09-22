import { jsPDF } from 'jspdf';

/**
 * Downloads a book PDF.
 * First checks if the real static PDF file exists in the public/ folder.
 * If found, directly downloads your real PDF file.
 * If not found, generates a clean syllabus PDF guide using jsPDF as fallback.
 */
export async function downloadBook(book) {
  const safeTitle = (book.title || 'Book').replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeTitle}.pdf`;

  // 1. Try server smart download API (looks in data/<classId>/ and src/data/<classId>/)
  try {
    const apiUrl = `/api/download?classId=${encodeURIComponent(book.classId)}&bookId=${encodeURIComponent(book.id)}&title=${encodeURIComponent(book.title)}`;
    const apiRes = await fetch(apiUrl);
    if (apiRes.ok && apiRes.headers.get('content-type')?.includes('pdf')) {
      const blob = await apiRes.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      return { source: 'api', url: apiUrl };
    }
  } catch (err) {
    // continue
  }

  // 2. Candidate direct paths in data/ or public/
  const candidateUrls = [
    book.pdfFile,
    `/data/${book.classId}/${book.id}.pdf`,
    `/data/${book.classId}/${safeTitle}.pdf`,
    `/data/${book.id}.pdf`,
    `/books/${book.classId}/${book.id}.pdf`,
    `/books/${book.classId}/${safeTitle}.pdf`
  ].filter(Boolean);

  for (const url of candidateUrls) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok && response.status === 200) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { source: 'static', url };
      }
    } catch (err) {
      // Continue
    }
  }

  // 3. Fallback: Generate clean student study guide PDF
  downloadBookPDF(book);
  return { source: 'generated' };
}


export function downloadBookPDF(book) {

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header Banner
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('StudyShelf Digital Library', 15, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Free Educational Resources & Study Materials Platform', 15, 26);
  doc.text(`Official Resource Reference | Class: ${book.className || book.classId.toUpperCase()}`, 15, 33);

  // Decorative Accent bar
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 42, pageWidth, 3, 'F');

  // Book Information Card
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(15, 52, pageWidth - 30, 44, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(15, 52, pageWidth - 30, 44, 3, 3, 'S');

  // Book Details inside card
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(book.title, 20, 63);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105); // slate-600

  const subjectLabel = book.subject ? `Subject: ${book.subject}` : `Genre: ${book.genre || 'Literature'}`;
  const boardLabel = book.board ? `Board/Publication: ${book.board}` : `Author: ${book.author}`;
  const streamLabel = book.stream ? ` | Stream: ${book.stream}` : '';

  doc.text(`${subjectLabel}${streamLabel}`, 20, 72);
  doc.text(`${boardLabel} • Format: PDF • Pages: ${book.pages} • Size: ${book.fileSize}`, 20, 80);
  doc.text(`Digital Verification Code: SS-${book.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`, 20, 88);

  // Overview / Synopsis
  let currentY = 106;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('Course Syllabus & Content Overview', 15, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const splitDescription = doc.splitTextToSize(book.description || 'Curated educational material for students.', pageWidth - 30);
  doc.text(splitDescription, 15, currentY);

  currentY += (splitDescription.length * 5) + 8;

  // Chapters / Table of Contents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('Table of Contents / Prescribed Curriculum', 15, currentY);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);

  if (book.chapters && book.chapters.length > 0) {
    book.chapters.forEach((chapter, index) => {
      if (currentY > pageHeight - 35) {
        doc.addPage();
        currentY = 25;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 41, 59);
        doc.text(`Table of Contents (continued) - ${book.title}`, 15, currentY);
        currentY += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(71, 85, 105);
      }

      // Alternate row shading
      if (index % 2 === 0) {
        doc.setFillColor(241, 245, 249);
        doc.rect(15, currentY - 4, pageWidth - 30, 6.5, 'F');
      }

      doc.text(chapter, 18, currentY);
      doc.text(`Pg. ${10 + (index * 18)}`, pageWidth - 35, currentY);
      currentY += 7;
    });
  } else {
    doc.text('1. Introduction and Primary Concepts', 18, currentY);
    currentY += 6;
    doc.text('2. Core Analysis and In-depth Explanations', 18, currentY);
    currentY += 6;
    doc.text('3. Key Questions, Problem Sets & Solutions', 18, currentY);
    currentY += 6;
    doc.text('4. Glossary, Terminology & References', 18, currentY);
    currentY += 7;
  }

  currentY += 10;
  if (currentY > pageHeight - 45) {
    doc.addPage();
    currentY = 25;
  }

  // Student Study Notes Box
  doc.setFillColor(238, 242, 255); // brand-50
  doc.roundedRect(15, currentY, pageWidth - 30, 32, 2, 2, 'F');
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(15, currentY, pageWidth - 30, 32, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(67, 56, 202); // indigo-700
  doc.text('Important Student Guidelines & Exam Tips', 20, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text('• Read every chapter thoroughly and make concise conceptual revision notes.', 20, currentY + 15);
  doc.text('• Solve all textbook numericals, questions, and exercise activities for best exam performance.', 20, currentY + 21);
  doc.text('• For the complete physical textbook or e-Balbharati editions, visit your local library or ebalbharati.in.', 20, currentY + 27);

  // Footer on all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(15, pageHeight - 16, pageWidth - 15, pageHeight - 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('StudyShelf Digital Library • Making Education Accessible to All', 15, pageHeight - 10);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 32, pageHeight - 10);
  }

  // Save PDF file with clean file name
  const safeTitle = book.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeTitle}_StudyShelf.pdf`;
  doc.save(filename);
}
