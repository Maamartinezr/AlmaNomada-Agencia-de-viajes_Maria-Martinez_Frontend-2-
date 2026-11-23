import { useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationEffects from "./components/layout/NavigationEffects";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Summary from "./pages/Summary";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import TripServices from "./pages/TripServices";
import { Empty } from "./components/common/UI";
export default function App() {
  const contentRef = useRef(null);
  const focusContent = useCallback(() => {
    contentRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <Header onSkipToContent={focusContent} />
      <NavigationEffects onNavigate={focusContent} />
      <main id="contenido" ref={contentRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinos" element={<Destinations />} />
          <Route path="/destinos/:id" element={<DestinationDetail />} />
          <Route path="/vuelos/:destinoId" element={<Flights />} />
          <Route path="/hoteles/:destinoId" element={<Hotels />} />
          <Route path="/resumen" element={<Summary />} />
          <Route path="/experiencias" element={<Experiences />} />
          <Route path="/experiencias/:id" element={<ExperienceDetail />} />
          <Route path="/nosotras" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/mi-viaje/servicios" element={<TripServices />} />
          <Route
            path="*"
            element={
              <Empty
                title="Este camino aún no existe"
                to="/"
                label="Volver al inicio"
              >
                No encontramos la página que buscas. Siempre hay una nueva ruta
                por descubrir.
              </Empty>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
