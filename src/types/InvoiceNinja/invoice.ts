export interface InvoiceLineItem {
    quantity: number;
    cost: number;
    product_key: string;
    notes: string;
    line_total: number;
}
  
export interface Invoice {
    id: string;
    number: string;
    date: string;
    due_date: string;
    client_id: string;
    amount: string;
    balance: string;
    status_id: string;
    line_items: InvoiceLineItem[]; 
}
  
export interface InvoiceListResponse {
data: Invoice[];
meta: {
    pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
    };
};
}

  