import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sombra debajo del header */}
      <div className="position-relative">
        <Header />
        <div className="position-absolute bottom-0 w-100" style={{ height: '10px', boxShadow: '0 4px 6px -6px rgba(0,0,0,0.4)', zIndex: 10 }}></div>
      </div>
      <main className="flex-grow">
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
