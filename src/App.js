import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Ex } from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="ex" element={<Ex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
