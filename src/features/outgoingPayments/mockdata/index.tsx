//TODO: delete mock data
export const outgoingPaymentsData = {
  totalRecords: 17,
  data: [
    {
      id: '0123',
      id_external: '9876',
      payment_group: {
        group: 'PRID-4561',
        status: 'Processing',
        paid: 10,
        rejected: 5,
        pending: 7
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '7,350.00'
      },
      requester: 'John Doe',
      bill: 'INV - 010',
      vendor: 'Ocean Computers',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bank one',
        account: 'xxxx-xxxx- 9123'
      },
      payment_date: 'Jan 5, 2023 - 10:13 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '-125.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '250.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Jan 6, 2023 - 6:00 am',
      conclusion_date: '-',
      status: 'REJECTED'
    },
    {
      id: '123',
      id_external: '456',
      payment_group: {
        group: 'PRID-4561',
        status: 'Processing',
        paid: 10,
        rejected: 5,
        pending: 7
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '2,770.00'
      },
      requester: 'Mary Smith',
      bill: 'INV - 010',
      vendor: 'Ocean Computers',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bradesco',
        account: 'xxxx-xxxx- 4566'
      },
      payment_date: 'Jan 5, 2023 - 10:13 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '25.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '-75.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Jan 6, 2023 - 6:00 am',
      conclusion_date: 'Sep 22, 2022 - 15:42 am',
      status: 'PAID'
    },
    {
      id: '4567',
      id_external: '3210',
      payment_group: {
        group: 'PRID-1234',
        status: 'Complete',
        paid: 17,
        rejected: 3,
        pending: 0
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '4,120.00'
      },
      requester: 'Albert Sanchez',
      bill: 'INV - 010',
      vendor: 'SMD Technologies',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bradesco',
        account: 'xxxx-xxxx- 4566'
      },
      payment_date: 'Sep 22, 2022 - 7:00 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '25.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '-75.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Sep 05, 2022 - 13:12 am',
      conclusion_date: '-',
      status: 'PENDING'
    },
    {
      id: '4567',
      id_external: '3210',
      payment_group: {
        group: 'PRID-9876',
        status: 'Processing',
        paid: 10,
        rejected: 5,
        pending: 7
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '7,350.00'
      },
      requester: 'John Doe',
      bill: 'INV - 010',
      vendor: 'Ocean Computers',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bank one',
        account: 'xxxx-xxxx- 9123'
      },
      payment_date: 'Oct 22, 2022 - 7:00 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '-125.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '250.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Oct 23, 2022 - 7:00 am',
      conclusion_date: '-',
      status: 'REJECTED'
    },
    {
      id: '4567',
      id_external: '3210',
      payment_group: {
        group: 'PRID-4561',
        status: 'Processing'
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '2,770.00'
      },
      requester: 'Mary Smith',
      bill: 'INV - 010',
      vendor: 'SMD Technologies',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bradesco',
        account: 'xxxx-xxxx- 4566'
      },
      payment_date: 'Jan 5, 2023 - 10:13 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '25.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '-75.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Jan 6, 2023 - 6:00 am',
      conclusion_date: 'Sep 22, 2022 - 15:42 am',
      status: 'PAID'
    },
    {
      id: '4567',
      id_external: '3210',
      payment_group: {
        group: 'PRID-1234',
        status: 'Complete',
        paid: 17,
        rejected: 3,
        pending: 0
      },
      group_total_value: {
        currency: 'USD',
        isoCode: '$',
        value: '4,120.00'
      },
      requester: 'Albert Sanchez',
      bill: 'INV - 010',
      vendor: 'SMD Technologies',
      origin_account: {
        title: 'Expenses',
        account: 'xxxx-xxxx- 1212'
      },
      destination_account: {
        title: 'Bradesco',
        account: 'xxxx-xxxx- 4566'
      },
      payment_date: 'Sep 22, 2022 - 7:00 am',
      payment_reference: 'REF 123',
      balance_due: {
        currency: 'USD',
        isoCode: '$',
        value: '25.00'
      },
      invoice_total: {
        currency: 'USD',
        isoCode: '$',
        value: '-75.00'
      },
      payment_amount: {
        currency: 'USD',
        isoCode: '$',
        value: '125.00'
      },
      submission_date: 'Sep 05, 2022 - 13:12 am',
      conclusion_date: '-',
      status: 'PENDING'
    }
  ]
};
