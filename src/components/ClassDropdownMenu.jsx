import React, { useEffect, useRef } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Atom, 
  Briefcase, 
  FlaskConical, 
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react';

export default function ClassDropdownMenu({ isOpen, onClose, onSelectCategory, activeCategory }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = [
    { id: '8th', label: '8th Standard', icon: BookOpen, badge: 'School', color: 'text-blue-600 bg-blue-50' },
    { id: '9th', label: '9th Standard', icon: BookOpen, badge: 'School', color: 'text-blue-600 bg-blue-50' },
    { id: '10th', label: '10th Standard', icon: GraduationCap, badge: 'SSC Board', color: 'text-indigo-600 bg-indigo-50' },
    { id: '11th-commerce', label: '11th Commerce', icon: TrendingUp, badge: 'FYJC Stream', color: 'text-emerald-600 bg-emerald-50' },
    { id: '11th-science', label: '11th Science', icon: Atom, badge: 'FYJC Stream', color: 'text-cyan-600 bg-cyan-50' },
    { id: '12th-commerce', label: '12th Commerce', icon: Briefcase, badge: 'HSC Board', color: 'text-emerald-700 bg-emerald-50' },
    { id: '12th-science', label: '12th Science', icon: FlaskConical, badge: 'HSC Board', color: 'text-purple-600 bg-purple-50' },
    { id: 'novels', label: 'Novels', icon: Sparkles, badge: 'Reading', color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right overflow-hidden"
    >
      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">📚</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Browse Classes & Categories
          </span>
        </div>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          8 sections
        </span>
      </div>

      <div className="py-1 max-h-[75vh] overflow-y-auto">
        <div className="px-3 py-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-600" />
          <span>Classes & Streams</span>
        </div>

        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onClose();
              }}
              className={`w-full text-left px-3 py-2.5 mx-1 my-0.5 rounded-xl flex items-center justify-between transition-all duration-150 group ${
                isSelected
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
              }`}
              style={{ width: 'calc(100% - 8px)' }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm leading-snug">{cat.label}</div>
                  <div className="text-[11px] text-slate-600 font-normal">{cat.badge}</div>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all ${
                isSelected ? 'text-indigo-600' : ''
              }`} />
            </button>
          );
        })}
      </div>

      <div className="mt-1 pt-2 border-t border-slate-100 px-4 pb-1 text-center bg-slate-50/70">
        <p className="text-[11px] text-slate-600">
          Maharashtra Board Textbooks & Curated Novels
        </p>
      </div>
    </div>
  );
}
