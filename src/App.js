import {
  BrowserRouter, Routes, Route, Outlet,
} from 'react-router-dom';
import './App.css';

function Rockets() {
  return <div>Rockets Component</div>;
}

function Missions() {
  return (
    <div>
      Missions Component
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <div>If page not found it goes here</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rockets />}>
          <Route path="missions" element={<Missions />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
