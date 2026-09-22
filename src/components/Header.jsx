import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  MoreVertical, 
  Home, 
  Info, 
  Download,
  Menu,
  X
} from 'lucide-react';
import ClassDropdownMenu from './ClassDropdownMenu';

export default function Header({ 
  currentView, 
  setCurrentView, 
  activeCategory, 
  onSelectCategory,
  onOpenSearch,
  downloadCount = 0
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo / Project Name: StudyShelf */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentView('home');
                setIsMobileNavOpen(false);
              }}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  StudyShelf
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-indigo-600 -mt-1">
                  Digital Library
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setCurrentView('about')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                currentView === 'about'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </nav>

          {/* Right Action Icons: Search + 3 Dots Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 text-sm text-slate-500 hover:text-slate-800 bg-slate-100/90 hover:bg-slate-200/80 rounded-xl transition border border-transparent hover:border-slate-300/60 focus:outline-none"
              title="Search books (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline font-medium text-xs text-slate-600">
                Search books...
              </span>
              <kbd className="hidden lg:inline-block text-[10px] bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                /
              </kbd>
            </button>

            {/* 3 Dots Menu (Class & Category Selection) */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  isMenuOpen
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                aria-label="Class and category menu"
                title="Browse Classes (3 dots)"
              >
                <MoreVertical className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-bold">
                  Classes
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>

              {/* Dropdown Menu */}
              <ClassDropdownMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelectCategory={(catId) => {
                  onSelectCategory(catId);
                  setIsMenuOpen(false);
                }}
                activeCategory={activeCategory}
              />
            </div>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Subnav Drawer */}
        {isMobileNavOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => {
                setCurrentView('home');
                setIsMobileNavOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-left ${
                currentView === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                setIsMobileNavOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-left ${
                currentView === 'about' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About StudyShelf</span>
            </button>
            <button
              onClick={() => {
                setIsMobileNavOpen(false);
                setIsMenuOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-left text-indigo-600 bg-indigo-50/50"
            >
              <MoreVertical className="w-4 h-4" />
              <span>Browse All Classes (3 Dots Menu)</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
