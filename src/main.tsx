import React from 'react';
import { createRoot } from 'react-dom/client';   // ← named import
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);