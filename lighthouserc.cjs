/** @type {import('@lhci/cli/src/types').LHCIConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start -- -p 3000',
      startServerReadyPattern: 'Ready',
      chromeFlags: '--headless=new --no-sandbox --disable-dev-shm-usage --disable-gpu',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/news',
        'http://localhost:3000/calendar',
        'http://localhost:3000/gallery',
        'http://localhost:3000/guides',
        'http://localhost:3000/about',
        'http://localhost:3000/office',
        'http://localhost:3000/privacy',
        'http://localhost:3000/search',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        maxWaitForLoad: 90000,
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        // Fázis 6 gate: baseline alapján kötelező küszöbök.
        'categories:performance': ['error', { minScore: 0.7 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

