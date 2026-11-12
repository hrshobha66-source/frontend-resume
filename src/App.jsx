import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <AppRoutes />
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
