import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockHome from "./pages/StockHome";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateStock from "./pages/CreateStock";
import StockPrintView from "./pages/StockPrintView";
import SingleStockView from "./pages/SingleStockView";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StockHome />} />
        <Route path="/create/:id" element={<CreateStock />} />
        <Route path="/create" element={<CreateStock />} />
        <Route path="/report" element={<StockPrintView />} />
        <Route path="/single/:id" element={<SingleStockView />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
