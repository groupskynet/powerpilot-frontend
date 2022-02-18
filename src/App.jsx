import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';

// components
import Sidebar from './parts/Sidebar';
import Navbar from './parts/Navbar';
import OperadoresList from './pages/Operadores/OperadoresList';
import MaquinasList from './pages/Maquinas/MaquinasList';
import AccesoriosList from './pages/Accesorios/AccesoriosList';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-y-hidden">
        <Sidebar />
        <div className="panel flex-grow flex flex-col px-6 mt-8">
          <Navbar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route
                exact
                path="/gestion/maquinas"
                element={<MaquinasList />}
              />
              <Route
                exact
                path="/gestion/operadores"
                element={<OperadoresList />}
              />
              <Route
                exact
                path="/gestion/accesorios"
                element={<AccesoriosList />}
              />
              <Route path="/users/change_password">hello</Route>
              <Route path="/gestion/accesorios">hello</Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
