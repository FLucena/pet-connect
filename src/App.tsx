import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Refugios from './pages/Refugios';
import Adoptar from './pages/Adoptar';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import Blog from './pages/Blog';
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import Mascota from './pages/Mascota';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/refugios" element={<Refugios />} />
          <Route path="/adoptar" element={<Adoptar />} />
          <Route path="/mascota/:id" element={<Mascota />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
