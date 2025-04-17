import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Adoptar from './pages/Adoptar';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import Blog from './pages/Blog';
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/adoptar" element={<Adoptar />} />
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
