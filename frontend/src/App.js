import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./pages/navbar/navbar";
import { Home } from "./pages/home/home";
// src/index.js or src/App.js
// src/index.js or src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
