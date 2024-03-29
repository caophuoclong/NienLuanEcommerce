import { axiosClient } from '../axiosClient';

export const OrderService = {
  checkOut: (data) => {
    return axiosClient.post('/order', data);
  },
  getExistingCard: () => {
    return axiosClient.get('/order/card');
  },
  getAllOrders: () => {
    return axiosClient.get('/order');
  },
  updateStatusOrder: (data) => {
    return axiosClient.patch('/order/status', data);
  },
  getReceipt: (_id) => {
    return axiosClient.get(`/order/receipt`, {
      params: {
        _id,
      },
    });
  },
};
