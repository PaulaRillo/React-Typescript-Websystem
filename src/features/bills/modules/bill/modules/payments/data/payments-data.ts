export const paymentsData = [
  {
    user: {
      firstname: 'Paula',
      lastname: 'Rillo'
    },
    currency: 'USD',
    amount: '$1,240.00',
    method: 'Itaú Visa',
    when: 'Mar 17, 2022 - 10:23 AM',
    description: 'Payment for the month of March',
    status: {
      type: 'success',
      title: 'PAID'
    }
  },
  {
    user: {
      firstname: 'Paula',
      lastname: 'Rillo'
    },
    currency: 'USD',
    amount: '$1,240.00',
    method: 'Nubank Mastercard',
    when: 'Mar 17, 2022 - 09:30 AM',
    description: 'Insuficient funds',
    status: {
      type: 'error',
      title: 'REJECTED'
    }
  }
];
