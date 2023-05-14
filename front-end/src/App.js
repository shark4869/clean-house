import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/Register";
import ServicePage from "./pages/ServivePage/ServicePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import GoToTop from "./components/GoToTop/GoToTop";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <GoToTop/>
    </div>
  );
}

export default App;
