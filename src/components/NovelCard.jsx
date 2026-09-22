import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, User, Eye, Sparkles } from 'lucide-react';

export default function NovelCard({ novel, onDownload, onPreview }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownload(novel);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Book Cover Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={novel.coverImage}
          alt={novel.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />

        {/* Fallback stylized book cover */}
        <div 
          style={{ display: 'none' }}
          className={`w-full h-full bg-gradient-to-br ${novel.coverColor || 'from-amber-700 to-stone-900'} p-5 flex flex-col justify-between text-white`}
        >
          <div className="flex items-center justify-between">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80">Classic</span>
          </div>
          <div>
            <h4 className="text-lg font-bold font-serif leading-tight">{novel.title}</h4>
            <p className="text-xs opacity-80 mt-1">by {novel.author}</p>
          </div>
          <div className="text-[10px] opacity-75">{novel.pages} pages • PDF Edition</div>
        </div>

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <FileText className="w-3 h-3 text-amber-400" />
            PDF
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-amber-500/90 text-slate-900 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
            {novel.genre ? novel.genre.split('/')[0].trim() : 'Literature'}
          </span>
        </div>

        {/* Subtle quick preview overlay icon on hover */}
        <button
          onClick={() => onPreview(novel)}
          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
          title="Click to view synopsis"
        >
          <span className="bg-white/90 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Read Synopsis
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Author Name */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span className="truncate font-medium">{novel.author}</span>
          </div>

          {/* Novel Name */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
            {novel.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {novel.description}
          </p>
        </div>

        {/* Download Button Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-slate-600">
            {novel.fileSize}
          </span>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`w-full max-w-[140px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl shadow-xs transition-all duration-200 focus:outline-none ${
              downloaded
                ? 'bg-emerald-600 text-white'
                : downloading
                ? 'bg-amber-500 text-white cursor-wait'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold hover:shadow-md'
            }`}
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Downloaded!</span>
              </>
            ) : downloading ? (
              <>
                <div className="w-3 h-3 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
