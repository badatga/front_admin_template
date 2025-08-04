import React from 'react';
import { createRoot } from 'react-dom/client';   // ← named import
import App from './App';
// @ts-ignore
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../src/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);