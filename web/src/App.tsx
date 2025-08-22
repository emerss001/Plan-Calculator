import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalculatorPage from "./pages/calculator";
import SubscriberPlanPage from "./pages/subscribe-plan";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<CalculatorPage />} />
                    <Route path="/subscribe" element={<SubscriberPlanPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
