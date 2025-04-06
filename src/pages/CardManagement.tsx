import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { loanAccountService } from '../services/loanAccounts';
import { cardService } from '../services/cards';
import CardDisplay from '../components/features/cards/CardDisplay';
import CardControls from '../components/features/cards/CardControls';
import CardActivityLog from '../components/features/cards/CardActivityLog';
import { Card as CardType } from '../types/card';

const CardManagement: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Mock user ID for demonstration if not provided in URL
  const userIdToUse = userId ? parseInt(userId) : 1;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        
        // Fetch user's cards
        const userCards = await cardService.getCards();
        // Filter cards for this user
        const filteredCards = userCards.filter(card => card.user_id === userIdToUse);
        setCards(filteredCards);
        
        // Fetch transactions for the first loan account
        if (filteredCards.length > 0) {
          const loanAccountId = filteredCards[0].loan_account_id;
          const transactions = await loanAccountService.getTransactions(loanAccountId);
          // Filter transactions that are likely card transactions (purchases)
          const cardTransactions = transactions.filter(t => t.type === 'purchase');
          setTransactions(cardTransactions);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchCards();
  }, [userIdToUse]);

  const handleLockCard = async (cardId: number) => {
    try {
      await cardService.lockCard(cardId);
      // Update the card status in the local state
      setCards(cards.map(card => 
        card.id === cardId ? { ...card, status: 'locked' } : card
      ));
    } catch (err) {
      console.error('Error locking card:', err);
      setError('Failed to lock card. Please try again later.');
    }
  };

  const handleUnlockCard = async (cardId: number) => {
    try {
      await cardService.unlockCard(cardId);
      // Update the card status in the local state
      setCards(cards.map(card => 
        card.id === cardId ? { ...card, status: 'active' } : card
      ));
    } catch (err) {
      console.error('Error unlocking card:', err);
      setError('Failed to unlock card. Please try again later.');
    }
  };

  const handleRequestReplacement = (cardId: number) => {
    // This would typically call an API to request a replacement card
    console.log(`Requesting replacement for card ${cardId}`);
    // For demo purposes, just show an alert
    alert(`Replacement requested for card ${cardId}`);
  };

  const handleManageSettings = (cardId: number) => {
    // This would typically navigate to a card settings page
    console.log(`Managing settings for card ${cardId}`);
    // For demo purposes, just show an alert
    alert(`Managing settings for card ${cardId}`);
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Card Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your virtual and physical cards
        </Typography>
      </Box>

      {cards.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              No cards found
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              You don't have any cards associated with your account yet.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {cards.map(card => (
            <Grid item xs={12} md={6} key={card.id}>
              <Box sx={{ mb: 3 }}>
                <CardDisplay 
                  card={card}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <CardControls 
                  cardId={card.id}
                  status={card.status}
                  onLock={handleLockCard}
                  onUnlock={handleUnlockCard}
                  onRequestReplacement={handleRequestReplacement}
                  onManageSettings={handleManageSettings}
                />
              </Box>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <CardActivityLog 
              userId={userIdToUse}
              transactions={transactions}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CardManagement;
