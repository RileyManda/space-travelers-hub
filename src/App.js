import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Missions from './components/Missions';
import Header from './components/Header';
import Rockets from './components/Rockets';
import HorizontalLine from './components/Horizontal';
import Profile from './components/Profile';

function NotFound() {
  return <div>If page not found it goes here</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HorizontalLine />
      <Routes>
        <Route path="" element={<Rockets />} />
        <Route path="missions" element={<Missions />}>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
