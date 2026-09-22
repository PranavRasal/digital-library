import React from 'react';
import { X, Download, BookOpen, Layers, CheckCircle2, FileText, User } from 'lucide-react';

export default function BookReaderModal({ book, isOpen, onClose, onDownload }) {
  if (!isOpen || !book) return null;

  const isNovel = book.classId === 'novels';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              {isNovel ? 'Novel Preview' : `${book.classId.toUpperCase()} Syllabus & Preview`}
            </span>
            <span className="text-xs text-slate-600">
              • {book.fileSize}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Cover Image */}
            <div className={`w-36 sm:w-44 flex-shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-slate-200 ${
              isNovel ? 'ring-2 ring-amber-400/50' : 'ring-2 ring-indigo-500/20'
            }`}>
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Meta Details */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {book.title}
              </h2>

              <div className="mt-2 space-y-1 text-sm text-slate-600">
                {book.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-600" />
                    <span>Author / Publication: <strong>{book.author}</strong></span>
                  </div>
                )}
                {book.board && (
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-600" />
                    <span>Board: <strong>{book.board}</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-600" />
                  <span>Subject / Category: <strong>{book.subject}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <span>Format: <strong>PDF (Digital E-Book)</strong> • {book.pages} Pages</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Book Synopsis / Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
          </div>

          {/* Chapters / Syllabus Section */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>
                {isNovel ? 'Key Chapters & Highlights' : 'Prescribed Table of Contents / Units'}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {book.chapters && book.chapters.map((chapter, idx) => (
                <div 
                  key={idx} 
                  className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 flex items-start gap-2 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{chapter}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition"
          >
            Close
          </button>

          <button
            onClick={() => {
              onDownload(book);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg transition focus:outline-none"
          >
            <Download className="w-4 h-4" />
            <span>Download Full PDF Book</span>
          </button>
        </div>
      </div>
    </div>
  );
}
