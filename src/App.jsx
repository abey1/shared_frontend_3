import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import ContactCompany from "./pages/contact-company.jsx";
import FAQs from "./pages/faqs.jsx";
import Blog from "./pages/blog.jsx";
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
import ScrollToHashElement from "./utils/ScrollToHashElement.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import Featured from "./pages/featured.jsx";
import BlogArticleDetail from "./pages/blog-article-detail.jsx";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout.jsx";
import AdminActiveRentalsPage from "./pages/admin/active-rentals-page.jsx";
import AdminBusinessesPage from "./pages/admin/businesses-page.jsx";
import AdminDashboardPage from "./pages/admin/dashboard-page.jsx";
import AdminRevenueOverviewPage from "./pages/admin/revenue-overview-page.jsx";
import AdminUsersPage from "./pages/admin/users-page.jsx";
import { PostLoginAdminRedirect } from "./components/PostLoginAdminRedirect.jsx";
import { BackendUserSync } from "./components/BackendUserSync.jsx";
import InviteRespondPage from "./pages/invite-respond.jsx";

const AdminInvitationsPage = lazy(() =>
  import("./pages/admin/invitations-page.jsx"),
);

/** Stable layout while the invitations chunk (TanStack + Recharts) loads. */
function AdminInvitationsSuspenseFallback() {
  return (
    <div className="flex min-h-[50vh] flex-col gap-4 p-6 md:p-10">
      <div className="h-9 w-56 max-w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-neutral-100 dark:bg-neutral-900" />
      <div className="mt-6 h-48 w-full max-w-2xl animate-pulse rounded-xl border border-border-primary bg-neutral-50 dark:bg-neutral-950" />
      <div className="h-72 w-full animate-pulse rounded-xl border border-border-primary bg-neutral-50/80 dark:bg-neutral-950/80" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <BackendUserSync />
      <PostLoginAdminRedirect />
      <ScrollToTop />
      <ScrollToHashElement />
      <Routes>
        <Route path="/invite/:token" element={<InviteRespondPage />} />
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about-company" element={<AboutCompany />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-company" element={<ContactCompany />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog-article-detail" element={<BlogArticleDetail />} />
          <Route path="/featured" element={<Featured />} />
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
        {/* Admin SPA (full-viewport dashboard; guarded inside layout) */}
        <Route element={<AdminDashboardLayout />}>
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/businesses" element={<AdminBusinessesPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/active-rentals" element={<AdminActiveRentalsPage />} />
          <Route path="/revenue-overview" element={<AdminRevenueOverviewPage />} />
          <Route
            path="/invitations"
            element={
              <Suspense fallback={<AdminInvitationsSuspenseFallback />}>
                <AdminInvitationsPage />
              </Suspense>
            }
          />
        </Route>
        <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
