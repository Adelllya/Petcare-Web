const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4200;
const DIST = path.join(__dirname, 'dist', 'petcare-frontend', 'browser');

// Cache static assets for 1 year
app.use(express.static(DIST, {
  maxAge: '1y',
  etag: true,
  setHeaders: (res, filePath) => {
    // Don't cache index.html (ensure fresh deploys load)
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// SPA fallback — all routes go to index.html
app.get('{*path}', (req, res) => {
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PetCare running on port ${PORT}`);
});
