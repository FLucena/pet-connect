import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
