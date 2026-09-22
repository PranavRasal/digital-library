import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Download, ArrowRight, FileText } from 'lucide-react';
import { BOOKS } from '../data/booksData';

export default function SearchModal({ isOpen, onClose, onSelectBook, onDownloadBook }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : BOOKS.filter(b => {
        const q = query.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q) ||
          b.classId.toLowerCase().includes(q) ||
          (b.author && b.author.toLowerCase().includes(q)) ||
          (b.board && b.board.toLowerCase().includes(q)) ||
          (b.description && b.description.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books by name, subject (e.g. Maths, Physics, Economics), or novels..."
            className="w-full text-base bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-1 px-2.5 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-slate-100">
          {query.trim() === '' ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700">Quick Search across StudyShelf</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Type subjects like <span className="font-semibold text-indigo-600">Mathematics</span>, <span className="font-semibold text-indigo-600">Accountancy</span>, <span className="font-semibold text-indigo-600">Physics</span>, or novels like <span className="font-semibold text-indigo-600">Alchemist</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {['10th Maths', '11th Commerce', '12th Science', 'Wings of Fire', 'Economics'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-3 py-1 rounded-full transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No books found for "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">
                Try searching for a subject like "Geometry", "Biology", "Bookkeeping", or standard "10th"
              </p>
            </div>
          ) : (
            <>
              <div className="pb-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Found {filtered.length} {filtered.length === 1 ? 'book' : 'books'}
              </div>
              {filtered.map((book) => (
                <div 
                  key={book.id} 
                  className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-xl transition group"
                >
                  <div 
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    onClick={() => {
                      onSelectBook(book);
                      onClose();
                    }}
                  >
                    <div className="w-11 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200 shadow-sm border border-slate-200">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {book.classId === 'novels' ? 'Novel' : book.classId.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-600 truncate">
                          {book.subject}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-indigo-600 mt-0.5">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-600 truncate flex items-center gap-1.5 mt-0.5">
                        <span>{book.board || book.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <FileText className="w-3 h-3 text-red-500" />
                          PDF ({book.fileSize})
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        onSelectBook(book);
                        onClose();
                      }}
                      className="text-xs font-medium text-slate-600 hover:text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50 transition flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDownloadBook(book)}
                      className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
