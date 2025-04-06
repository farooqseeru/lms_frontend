import api from '../api';

export const transactionService = {
  // Get transaction by ID
  getTransaction: async (transactionId: number): Promise<any> => {
    return api.get(`/transactions/${transactionId}`);
  }
};
