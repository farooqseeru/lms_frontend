import React from 'react';
import { Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Transaction } from '../../../types/transaction';
import { formatCurrency } from '../../../utils/formatters';

interface RecentTransactionsProps {
  transactions: Transaction[];
  maxItems?: number;
  onViewAllClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const TransactionItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const TransactionTypeChip = styled(Chip)<{ transactiontype: string }>(({ theme, transactiontype }) => {
  let color;
  switch (transactiontype) {
    case 'interest':
      color = theme.palette.info.main;
      break;
    case 'fee':
      color = theme.palette.error.main;
      break;
    case 'repayment':
      color = theme.palette.success.main;
      break;
    case 'purchase':
      color = theme.palette.warning.main;
      break;
    default:
      color = theme.palette.grey[500];
  }
  
  return {
    backgroundColor: color,
    color: '#fff',
    fontWeight: 500,
    fontSize: '0.75rem',
    height: 24,
  };
});

const AmountText = styled(Typography)<{ transactiontype: string }>(({ theme, transactiontype }) => ({
  fontWeight: 600,
  color: transactiontype === 'repayment' ? theme.palette.success.main : theme.palette.text.primary,
}));

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  maxItems = 5,
  onViewAllClick,
}) => {
  const displayTransactions = transactions.slice(0, maxItems);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
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
  
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">
            Recent Transactions
          </Typography>
          {onViewAllClick && (
            <Typography 
              variant="body2" 
              color="primary" 
              sx={{ cursor: 'pointer', fontWeight: 500 }}
              onClick={onViewAllClick}
            >
              View All
            </Typography>
          )}
        </Box>
        
        {displayTransactions.length > 0 ? (
          <List disablePadding>
            {displayTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} disableGutters>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {transaction.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(transaction.date)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <AmountText variant="body2" transactiontype={transaction.type}>
                    {transaction.type === 'repayment' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </AmountText>
                  <TransactionTypeChip 
                    label={getTransactionTypeLabel(transaction.type)} 
                    size="small" 
                    transactiontype={transaction.type}
                  />
                </Box>
              </TransactionItem>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No recent transactions
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default RecentTransactions;
