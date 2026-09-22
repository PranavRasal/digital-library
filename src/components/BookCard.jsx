import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, Eye, BookOpen, Layers } from 'lucide-react';

export default function BookCard({ book, onDownload, onPreview }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownload(book);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 group">
      {/* Book Image */}
      <div className="w-full md:w-44 h-52 sm:h-56 md:h-auto flex-shrink-0 relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-xs flex items-center justify-center group-hover:shadow transition-shadow">
        <img
          src={book.coverImage}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback nicely if offline image fails
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Offline / Placeholder Cover */}
        <div 
          style={{ display: 'none' }}
          className={`w-full h-full bg-gradient-to-br ${book.coverColor || 'from-indigo-600 to-indigo-900'} p-4 flex flex-col justify-between text-white`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
            {book.board || 'Textbook'}
          </div>
          <div>
            <div className="text-base font-bold leading-tight">{book.title}</div>
            <div className="text-xs opacity-90 mt-1">{book.subject}</div>
          </div>
          <div className="text-[10px] opacity-75">eBalbharati Series</div>
        </div>

        {/* Format Badge Overlay */}
        <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <FileText className="w-3 h-3 text-red-400" />
          <span>PDF</span>
        </div>
      </div>

      {/* Book Information */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Stream / Subject Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              <Layers className="w-3 h-3" />
              {book.subject}
            </span>
            {book.stream && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {book.stream} Stream
              </span>
            )}
            <span className="text-xs text-slate-600">
              • {book.pages} Pages
            </span>
          </div>

          {/* Book Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
            {book.title}
          </h3>

          {/* Board / Publisher */}
          <p className="text-sm font-medium text-slate-600 mt-1 flex items-center gap-1.5">
            <span>{book.board || 'Maharashtra State Board'}</span>
          </p>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Quick Syllabus Preview Snippet */}
          {book.chapters && book.chapters.length > 0 && (
            <div className="mt-3 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
              <span className="font-semibold text-slate-700">Key Units: </span>
              {book.chapters.slice(0, 3).map(ch => ch.split(':')[0]).join(', ')}
              {book.chapters.length > 3 && ` +${book.chapters.length - 3} more`}
            </div>
          )}
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              Standard PDF
            </span>
            <span>•</span>
            <span>{book.fileSize}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Preview Button */}
            <button
              onClick={() => onPreview(book)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition focus:outline-none"
              title="Preview Chapters"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            {/* Download Book Button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all duration-200 focus:outline-none ${
                downloaded
                  ? 'bg-emerald-600 text-white'
                  : downloading
                  ? 'bg-indigo-400 text-white cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200'
              }`}
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Downloaded!</span>
                </>
              ) : downloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Book</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
