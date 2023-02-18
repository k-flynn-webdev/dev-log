import React from 'react';
import ReactDom from 'react-dom/client';
import './style/index.scss';
import './style/index.css';

import App from './App';

const el = document.getElementById('root');
const root = ReactDom.createRoot(el);

root.render(<App />);
