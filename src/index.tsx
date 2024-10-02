import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import Home from "./pages/Home";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";
import AboutPage from "./pages/About";

export function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route default component={NotFound} />
      </Router>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
