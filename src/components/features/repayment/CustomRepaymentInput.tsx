import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, InputAdornment, Slider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { formatCurrency } from '../../../utils/formatters';

interface CustomRepaymentInputProps {
  value: string;
  onChange: (value: string) => void;
  currentBalance: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const CustomRepaymentInput: React.FC<CustomRepaymentInputProps> = ({
  value,
  onChange,
  currentBalance,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const percentage = newValue as number;
    setSliderValue(percentage);
    
    // Calculate amount based on percentage of current balance
    const amount = (percentage / 100) * currentBalance;
    onChange(amount.toFixed(2));
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    // Only allow valid number inputs
    if (newValue === '' || /^\d+(\.\d{0,2})?$/.test(newValue)) {
      onChange(newValue);
      
      // Update slider if value is valid
      if (newValue !== '' && parseFloat(newValue) <= currentBalance) {
        const percentage = (parseFloat(newValue) / currentBalance) * 100;
        setSliderValue(percentage);
      }
    }
  };
  
  // Calculate percentage of balance
  const percentageOfBalance = value ? ((parseFloat(value) / currentBalance) * 100).toFixed(1) : '0.0';
  
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Custom Amount
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Payment Amount"
            variant="outlined"
            value={value}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            helperText={`${percentageOfBalance}% of your current balance (${formatCurrency(currentBalance)})`}
          />
        </Box>
        
        <Box sx={{ px: 1 }}>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="custom-payment-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toFixed(0)}%`}
            step={1}
            min={0}
            max={100}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">0%</Typography>
            <Typography variant="caption" color="text.secondary">25%</Typography>
            <Typography variant="caption" color="text.secondary">50%</Typography>
            <Typography variant="caption" color="text.secondary">75%</Typography>
            <Typography variant="caption" color="text.secondary">100%</Typography>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CustomRepaymentInput;
