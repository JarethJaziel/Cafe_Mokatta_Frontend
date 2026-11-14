module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/cafe_mokatta_frontend/browser',
      isSinglePageApplication: true,
      url: ['http://localhost/inventory', 'http://localhost/login'],
      numberOfRuns: 1,
      puppeteerScript: './lhci-auth.cjs',
      settings: {
        preset: 'desktop',
        disableStorageReset: true,
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '../evidencias/lhci-reports',
    },
  },
};
