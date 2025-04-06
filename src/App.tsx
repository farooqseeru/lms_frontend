import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import MainLayout from './components/layout/MainLayout';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountDetails from './pages/AccountDetails';
import CardManagement from './pages/CardManagement';
import RepaymentCenter from './pages/RepaymentCenter';
import RewardsTracker from './pages/RewardsTracker';
import TransactionHistory from './pages/TransactionHistory';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/account/:accountId" element={
            <MainLayout>
              <AccountDetails />
            </MainLayout>
          } />
          <Route path="/cards" element={
            <MainLayout>
              <CardManagement />
            </MainLayout>
          } />
          <Route path="/repayment" element={
            <MainLayout>
              <RepaymentCenter />
            </MainLayout>
          } />
          <Route path="/rewards" element={
            <MainLayout>
              <RewardsTracker />
            </MainLayout>
          } />
          <Route path="/transactions" element={
            <MainLayout>
              <TransactionHistory />
            </MainLayout>
          } />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" element={<ErrorPage code="404" message="Page not found" />} />
          <Route path="/500" element={<ErrorPage code="500" message="Server error" />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
