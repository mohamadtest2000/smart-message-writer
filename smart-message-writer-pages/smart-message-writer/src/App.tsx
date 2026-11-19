import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Create from "@/pages/Create";
import Templates from "@/pages/Templates";
import History from "@/pages/History";
import Favorites from "@/pages/Favorites";
import Pricing from "@/pages/Pricing";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/history" element={<History />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}
