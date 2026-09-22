import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClassBooksPage from './pages/ClassBooksPage';
import NovelsPage from './pages/NovelsPage';
import AboutPage from './pages/AboutPage';
import SearchModal from './components/SearchModal';
import BookReaderModal from './components/BookReaderModal';
import { downloadBook } from './utils/pdfGenerator';
import { CheckCircle2, DownloadCloud } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // State: 'home', 'class', 'novels', 'about'
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('10th');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedBookForPreview, setSelectedBookForPreview] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [downloadCount, setDownloadCount] = useState(0);

  // Sync scroll on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedCategory]);

  // Keyboard shortcut Ctrl+K or '/' for search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName))) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCategory = (catId) => {
    if (catId === 'novels') {
      setSelectedCategory('novels');
      setCurrentView('novels');
    } else {
      setSelectedCategory(catId);
      setCurrentView('class');
    }
  };

  const handleDownload = async (book) => {
    // Show toast notification
    setToastMessage({
      title: 'Downloading PDF Book...',
      subtitle: `${book.title} (${book.fileSize || 'PDF'})`
    });

    try {
      // Download real PDF if present in public/books, else generate PDF
      await downloadBook(book);
      setDownloadCount(prev => prev + 1);

      // Light confetti celebration
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.85 }
        });
      } catch (err) {
        // ignore confetti errors if unsupported
      }

      setToastMessage({
        title: 'Download Complete!',
        subtitle: `${book.title} is now saved to your downloads folder.`,
        success: true
      });
    } catch (error) {
      console.error('Download error:', error);
      setToastMessage({
        title: 'Download Failed',
        subtitle: 'Please try again or preview online.',
        error: true
      });
    } finally {
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* Header with StudyShelf logo, Home, About, Search, and 3-dots Class Menu */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onOpenSearch={() => setIsSearchOpen(true)}
        downloadCount={downloadCount}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onSelectCategory={handleSelectCategory}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSelectBook={(book) => setSelectedBookForPreview(book)}
            onDownloadBook={handleDownload}
          />
        )}

        {currentView === 'class' && (
          <ClassBooksPage
            categoryId={selectedCategory}
            onBackToHome={() => setCurrentView('home')}
            onSelectBook={(book) => setSelectedBookForPreview(book)}
            onDownloadBook={handleDownload}
          />
        )}

        {currentView === 'novels' && (
          <NovelsPage
            onBackToHome={() => setCurrentView('home')}
            onSelectNovel={(novel) => setSelectedBookForPreview(novel)}
            onDownloadNovel={handleDownload}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onBackToHome={() => setCurrentView('home')}
            onBrowseClasses={() => handleSelectCategory('10th')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        setCurrentView={setCurrentView}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBook={(book) => {
          if (book.classId === 'novels') {
            setSelectedCategory('novels');
            setCurrentView('novels');
          } else {
            setSelectedCategory(book.classId);
            setCurrentView('class');
          }
          setSelectedBookForPreview(book);
        }}
        onDownloadBook={handleDownload}
      />

      {/* Book Reader / Chapter Preview Modal */}
      <BookReaderModal
        book={selectedBookForPreview}
        isOpen={!!selectedBookForPreview}
        onClose={() => setSelectedBookForPreview(null)}
        onDownload={handleDownload}
      />

      {/* Floating Download Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-2xl shadow-xl border flex items-center gap-3.5 max-w-sm ${
            toastMessage.success
              ? 'bg-emerald-900 text-white border-emerald-700'
              : toastMessage.error
              ? 'bg-red-900 text-white border-red-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              toastMessage.success ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
            }`}>
              {toastMessage.success ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <DownloadCloud className="w-5 h-5 animate-bounce" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold leading-tight">{toastMessage.title}</div>
              <div className="text-[11px] opacity-85 truncate mt-0.5">{toastMessage.subtitle}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
