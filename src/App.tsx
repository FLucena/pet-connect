import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/skeleton.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load all pages
const Inicio = lazy(() => import('./pages/Inicio'));
const Refugios = lazy(() => import('./pages/Refugios'));
const Adoptar = lazy(() => import('./pages/Adoptar'));
const Contacto = lazy(() => import('./pages/Contacto'));
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'));
const PreguntasFrecuentes = lazy(() => import('./pages/PreguntasFrecuentes'));
const Blog = lazy(() => import('./pages/Blog'));
const Terminos = lazy(() => import('./pages/Terminos'));
const Privacidad = lazy(() => import('./pages/Privacidad'));
const Pet = lazy(() => import('./pages/Mascota'));
const UserLocation = lazy(() => import('./pages/UserLocation'));
const ShelterDetail = lazy(() => import('./pages/DetalleRefugio'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Registrarse'));
const DonationSuccess = lazy(() => import('./pages/DonationSuccess'));
const DonationFailure = lazy(() => import('./pages/DonationFailure'));
const DonationPending = lazy(() => import('./pages/DonationPending'));
const Donar = lazy(() => import('./pages/Donar'));
const DonationDashboard = lazy(() => import('./pages/DonationDashboard'));

function App() {
  return (
    <ErrorBoundary>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/refugios" element={<Refugios />} />
              <Route path="/refugios/:id" element={<ShelterDetail />} />
              <Route path="/adoptar" element={<Adoptar />} />
              <Route path="/mascota/:id" element={<Pet />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/ubicacion" element={<UserLocation />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donation/success" element={<DonationSuccess />} />
              <Route path="/donation/failure" element={<DonationFailure />} />
              <Route path="/donation/pending" element={<DonationPending />} />
              <Route path="/donar" element={<Donar />} />
              <Route path="/admin/donaciones" element={<DonationDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
