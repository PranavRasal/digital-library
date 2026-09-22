import React from 'react';
import { 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Layers, 
  Download, 
  Search, 
  Sparkles, 
  Heart, 
  GraduationCap, 
  ArrowLeft 
} from 'lucide-react';

export default function AboutPage({ onBackToHome, onBrowseClasses }) {
  const highlights = [
    {
      title: 'Easy Book Browsing & Categorization',
      description: 'Structured separation by classes (8th, 9th, 10th) and Junior College streams (11th & 12th Commerce & Science) + Literature Novels.',
      icon: Layers
    },
    {
      title: 'Instant Search & Stream Filters',
      description: 'Find books in milliseconds by subject, title, author or standard with dedicated stream subject filters for Commerce & Science.',
      icon: Search
    },
    {
      title: 'Direct PDF Downloads & Syllabus Previews',
      description: 'Download standard PDF copies directly onto desktop or mobile devices with chapter syllabus outlines and examination tips.',
      icon: Download
    },
    {
      title: 'Student-Centered, Accessible UI/UX',
      description: 'Built with clean typography, responsive layout, intuitive 3-dot class switcher, and zero paywalls or registration barriers.',
      icon: GraduationCap
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Intro */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>About StudyShelf Project</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Digital Library Platform for Students & Local Communities
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          StudyShelf is developed to address educational resource disparities by providing students, educators, and community members with free, unified access to Maharashtra State Board educational books, stream-specific study materials, and enriching literature novels online.
        </p>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="text-2xl font-black text-indigo-600">8+</div>
            <div className="text-xs text-slate-600 mt-0.5 font-medium">Standards & Streams</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="text-2xl font-black text-emerald-600">100%</div>
            <div className="text-xs text-slate-600 mt-0.5 font-medium">Free & Accessible</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="text-2xl font-black text-purple-600">PDF</div>
            <div className="text-xs text-slate-600 mt-0.5 font-medium">Standard E-Book Formats</div>
          </div>
        </div>
      </div>

      {/* Key Implemented Features */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900">Project Highlights & Architecture</h2>
          <p className="text-sm text-slate-600 mt-1">
            Carefully engineered for maximum usability and real-world student utility.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stream Organization Details */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          <span>Curriculum Coverage & Subject Streams</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-3">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Commerce Stream (11th & 12th)
            </h4>
            <p>
              Complete coverage of specialized business subjects including Bookkeeping & Accountancy, Economics, Organisation of Commerce & Management (OCM), Secretarial Practice (SP), and Commercial Mathematics.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-3">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Science Stream (11th & 12th)
            </h4>
            <p>
              Comprehensive syllabus coverage for Physics, Chemistry, Mathematics & Statistics, Biology, and Information Technology preparing students for HSC board exams as well as entrance tests.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={onBrowseClasses}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md transition"
          >
            <span>Start Browsing Classes Now</span>
            <BookOpen className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
