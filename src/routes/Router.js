import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovie from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export default function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Index />} /> */}
      <Route path="/" exact element={<Index />} />
      <Route path="/view_movie/:id" element={<ViewMovie />} exact />
      <Route path="/add_movie" element={<AddMovie />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/profile" element={<Profile />} exact />
    </Routes>
  );
}
