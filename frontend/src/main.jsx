import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/caveat/400.css";
import "./styles/styles.css";
import "./styles/refinements.css";
import "./styles/planning.css";
import App from "./App";
import { TravelProvider } from "./context/TravelContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <TravelProvider>
      <App />
    </TravelProvider>
  </HashRouter>,
);
