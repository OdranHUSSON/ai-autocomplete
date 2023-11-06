import { Pagination } from "../pagination";

export interface ClientContact {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    send_invoice: boolean;
    custom_value1: string;
    custom_value2: string;
    custom_value3: string;
    custom_value4: string;
    is_primary: boolean;
    created_at: number;
    updated_at: number;
    deleted_at: number;
  }
  
  export interface Client {
    id: string;
    user_id: string;
    assigned_user_id: string;
    company_id: string;
    name: string;
    website?: string;
    private_notes?: string;
    client_hash: string;
    industry_id?: number;
    size_id?: number;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    phone?: string;
    country_id?: number;
    custom_value1?: string;
    custom_value2?: string;
    custom_value3?: string;
    custom_value4?: string;
    vat_number?: string;
    id_number?: string;
    number?: string;
    shipping_address1?: string;
    shipping_address2?: string;
    shipping_city?: string;
    shipping_state?: string;
    shipping_postal_code?: string;
    shipping_country_id?: number;
    is_deleted: boolean;
    balance?: number;
    paid_to_date?: number;
    credit_balance?: number;
    last_login?: number;
    created_at: number;
    updated_at: number;
    group_settings_id?: string;
    routing_id?: string;
    is_tax_exempt?: boolean;
    has_valid_vat_number?: boolean;
    payment_balance?: number;
    contacts?: ClientContact[];
  }

  export interface ClientListResponse {
    data: Client[];
    meta: {
      value: {
        pagination: Pagination;
      };
    };
  }