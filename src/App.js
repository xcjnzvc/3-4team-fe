import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import CompanyDetails from "./pages/home/CompanyDetails";
import { CompareMyCompany } from "./pages/compare/Comparemycompany";
import CompareOverview from "./pages/compare/CompareOverview";
import InvestmentOverview from "./pages/Investment/InvestmentOverview";
import { Header } from "./shared/components/Header";
import CompareResult from "./pages/compare/CompareResult/CompareResult";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="compare" element={<CompareMyCompany />} />
          <Route path="compareoverview" element={<CompareOverview />} />
          <Route path="investment" element={<InvestmentOverview />} />
          <Route path="/compareResult" element={<CompareResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
