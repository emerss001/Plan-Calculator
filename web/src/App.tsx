import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculatorPage from "./pages/calculator";
import SubscriberPlanPage from "./pages/subscribe-plan";
import ResumeSalePage from "./pages/resume-sale";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<CalculatorPage />} />
                <Route path="/subscribe" element={<SubscriberPlanPage />} />
                <Route path="/sale-resume/:saleId" element={<ResumeSalePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
