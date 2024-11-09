import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { CompareMyCompany } from "./pages/compare/Comparemycompany";
import InvestmentOverview from "./pages/Investment/InvestmentOverview"
import { Header } from "./shared/component/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="compare" element={<CompareMyCompany />} />
          <Route path="investment" element={<InvestmentOverview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
