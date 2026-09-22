import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function serveDataPdfs() {
  return {
    name: 'serve-data-pdfs',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = decodeURIComponent(urlObj.pathname);

        // 1. Direct /data/... or /books/... file request
        if (pathname.startsWith('/data/') || pathname.startsWith('/books/')) {
          const subPath = pathname.replace(/^\/(data|books)\//, '');
          const searchDirs = [
            path.resolve(process.cwd(), 'data', subPath),
            path.resolve(process.cwd(), 'src', 'data', subPath),
            path.resolve(process.cwd(), 'public', 'data', subPath),
            path.resolve(process.cwd(), 'public', 'books', subPath)
          ];

          for (const filePath of searchDirs) {
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              if (ext === '.pdf') {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
              }
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
        }

        // 2. Smart Download API: /api/download?classId=10th&bookId=10th-maths1&title=Mathematics
        if (pathname === '/api/download') {
          const classId = urlObj.searchParams.get('classId') || '';
          const bookId = urlObj.searchParams.get('bookId') || '';
          const title = urlObj.searchParams.get('title') || '';
          const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');

          const candidateFolders = [
            path.resolve(process.cwd(), 'data', classId),
            path.resolve(process.cwd(), 'src', 'data', classId),
            path.resolve(process.cwd(), 'public', 'data', classId),
            path.resolve(process.cwd(), 'public', 'books', classId),
            path.resolve(process.cwd(), 'data'),
            path.resolve(process.cwd(), 'src', 'data'),
            path.resolve(process.cwd(), 'public', 'data')
          ];

          for (const folder of candidateFolders) {
            if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
              const files = fs.readdirSync(folder).filter(f => f.toLowerCase().endsWith('.pdf'));

              // Match by bookId first
              let matched = files.find(f => f.toLowerCase().startsWith(bookId.toLowerCase()));

              // Match by title
              if (!matched && cleanTitle) {
                matched = files.find(f => {
                  const cleanF = f.toLowerCase().replace(/[^a-z0-9]/g, '');
                  return cleanF.includes(cleanTitle) || cleanTitle.includes(cleanF.replace('pdf', ''));
                });
              }

              // Match by first word (e.g. "mathematics", "physics", "alchemist")
              if (!matched && title) {
                const firstWord = title.toLowerCase().split(' ')[0];
                if (firstWord.length > 3) {
                  matched = files.find(f => f.toLowerCase().includes(firstWord));
                }
              }

              if (matched) {
                const fullPath = path.join(folder, matched);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename="${matched}"`);
                fs.createReadStream(fullPath).pipe(res);
                return;
              }
            }
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ found: false, message: 'PDF not found on server' }));
          return;
        }

        next();
      });
    },

    // When running npm run build, copy any PDF files from data/ and src/data/ to dist/data/
    closeBundle() {
      const copyPdfs = (srcDir, targetDir) => {
        if (!fs.existsSync(srcDir)) return;
        const entries = fs.readdirSync(srcDir, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(srcDir, entry.name);
          const tgtPath = path.join(targetDir, entry.name);
          if (entry.isDirectory()) {
            fs.mkdirSync(tgtPath, { recursive: true });
            copyPdfs(srcPath, tgtPath);
          } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
            fs.mkdirSync(path.dirname(tgtPath), { recursive: true });
            fs.copyFileSync(srcPath, tgtPath);
          }
        }
      };

      copyPdfs(path.resolve(process.cwd(), 'data'), path.resolve(process.cwd(), 'dist', 'data'));
      copyPdfs(path.resolve(process.cwd(), 'src', 'data'), path.resolve(process.cwd(), 'dist', 'data'));
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveDataPdfs()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          pdf: ['jspdf', 'canvas-confetti']
        }
      }
    }
  }
});
