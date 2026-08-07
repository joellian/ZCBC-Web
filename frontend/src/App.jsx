import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import PublicLayout from './components/PublicLayout';
import NotFound from './components/NotFound';

// Public pages
const HomePage = lazy(() => import('./components/HomePage'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const VisitInfo = lazy(() => import('./components/VisitInfo'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Giving = lazy(() => import('./components/Giving'));
const Sermons = lazy(() => import('./components/Sermons'));

// Admin — lazy so visitors never download it.
const Login = lazy(() => import('./components/admin/Login'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const ResourceList = lazy(() => import('./components/admin/ResourceList'));
const ResourceForm = lazy(() => import('./components/admin/ResourceForm'));

const Loading = () => <div className="loading">Loading...</div>;

const App = () => (
  <Router>
    <AuthProvider>
      <ScrollToTop />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public site */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/visit-us" element={<VisitInfo />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/giving" element={<Giving />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/sermons" replace />} />
                <Route path=":resource" element={<ResourceList />} />
                <Route path=":resource/new" element={<ResourceForm />} />
                <Route path=":resource/:documentId" element={<ResourceForm />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  </Router>
);

export default App;
