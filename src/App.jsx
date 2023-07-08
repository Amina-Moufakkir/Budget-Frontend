import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Expenses from './components/Expenses/Expenses';
import Income from './components/Income/Income';
import Transactions from './components/Transactions/Transactions';

const App = () => {
  const [active, setActive] = useState(1);

  return (
    <Router>
      <div className="App">
        <main className="main">
          <Sidebar active={active} setActive={setActive} />
          <section className="section">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
};

export default App;
