import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import ContactCompany from "./pages/contact-company.jsx";
import FAQs from "./pages/faqs.jsx";
import RentalHistory from "./pages/rental-history.jsx";
import RentalAccountDashboard from "./pages/renter-account-dashboard.jsx";
import SingleRentedItemDetail from "./pages/single-rented-item-detail.jsx";
import Testimonials from "./pages/testimonials.jsx";
import AboutCompany from "./pages/about-company.jsx";
import AllTools from "./pages/all-tools.jsx";
import Categories from "./pages/categories.jsx";
import Companies from "./pages/companies.jsx";
import HowItWorks from "./pages/how-it-works.jsx";
import ToolDetails from "./pages/tool-detail.jsx";
import AboutUs from "./pages/about-us.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about-company" element={<AboutCompany />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-company" element={<ContactCompany />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/for-companies" element={<Companies />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/all-tools" element={<AllTools />} />
        <Route path="/tools/:toolSlug" element={<ToolDetails />} />
        <Route path="/rental-history" element={<RentalHistory />} />
        <Route path="/rentals/:itemId" element={<SingleRentedItemDetail />} />
        <Route
          path="/rental-account-dashboard"
          element={<RentalAccountDashboard />}
        />
      </Route>
    </Routes>
  );
}
