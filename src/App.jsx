import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing, Error, Register, Stats } from './pages';

import {
  AllTransactions,
  AddTransactions,
  Profile,
  ProtectedRoute,
} from './pages/dashboard';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-transactions" element={<AllTransactions />} />
          <Route path="add-transactions" element={<AddTransactions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
