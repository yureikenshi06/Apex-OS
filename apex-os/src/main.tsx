import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/globals.css';

function render() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Dev-only: /?preview=1 renders the app against a mocked backend (see src/dev/preview.ts).
// `import.meta.env.DEV` is a compile-time false in production builds, so this branch is dropped.
if (import.meta.env.DEV && new URLSearchParams(location.search).get('preview') === '1') {
  sessionStorage.setItem('apex_preview', '1');
}

if (import.meta.env.DEV && sessionStorage.getItem('apex_preview') === '1') {
  import('./dev/preview').then((m) => {
    m.installPreviewMock();
    render();
  });
} else {
  render();
}
