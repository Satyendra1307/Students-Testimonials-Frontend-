import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Front from "./Component/Front";
import Admin from "./Component/Admin";

function App() {
  return (
       <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/admin" element={<Admin />}/>
      </Routes>
  );
}

export default App;
