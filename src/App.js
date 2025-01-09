import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapView from "./pages/MapView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:lat/:lon/:lat1/:lon1" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
