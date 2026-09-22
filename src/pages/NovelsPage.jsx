import React, { useState, useMemo } from 'react';
import { Sparkles, ArrowLeft, Search, Filter, BookOpen, Compass } from 'lucide-react';
import NovelCard from '../components/NovelCard';
import { BOOKS } from '../data/booksData';

export default function NovelsPage({ onBackToHome, onSelectNovel, onDownloadNovel }) {
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [searchFilter, setSearchFilter] = useState('');

  const novels = useMemo(() => {
    return BOOKS.filter(book => book.classId === 'novels');
  }, []);

  const genres = [
    'All Genres',
    'Inspirational',
    'Classics',
    'Marathi Literature',
    'Mystery & Detective',
    'Autobiography'
  ];

  const displayedNovels = useMemo(() => {
    return novels.filter(novel => {
      const matchGenre = selectedGenre === 'All Genres'
        ? true
        : (novel.genre && novel.genre.toLowerCase().includes(selectedGenre.toLowerCase())) ||
          (novel.subject && novel.subject.toLowerCase().includes(selectedGenre.toLowerCase()));

      const matchSearch = searchFilter.trim() === ''
        ? true
        : (novel.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
           novel.author.toLowerCase().includes(searchFilter.toLowerCase()) ||
           novel.description.toLowerCase().includes(searchFilter.toLowerCase()));

      return matchGenre && matchSearch;
    });
  }, [novels, selectedGenre, searchFilter]);

  return (
    <div className="min-h-screen pb-16">
      
      {/* Novels Header Banner */}
      <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-slate-50 border-b border-amber-200/50 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-700 bg-white hover:bg-amber-50 px-3 py-1.5 rounded-lg border border-slate-200 transition shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
              Novels & Literature
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Classic Literature & Novels
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Novels & Reading Resources
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Expand your knowledge and imagination with curated world classics, renowned Indian autobiographies, and inspiring regional masterpieces.
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-amber-200/70 shadow-xs flex items-center gap-4 flex-shrink-0">
              <div>
                <div className="text-xl font-extrabold text-amber-600">
                  {novels.length}
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Curated Novels</div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="text-xl font-extrabold text-indigo-600">Full</div>
                <div className="text-[11px] text-slate-600 font-medium">PDF Editions</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Genre Filter & Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Explore Genres
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search novel by title or author..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {genres.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all duration-150 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Novels Grid (Matching the 3-column / responsive grid wireframe) */}
        {displayedNovels.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No novels match your query</h3>
            <p className="text-xs text-slate-600 mt-1">
              Try choosing another genre or resetting your search.
            </p>
            <button
              onClick={() => {
                setSelectedGenre('All Genres');
                setSearchFilter('');
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedNovels.map((novel) => (
              <NovelCard
                key={novel.id}
                novel={novel}
                onDownload={onDownloadNovel}
                onPreview={onSelectNovel}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
