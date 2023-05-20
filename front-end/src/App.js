import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/Login";
import RegisterPage from "./pages/RegisterPage/Register";
import ServicePage from "./pages/ServivePage/ServicePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import UserSerrvicePage from "./pages/UserServicePage/UserServicePage";
import ServiceDetailPage from "./pages/ServiceDetailPage/ServiceDetailPage";
import Services from "./components/Services/Services";
import BookPage from "./pages/BookPage/BookPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import HistoryDetailPage from "./pages/HistoryPage/HistoryDetailPgae";
import RatingPage from "./pages/RatingPage/RatingPage";
import GoToTop from "./components/GoToTop/GoToTop";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history-detail/:id" element={<HistoryDetailPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />}> 
                <Route path="" element={<Navigate to="/service/category" />} />
                <Route path="/service/category" element={<Services />} />
                <Route path="/service/category/:id" element={<Services />} />
          </Route>
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/rating-service/:id" element={<RatingPage />} />
          <Route path="/user-service/:id" element={<UserSerrvicePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <GoToTop/>
    </div>
  );
}

export default App;
