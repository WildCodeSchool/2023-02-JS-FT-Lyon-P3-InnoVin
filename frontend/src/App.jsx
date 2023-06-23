import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Presentation from "./pages/Presentation";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import Degustation from "./pages/Degustation";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Presentation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/tasting" element={<Degustation />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
