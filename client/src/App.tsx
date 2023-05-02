//import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Dashboard from './components/Dashboard';
import Login from './components/Login'
import {AuthProvider} from './components/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import {
  Routes,
  Route,
} from 'react-router-dom';

function App() {

  return (
    <React.Fragment>
      <AuthProvider>
        <Box sx={{ height: '100vh' }}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>}
            />
          </Routes>
        </Box>
      </AuthProvider>
    </React.Fragment>

  );
}

export default App;
