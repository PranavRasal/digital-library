import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  Download, 
  Filter, 
  Search, 
  GraduationCap, 
  Layers,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import BookCard from '../components/BookCard';
import { CATEGORIES, BOOKS, SUBJECT_MAP } from '../data/booksData';

export default function ClassBooksPage({ 
  categoryId, 
  onBackToHome, 
  onSelectBook, 
  onDownloadBook 
}) {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchFilter, setSearchFilter] = useState('');

  const category = CATEGORIES.find(c => c.id === categoryId) || {
    id: categoryId,
    name: `${categoryId.toUpperCase()} Books`,
    badge: 'Education',
    description: 'Maharashtra Board Textbooks'
  };

  const availableSubjects = SUBJECT_MAP[categoryId] || ['All Subjects'];

  // Filter books by classId, subject, and local search
  const classBooks = useMemo(() => {
    return BOOKS.filter(book => book.classId === categoryId);
  }, [categoryId]);

  const displayedBooks = useMemo(() => {
    return classBooks.filter(book => {
      const matchSubject = selectedSubject === 'All Subjects' 
        ? true 
        : (book.subject.toLowerCase() === selectedSubject.toLowerCase() || 
           book.subject.toLowerCase().includes(selectedSubject.toLowerCase()));

      const matchSearch = searchFilter.trim() === '' 
        ? true 
        : (book.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
           book.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
           book.description.toLowerCase().includes(searchFilter.toLowerCase()));

      return matchSubject && matchSearch;
    });
  }, [classBooks, selectedSubject, searchFilter]);

  return (
    <div className="min-h-screen pb-16">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-indigo-50/70 to-slate-50 border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back button */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500">Classes</span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {category.shortName || category.name}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                  {category.badge}
                </span>
                {category.stream && (
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                    {category.stream} Stream
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {category.name} Books
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Official Maharashtra State Board (eBalbharati) curriculum textbooks, complete subject study guides, and instant PDF downloads.
              </p>
            </div>

            {/* Quick stats badge */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4 flex-shrink-0">
              <div>
                <div className="text-xl font-extrabold text-indigo-600">
                  {classBooks.length}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Textbooks</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-xl font-extrabold text-emerald-600">Free</div>
                <div className="text-[11px] text-slate-600 font-medium">PDF Access</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Stream / Subject Filter Bar & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Filter by Subject
              </span>
            </div>

            {/* In-page live search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search within this class..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Subject Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {availableSubjects.map((sub) => {
              const isSelected = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

        </div>

        {/* Book Cards Grid / List (Matching wireframe) */}
        {displayedBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No books found</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              No textbooks match your current filter "{selectedSubject}" {searchFilter && `or search term "${searchFilter}"`}.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('All Subjects');
                setSearchFilter('');
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDownload={onDownloadBook}
                onPreview={onSelectBook}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
