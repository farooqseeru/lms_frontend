import api from '../api';

export const repaymentService = {
  // Make a repayment
  makeRepayment: async (data: { loan_account_id: number, amount: number, method?: string }): Promise<any> => {
    return api.post('/repayments/', data);
  },
  
  // Get repayment by ID
  getRepayment: async (repaymentId: number): Promise<any> => {
    return api.get(`/repayments/${repaymentId}`);
  }
};
