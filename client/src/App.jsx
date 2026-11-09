import { Route, Routes } from "react-router-dom";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ListingForm from "./pages/ListingForm.jsx";
import ListingPage from "./pages/ListingPage.jsx";
import ListingsPage from "./pages/ListingsPage.jsx";
import NotFound from "./pages/NotFound.jsx";

function AppLayout() {
  const { authError } = useAuth();

  return (
    <div className="app-shell">
      <Navigation />
      <main>
        {authError && (
          <div className="global-error">
            <ErrorMessage message={authError} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/new" element={<ListingForm />} />
          <Route path="/listings/:id" element={<ListingPage />} />
          <Route path="/listings/:id/edit" element={<ListingForm />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
