import React from 'react';
import { BookOpen, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../data/booksData';

export default function Footer({ onSelectCategory, setCurrentView }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">StudyShelf</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A student-friendly digital library platform providing easy, open access to educational books, study materials, and classic literature for Maharashtra Board students and community readers.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>100% Free & Open Access</span>
            </div>
          </div>

          {/* Col 2: School Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Secondary Education
            </h4>
            <ul className="space-y-2 text-xs">
              {['8th', '9th', '10th'].map(id => {
                const cat = CATEGORIES.find(c => c.id === id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => onSelectCategory(id)}
                      className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
                    >
                      <span>{cat?.name} (Maharashtra Board)</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => onSelectCategory('10th')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
                >
                  SSC Board Question Bank & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Higher Secondary / Streams */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Junior College (HSC Streams)
            </h4>
            <ul className="space-y-2 text-xs">
              {['11th-commerce', '11th-science', '12th-commerce', '12th-science'].map(id => {
                const cat = CATEGORIES.find(c => c.id === id);
                return (
                  <li key={id}>
                    <button
                      onClick={() => onSelectCategory(id)}
                      className="text-slate-400 hover:text-white transition"
                    >
                      {cat?.name} Textbooks
                    </button>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => onSelectCategory('novels')}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition"
                >
                  Novels & Literary Classics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Info & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              About The Project
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed as an accessible college community initiative to bridge the digital divide in educational resources.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('about')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Read our Project Mission & Features →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} StudyShelf Digital Library. All educational content curated for academic learning.</p>
          <p className="flex items-center gap-1">
            <span>Built with React for students & local communities</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
