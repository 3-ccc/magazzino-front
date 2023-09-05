import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from "./tema/DarkModeContext";
import { MsgProvider } from "./tema/MsgContext";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store, persistedStore } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ErrorBoundary from './altro/errorBoundary';
import { ScrollProvider } from './tema/ScrollContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <DarkModeProvider>
      <MsgProvider>
      <ScrollProvider>
        <BrowserRouter basename="/magazzino-front" >
          <App />
        </BrowserRouter>
      </ScrollProvider>
      </MsgProvider>
      </DarkModeProvider>
    </PersistGate>
  </Provider>
  </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
