import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { AuthProvider, DataProvider } from "./context";
import CrowdFundDetails from "./pages/CrowdFundDetails";
import Home from "./pages/Home";
import Investments from "./pages/Investments";

import AdminHome from "./pages/admin/Home";

import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Register";
import AboutPage from "./pages/About";
import TermsAndCondtions from "./pages/TermsAndCondtions";
import AddCrowdFund from "./pages/admin/AddCrowdFund";

const toasterProps = {
  position: "top-right",
  toastOptions: {
    style: {
      fontSize: "0.875rem",
    },
    duration: 5000,
    success: {
      style: {
        backgroundColor: "#DCFCE7",
        color: "#14532D",
      },
    },
  },
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<SignupPage />} />

            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/terms-of-use" element={<TermsAndCondtions />} />

            <Route element={<CrowdFundDetails />} path="/crowdfund/:id" />
            <Route element={<Investments />} path="/investments" />

            {/* admin routes */}
            <Route exact path="/admin" element={<AdminHome />} />
            <Route
              exact
              path="/admin/add-crowdfund"
              element={<AddCrowdFund />}
            />
            <Route element={<CrowdFundDetails />} path="/admin/crowdfund/:id" />
          </Routes>
        </Router>
        <Toaster {...toasterProps} />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
