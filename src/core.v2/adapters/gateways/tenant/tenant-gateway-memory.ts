import { StorageKey } from '../../../domain/@shared/settings/constants.enum';
import { CashFlowType } from '../../../domain/@shared/types/cash-flow.type';
import { TenantSettingsType } from '../../../domain/@shared/types/tenant-settings.type';
import { storageMemory } from '../../../drivers/utils/Storage/storage-memory';
import { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import { CashFlowMapperInterface } from '../../mappers/tenant/cash-flow-mapper.interface';
import { TenantSettingsMapperInterface } from '../../mappers/tenant/tenant-settings-mapper.interface';
import { TenantGatewayInterface } from './tenant-gateway.interface';

export class TenantGatewayMemory implements TenantGatewayInterface {
  private readonly settings: any;
  private readonly storageKey: string;
  private readonly tenantSettingsMapper: TenantSettingsMapperInterface;
  private readonly cashFlowMapper: CashFlowMapperInterface;
  private readonly cashFlowList: any;

  constructor(private readonly mapperFactory: MapperFactoryInterface) {
    this.tenantSettingsMapper = this.mapperFactory.createTenantSettingsMapper();
    this.cashFlowMapper = this.mapperFactory.createCashFlowMapper();
    this.storageKey = StorageKey.TENANT_SETTINGS;
    this.settings = tenantSettingsDTO;
    this.cashFlowList = cashFlowListDTO;
  }

  async getSyncStatus(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getQuotas(): Promise<any> {
    return Promise.resolve({
      users: 10
    });
  }

  async getSettings(): Promise<TenantSettingsType> {
    const storageSettings = storageMemory.get(this.storageKey);
    if (storageSettings) {
      return JSON.parse(storageSettings) as TenantSettingsType;
    }
    const settingsMapped = this.tenantSettingsMapper.toDomain(this.settings);
    storageMemory.set(this.storageKey, JSON.stringify(settingsMapped));

    return settingsMapped;
  }

  getCashFlows(): Promise<CashFlowType[]> {
    return this.cashFlowList.map((cashFlow: any) =>
      this.cashFlowMapper.toDomain(cashFlow)
    );
  }
}

const cashFlowListDTO = [
  {
    id: '808012f8-a9be-4748-b51e-48e5eee7ac86',
    external_id: '2',
    name: 'Payments for Invoices from Customers'
  },
  {
    id: '6f7c9229-ba1c-4e51-8643-ead0b5fe5ee1',
    external_id: '3',
    name: 'Down Payments Received from Customers'
  },
  {
    id: '718141ee-0598-473c-8d5b-3428936624c5',
    external_id: '4',
    name: 'Purchase Credit Memos Paid by Vendors'
  },
  {
    id: '0534fe66-1c61-44c7-91bf-f6ce989de54e',
    external_id: '7',
    name: 'Payments for Invoices to Vendors'
  },
  {
    id: '4ba3c436-9a06-44c7-b814-1409c6ebbca2',
    external_id: '8',
    name: 'Down Payments to Vendors'
  },
  {
    id: 'f98f65ef-7186-4f2c-8ade-0bc7805f1da9',
    external_id: '9',
    name: 'Sales Credit Memos Paid to Customers'
  },
  {
    id: 'ff17ee02-7e44-4667-9a45-a3606a4814d2',
    external_id: '11',
    name: 'Cash Paid for Rent'
  },
  {
    id: '18d26b52-a8ac-48dc-8558-2f912c896d6b',
    external_id: '12',
    name: 'Cash Paid for Electricity'
  },
  {
    id: '3b1e3362-a943-4112-b633-218c2835c002',
    external_id: '15',
    name: 'Cash Paid for Phones'
  },
  {
    id: '79798671-a363-47d7-86d2-440748e77c6d',
    external_id: '16',
    name: 'Payments to Employees, e.g. Wages'
  },
  {
    id: '95f0ba53-8c3a-4a14-ad1a-37b9cf73a79f',
    external_id: '17',
    name: 'Other Operating Payments'
  },
  {
    id: '9f20248e-79ab-4957-aad7-a83ca1c68113',
    external_id: '18',
    name: 'Corporate Income Tax Paid'
  },
  {
    id: 'e59fd6c7-ef00-47f6-943f-ce8e24d64556',
    external_id: '19',
    name: 'VAT Paid'
  },
  {
    id: '3992e617-8a65-4ab5-80d3-43da228c733c',
    external_id: '20',
    name: 'Interest Paid - Operating Activities'
  },
  {
    id: '9b6657b5-b10b-4d41-9386-559a2cdfd353',
    external_id: '23',
    name: 'Payments for Purchase of the Fixed Assets'
  },
  {
    id: 'e449c53c-572b-4654-8ed3-458e2f8f3b88',
    external_id: '24',
    name: 'Payments for Purchase of Shares/Obligations'
  },
  {
    id: 'eb226764-1c3a-48c0-8f9a-5f68774cac74',
    external_id: '25',
    name: 'Payments from Sale of Fixed Assets'
  },
  {
    id: 'd274b696-343b-4ea2-a6d4-6d4883539988',
    external_id: '26',
    name: 'Payments from Sale of Shares/Obligations'
  },
  {
    id: 'd0359f68-a8c7-4a02-8d3c-85bb954071c2',
    external_id: '28',
    name: 'Dividends Received - Investing Activities'
  },
  {
    id: '03f4fce7-8b84-4582-bfd4-0ea01ecc2294',
    external_id: '29',
    name: 'Interest Received  - Investing Activities'
  },
  {
    id: '9670be90-c908-4346-8923-87061c5e6c01',
    external_id: '31',
    name: 'Payments/Receipts for Purchase of Shares/Obligations'
  },
  {
    id: 'ef0072c0-a567-4089-a82f-a2ab489c226a',
    external_id: '32',
    name: 'Payments/Receipts from Long-term Borrowings'
  },
  {
    id: '4b4d8ae2-c795-4b14-af53-f237168d727e',
    external_id: '34',
    name: 'Payment for Finance Lease Liabilities'
  },
  {
    id: 'c106b514-d6a4-4e65-b0ff-e8ca05a3e12b',
    external_id: '35',
    name: 'Redemption of Shares'
  },
  {
    id: 'e3413a4b-f125-40b7-89e4-5fa9e6285fe4',
    external_id: '36',
    name: 'Repayment of Loans'
  },
  {
    id: 'dbd89b24-5ad1-44d7-8e2e-e853d4f1862c',
    external_id: '37',
    name: 'Dividend Paid'
  },
  {
    id: '9e94ca5b-a439-4984-bb4f-671bab65d875',
    external_id: '39',
    name: 'Interest Received  - Financing Activities'
  },
  {
    id: '9d55620b-3ca7-475c-a95a-99f9771737f1',
    external_id: '43',
    name: 'Interest Paid - Financing Activities'
  }
];

export const tenantSettingsDTO = {
  id: 1,
  external_id: '1',
  company_name: 'OEC Computers',
  address: '95 Morton Street\rSuite 200\rNew York NY  10014\rUSA',
  country_code: null,
  country_external_code: 'US',
  header: 'OEC Computers',
  primary_phone_number1: '555-0199',
  primary_phone_number2: '555-0198',
  primary_email: null,
  local_currency_id: '$',
  local_currency_external_id: '$',
  system_currency_id: '$',
  system_currency_external_id: '$',
  open_balance_with_minus_sign: true,
  totals_accuracy_digits: 2,
  quantities_accuracy_digits: 3,
  prices_accuracy_digits: 2,
  rates_accuracy_digits: 6,
  percentages_accuracy_digits: 3,
  measuring_units_accuracy_digits: 3,
  query_accuracy_digits: 2,
  decimal_separator: '.',
  thousands_separator: ',',
  display_currency_on_the_right: true,
  rounding_method: true,
  state: 'NY',
  alias_name: '',
  address_type: null,
  street_number: null,
  date_of_incorporation: null,
  global_location_number: null,
  created_at: '2022-11-07T22:27:14.802Z',
  updated_at: '2022-11-08T17:44:19.663Z',
  created_by: '5790c9ca-d393-4411-afba-a7976ccf4647',
  updated_by: '5790c9ca-d393-4411-afba-a7976ccf4647',
  first_pull_sync_at: '2022-11-07T22:27:07.478Z',
  last_pull_sync_at: '2022-11-08T17:43:05.330Z',
  first_push_sync_at: null,
  last_push_sync_at: null
};

const syncStatusMocked = {
  sync_status: {
    account_categories: {
      error: '',
      failed_at: '',
      index: 3,
      last_sync_at: '2023-03-28T15:54:52.950Z',
      name: 'account_categories',
      started_at: '2023-03-28T15:54:50.582Z',
      sync_status: 'FULFILLED'
    },
    ap_invoice_installments: {
      last_sync_at: '',
      name: 'ap_invoice_installments',
      index: 18,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    ap_invoice_lines: {
      last_sync_at: '',
      name: 'ap_invoice_lines',
      index: 17,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    ap_invoices: {
      last_sync_at: '',
      name: 'ap_invoices',
      index: 16,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    business_partner_groups: {
      last_sync_at: '',
      name: 'business_partner_groups',
      index: 8,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    cash_flows: {
      last_sync_at: '',
      name: 'cash_flows',
      index: 7,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    general_ledger_account: {
      last_sync_at: '',
      name: 'general_ledger_account',
      index: 5,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    industries: {
      error: '',
      failed_at: '',
      index: 1,
      last_sync_at: '2023-03-28T15:54:43.557Z',
      name: 'industries',
      started_at: '2023-03-28T15:54:41.658Z',
      sync_status: 'FULFILLED'
    },
    payment_methods: {
      last_sync_at: '',
      name: 'payment_methods',
      index: 10,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    payment_terms: {
      last_sync_at: '',
      name: 'payment_terms',
      index: 9,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    projects: {
      error: '',
      failed_at: '',
      index: 2,
      last_sync_at: '2023-03-28T15:54:47.785Z',
      name: 'projects',
      started_at: '2023-03-28T15:54:45.938Z',
      sync_status: 'FULFILLED'
    },
    sales_taxes_codes: {
      error: '',
      failed_at: '',
      index: 4,
      last_sync_at: '2023-03-28T15:54:58.361Z',
      name: 'sales_taxes_codes',
      started_at: '2023-03-28T15:54:56.341Z',
      sync_status: 'FULFILLED'
    },
    tenant_banking_info: {
      last_sync_at: '',
      name: 'tenant_banking_info',
      index: 6,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    tenant_settings: {
      error: '',
      failed_at: '',
      index: 0,
      last_sync_at: '2023-03-28T15:54:38.717Z',
      name: 'tenant_settings',
      started_at: '2023-03-28T15:54:37.211Z',
      sync_status: 'FULFILLED'
    },
    vendor_addresses: {
      last_sync_at: '',
      name: 'vendor_addresses',
      index: 12,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    vendor_banking_info: {
      last_sync_at: '',
      name: 'vendor_banking_info',
      index: 14,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    vendor_contact_person: {
      last_sync_at: '',
      name: 'vendor_contact_person',
      index: 13,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    },
    vendors: {
      last_sync_at: '',
      name: 'vendors',
      index: 11,
      started_at: '',
      sync_status: 'IDLE',
      failed_at: '',
      error: ''
    }
  }
};
