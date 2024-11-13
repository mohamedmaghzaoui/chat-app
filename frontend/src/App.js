import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './pages/navbar/navbar';
import { Home } from './pages/home/home';
import { Chat } from './pages/chat/chat';
// src/index.js or src/App.js
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserProvider } from './Contexts/userContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
