import { books8th } from './8th/index.js';
import { books9th } from './9th/index.js';
import { books10th } from './10th/index.js';
import { books11thCommerce } from './11th-commerce/index.js';
import { books11thScience } from './11th-science/index.js';
import { books12thCommerce } from './12th-commerce/index.js';
import { books12thScience } from './12th-science/index.js';
import { booksNovels } from './novels/index.js';

export const CATEGORIES = [
  { id: '8th', name: '8th Standard', shortName: '8th', icon: 'BookOpen', badge: 'Middle School', description: 'Maharashtra State Board textbooks for Class 8 students' },
  { id: '9th', name: '9th Standard', shortName: '9th', icon: 'BookOpen', badge: 'Secondary', description: 'Maharashtra State Board textbooks for Class 9 students' },
  { id: '10th', name: '10th Standard', shortName: '10th', icon: 'GraduationCap', badge: 'SSC Board', description: 'Complete SSC Maharashtra Board textbooks and reference guides' },
  { id: '11th-commerce', name: '11th Commerce', shortName: '11th Commerce', icon: 'TrendingUp', badge: 'Junior College (FYJC)', stream: 'Commerce', description: 'Accountancy, Economics, OCM, SP & Maths for 11th Commerce' },
  { id: '11th-science', name: '11th Science', shortName: '11th Science', icon: 'Atom', badge: 'Junior College (FYJC)', stream: 'Science', description: 'Physics, Chemistry, Biology & Mathematics for 11th Science' },
  { id: '12th-commerce', name: '12th Commerce', shortName: '12th Commerce', icon: 'Briefcase', badge: 'HSC Board (SYJC)', stream: 'Commerce', description: 'HSC Board syllabus books for 12th Commerce students' },
  { id: '12th-science', name: '12th Science', shortName: '12th Science', icon: 'FlaskConical', badge: 'HSC Board (SYJC)', stream: 'Science', description: 'HSC Board syllabus books for 12th Science & CET/JEE prep' },
  { id: 'novels', name: 'Novels & Literature', shortName: 'Novels', icon: 'Sparkles', badge: 'General Reading', description: 'Timeless fiction, inspiring biographies, and literary classics' }
];

export const BOOKS = [
  ...books8th,
  ...books9th,
  ...books10th,
  ...books11thCommerce,
  ...books11thScience,
  ...books12thCommerce,
  ...books12thScience,
  ...booksNovels
];

export const SUBJECT_MAP = {
  '11th-commerce': [
    'All Subjects',
    'Bookkeeping & Accountancy',
    'Economics',
    'Organisation of Commerce',
    'Secretarial Practice',
    'Mathematics / Statistics'
  ],
  '11th-science': [
    'All Subjects',
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Information Technology'
  ],
  '12th-commerce': [
    'All Subjects',
    'Bookkeeping & Accountancy',
    'Economics',
    'Organisation of Commerce',
    'Secretarial Practice',
    'Mathematics / Statistics'
  ],
  '12th-science': [
    'All Subjects',
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Information Technology'
  ],
  '8th': [
    'All Subjects',
    'Mathematics',
    'General Science',
    'English',
    'Social Sciences',
    'Geography'
  ],
  '9th': [
    'All Subjects',
    'Mathematics',
    'Science & Technology',
    'English',
    'Social Sciences'
  ],
  '10th': [
    'All Subjects',
    'Mathematics',
    'Science & Technology',
    'English',
    'Social Sciences',
    'Geography'
  ],
  'novels': [
    'All Genres',
    'Inspirational / Adventure',
    'Autobiography / Science & Nation Building',
    'Motherhood / Family / Moral Values',
    'Mythology / Tragedy / Heroism',
    'Mystery / Detective / Thriller',
    'Dystopia / Political Satire',
    'Regency Romance / Social Satire',
    'Slice of Life / Humor / Fiction'
  ]
};
