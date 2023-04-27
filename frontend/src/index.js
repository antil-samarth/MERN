import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GroupContextProvider } from './context/GroupContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GroupContextProvider>
      <App />
    </GroupContextProvider>
  </React.StrictMode>
);