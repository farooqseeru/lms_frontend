import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import AccountSummary from '../components/features/account/AccountSummary';
import QuickActions from '../components/features/account/QuickActions';
import RecentTransactions from '../components/features/transactions/RecentTransactions';
import RewardProgress from '../components/visualizations/RewardProgress';
import InterestSummary from '../components/features/account/InterestSummary';
import { loanAccountService } from '../services/loanAccounts';
import { userService } from '../services/users';
import { useNavigate } from 'react-router-dom';

// Mock user ID for demonstration
const DEMO_USER_ID = 1;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loanAccount, setLoanAccount] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const user = await userService.getUser(DEMO_USER_ID);
        setUserData(user);
        
        // Fetch loan accounts
        const accounts = await loanAccountService.getLoanAccounts();
        if (accounts && accounts.length > 0) {
          const account = accounts[0]; // Use the first account for demo
          setLoanAccount(account);
          
          // Fetch transactions for this account
          const transactions = await loanAccountService.getTransactions(account.id);
          setTransactions(transactions || []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Calculate daily interest
  const calculateDailyInterest = (balance: number, apr: number) => {
    return balance * (apr / 100 / 365);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  // If we have loan account data, calculate some values
  const currentBalance = loanAccount?.current_balance || 0;
  const creditLimit = loanAccount?.credit_limit || 0;
  const availableCredit = creditLimit - currentBalance;
  const currentApr = userData?.apr || 25.0;
  const dailyInterest = calculateDailyInterest(currentBalance, currentApr);
  const monthlyInterest = dailyInterest * 30;
  
  // For reward progress
  const nextApr = Math.max(currentApr - 2.0, 10.0); // Minimum APR is 10%
  const goodRepayments = 1; // Mock value, would come from API
  const requiredRepayments = 3;
  const progressPercentage = (goodRepayments / requiredRepayments) * 100;
  
  const handleMakePayment = () => {
    navigate('/repayment');
  };
  
  const handleManageCards = () => {
    navigate('/cards');
  };
  
  const handleViewStatement = () => {
    navigate(`/account/${loanAccount?.id}/statement`);
  };
  
  const handleCheckRewards = () => {
    navigate('/rewards');
  };
  
  const handleViewAllTransactions = () => {
    navigate('/transactions');
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {userData?.name || 'User'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's your financial overview
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Main column */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <AccountSummary 
                currentBalance={currentBalance}
                availableCredit={availableCredit}
                creditLimit={creditLimit}
                currentApr={currentApr}
                nextPaymentDue="15 Apr 2025"
              />
            </Grid>
            
            <Grid item xs={12}>
              <RecentTransactions 
                transactions={transactions}
                onViewAllClick={handleViewAllTransactions}
              />
            </Grid>
          </Grid>
        </Grid>
        
        {/* Side column */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QuickActions 
                onMakePayment={handleMakePayment}
                onManageCards={handleManageCards}
                onViewStatement={handleViewStatement}
                onCheckRewards={handleCheckRewards}
              />
            </Grid>
            
            <Grid item xs={12}>
              <RewardProgress 
                currentApr={currentApr}
                nextApr={nextApr}
                progressPercentage={progressPercentage}
                goodRepayments={goodRepayments}
                requiredRepayments={requiredRepayments}
              />
            </Grid>
            
            <Grid item xs={12}>
              <InterestSummary 
                currentBalance={currentBalance}
                currentApr={currentApr}
                dailyInterest={dailyInterest}
                monthlyInterest={monthlyInterest}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
