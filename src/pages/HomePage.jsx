import React from 'react';
import { 
  BookOpen, 
  Download, 
  ArrowRight, 
  GraduationCap, 
  TrendingUp, 
  Atom, 
  Briefcase, 
  FlaskConical, 
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import { CATEGORIES, BOOKS } from '../data/booksData';


export default function HomePage({ onSelectCategory, onOpenSearch, onSelectBook, onDownloadBook }) {
  const iconMap = {
    BookOpen,
    GraduationCap,
    TrendingUp,
    Atom,
    Briefcase,
    FlaskConical,
    Sparkles
  };

  const featuredBooks = BOOKS.slice(0, 4);

  return (
    <div className="space-y-12 pt-8 pb-16">
      
      {/* Categories Grid (Select Class Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Select Your Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Class & Stream Directory
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Choose your standard or stream to view all relevant textbooks and reading materials
            </p>
          </div>
          <div className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
            Also accessible anytime via the <span className="font-bold text-indigo-600">⋮ 3-dots menu</span> in header
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const isNovel = cat.id === 'novels';

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${
                  isNovel
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-200/80 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100'
                    : 'bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isNovel ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isNovel ? 'bg-amber-200/80 text-amber-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  <span>View All Books</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works / The Flow: Home -> 3 dots -> Select Class -> Select Book -> Download */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-900/50 px-3 py-1 rounded-full mb-3">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Simple Student Navigation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              How StudyShelf Works in 4 Quick Steps
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Designed to get you the textbook you need in less than 10 seconds without any login barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-black text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-base font-bold">Open Menu</h4>
              <p className="text-xs text-slate-300 mt-1">
                Click the <strong>⋮ 3-dots</strong> or select any class directly from the directory above.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-black text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-base font-bold">Select Class / Stream</h4>
              <p className="text-xs text-slate-300 mt-1">
                Choose 8th, 9th, 10th, or your FYJC/HSC stream (Commerce or Science).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-black text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-base font-bold">Browse & Preview</h4>
              <p className="text-xs text-slate-300 mt-1">
                Filter by subject (e.g. Accountancy, Physics) and preview key chapters.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h4 className="text-base font-bold">Instant Download</h4>
              <p className="text-xs text-slate-300 mt-1">
                Click <strong>[ Download Book ]</strong> to receive a clean, organized PDF on your device.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured / Popular Textbooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Frequently Downloaded Textbooks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Top SSC and HSC books accessed by community students this term
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('10th')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>See 10th Books</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredBooks.map((book) => (
            <div 
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-md transition group"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100 border border-slate-100 relative">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {book.classId.toUpperCase()}
                  </div>
                </div>
                <div className="text-xs font-semibold text-indigo-600 mb-1">{book.subject}</div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {book.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectBook(book)}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-600"
                >
                  Preview
                </button>
                <button
                  onClick={() => onDownloadBook(book)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
