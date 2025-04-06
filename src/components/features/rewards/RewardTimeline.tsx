import React from 'react';
import { Box, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RewardAdjustment } from '../../../types/transaction';

interface RewardTimelineProps {
  history: RewardAdjustment[];
}

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const StyledTimelineDot = styled(TimelineDot)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const RewardTimeline: React.FC<RewardTimelineProps> = ({ history }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };
  
  if (history.length === 0) {
    return (
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No APR adjustments yet. Make regular repayments to reduce your APR.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Timeline position="right">
      {history.map((adjustment, index) => (
        <StyledTimelineItem key={adjustment.id}>
          <TimelineSeparator>
            <StyledTimelineDot />
            {index < history.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2">
              {adjustment.old_apr}% → {adjustment.new_apr}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(adjustment.adjusted_on)}
            </Typography>
            <Typography variant="caption">
              {adjustment.reason}
            </Typography>
          </TimelineContent>
        </StyledTimelineItem>
      ))}
    </Timeline>
  );
};

export default RewardTimeline;
