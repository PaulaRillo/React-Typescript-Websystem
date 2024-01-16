export const path = Object.freeze({
  root: '/',
  signIn: '/signin',
  dashboard: '/dashboard',
  reports: '/reports',
  outgoingPayments: '/outgoing-payments',
  bills: {
    root: '/bills',
    id: {
      root: '/bills/:id',
      preview: 'preview',
      // overview: 'overview',
      payments: 'payments',
      installments: 'installments',
      history: 'history',
      comments: 'comments'
    },
    payment: {
      root: 'payment'
    }
  },
  vendors: {
    root: '/vendors',
    id: {
      root: '/vendors/:id',
      overview: 'overview',
      bills: 'bills',
      payments: 'payments',
      history: 'history',
      comments: 'comments',
      contacts: 'contacts',
      documents: 'documents',
      settings: {
        root: 'settings',
        paymentMethods: 'payment-methods'
      }
    }
  },
  settings: {
    root: '/settings',
    personal: {
      root: 'personal',
      info: 'info'
    },
    company: {
      root: 'company',
      details: 'details',
      general: 'general',
      bankAccounts: 'bank-accounts',
      currencies: 'currencies'
    },
    integrations: {
      root: 'integrations',
      connection: 'connection-setup',
      sync: 'sync-status'
    },
    accounting: {
      root: 'accounting',
      currencies: 'currencies',
      billApprovalPolicies: 'bill-approval-policies',
      billApprovalPolicy: 'bill-approval-policies/:id',
      approvalGroup: 'approval-group'
    },
    access: {
      root: 'access',
      roles: 'roles',
      users: 'users'
    }
  }
});
