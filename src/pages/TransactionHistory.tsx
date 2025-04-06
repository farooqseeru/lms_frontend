import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { loanAccountService } from '../services/loanAccounts';
import { formatCurrency } from '../utils/formatters';
import { Transaction } from '../types/transaction';

const TransactionHistory: React.FC = () => {
  const { loanAccountId } = useParams<{ loanAccountId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loanAccount, setLoanAccount] = useState<any>(null);

  // Mock loan account ID for demonstration if not provided in URL
  const loanAccountIdToUse = loanAccountId ? parseInt(loanAccountId) : 1;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        
        // Fetch loan account details
        const account = await loanAccountService.getLoanAccount(loanAccountIdToUse);
        setLoanAccount(account);
        
        // Fetch transactions
        const transactions = await loanAccountService.getTransactions(loanAccountIdToUse);
        setTransactions(transactions || []);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transaction history. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, [loanAccountIdToUse]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'interest':
        return 'Interest';
      case 'fee':
        return 'Fee';
      case 'repayment':
        return 'Payment';
      case 'purchase':
        return 'Purchase';
      default:
        return type;
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'interest':
        return 'info';
      case 'fee':
        return 'error';
      case 'repayment':
        return 'success';
      case 'purchase':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Transaction History
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View all transactions for your loan account
        </Typography>
      </Box>

      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Account Number
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {loanAccount?.id}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Current Balance
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatCurrency(loanAccount?.current_balance || 0)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Credit Limit
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatCurrency(loanAccount?.credit_limit || 0)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip 
                      label={getTransactionTypeLabel(transaction.type)} 
                      color={getTransactionTypeColor(transaction.type) as any}
                      size="small"
                    />
                    {transaction.is_late_fee && (
                      <Chip 
                        label="Late Fee" 
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography 
                      fontWeight={500}
                      color={transaction.type === 'repayment' ? 'success.main' : 'text.primary'}
                    >
                      {transaction.type === 'repayment' ? '-' : '+'}{formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TransactionHistory;
