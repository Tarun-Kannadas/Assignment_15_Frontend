import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeopleList from "./components/PeopleList.jsx";
import AddEditPerson from "./components/AddEditPerson.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>People Listing CRUD</h1>
        <Routes>
          <Route path="/" element={<PeopleList />} />
          <Route path="/add" element={<AddEditPerson />} />
          <Route path="/edit/:id" element={<AddEditPerson />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
