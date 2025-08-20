import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculatorPage from "./pages/calculator";
import SubscriberPlanPage from "./pages/subscribe-plan";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<CalculatorPage />} />
                <Route path="/subscribe" element={<SubscriberPlanPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
