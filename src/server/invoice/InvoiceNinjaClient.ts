// server/InvoiceNinjaClient.ts

import axios, { AxiosInstance } from 'axios';
import { Client } from '@/models/InvoiceNinja/client';
import { Invoice, InvoiceListResponse } from '@/models/InvoiceNinja/invoice';
import { ClientDTO } from '@/models/DTO/client';
import { InvoiceDTO } from '@/models/DTO/invoice';

class InvoiceNinjaClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: process.env.INVOICE_API_URL,
      headers: {
        'X-Api-Token' : apiKey,
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(request => {
      return request;
    });

    this.client.interceptors.response.use(response => {
      return response;
    }, error => {
      console.log('Response Error:', error);
      return Promise.reject(error);
    });
  }

  // CRUD for Clients
  public createClient(client: Client) {
    console.log(`Creating client: ${JSON.stringify(client)}`);
    return this.client.post('/clients', client)
      .catch(error => this.handleError(error));
  }

  public async getAllClients(): Promise<ClientDTO[]> {
    console.log(`Getting all clients with simplified DTO`);
    try {
      const response = await this.client.get('/clients');
      const clients = response.data.data;

      return clients.map((client: any) => ({
        id: client.id,
        displayName: client.display_name,
        name: client.name,
        isDeleted: client.is_deleted,
        createdAt: client.created_at,
        updatedAt: client.updated_at,
      }));
    } catch (error) {
      this.handleError(error);
    }
  }

public async getClientById(clientId: string): Promise<ClientDTO> {
  console.log(`Getting client with ID: ${clientId}`);
  try {
    const response = await this.client.get(`/clients/${clientId}`);
    const client = response.data.data;

    // Transform the client data to ClientDTO
    const clientDTO: ClientDTO = {
      id: client.id,
      displayName: client.display_name,
      name: client.name,
      isDeleted: client.is_deleted,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    };

    return clientDTO;
  } catch (error) {
    this.handleError(error);
  }
}
  public updateClient(clientId: number, client: Client) {
    console.log(`Updating client ID ${clientId}: ${JSON.stringify(client)}`);
    return this.client.put(`/clients/${clientId}`, client)
      .catch(error => this.handleError(error));
  }

  public deleteClient(clientId: number) {
    console.log(`Deleting client ID ${clientId}`);
    return this.client.delete(`/clients/${clientId}`)
      .catch(error => this.handleError(error));
  }

  // CRUD FOR INVOICES

  public async getInvoices(): Promise<InvoiceDTO[]> {
    try {
      const response = await this.client.get('/invoices');
      const invoices: Invoice[] = response.data.data;
      return invoices.map(this.transformToInvoiceDTO);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async createInvoice(invoiceDTO: InvoiceDTO): Promise<InvoiceDTO> {
    try {
      const invoice = this.transformToInvoice(invoiceDTO);
      const response = await this.client.post('/invoices', invoice);
      const invoiceData = response.data.data;
      return this.transformToInvoiceDTO(invoiceData);
    } catch (error) {
      this.handleError(error);
    }
  }

  private transformToInvoiceDTO(invoice: Invoice): InvoiceDTO {
    return {
      id: invoice.id,
      clientId: invoice.client_id,
      number: invoice.number,
      date: invoice.date,
      dueDate: invoice.due_date,
      amount: invoice.amount,
      balance: invoice.balance,
      lineItems: invoice.line_items.map((item: any) => ({
        quantity: item.quantity,
        cost: item.cost,
        productKey: item.product_key,
        productCost: item.product_cost,
        productNotes: item.notes,
        discount: item.discount,
        isAmountDiscount: item.is_amount_discount,      
        lineTotal: item.line_total,
        grossLineTotal: item.gross_line_total,
        taxAmount: item.tax_amount,
      })),
    };
  }

  private transformToInvoice(invoice: InvoiceDTO): Invoice {
    return {
      id: invoice.id,
      client_id: invoice.clientId,
      number: invoice.number,
      date: invoice.date,
      due_date: invoice.dueDate,
      amount: invoice.amount,
      balance: invoice.balance,
      line_items: invoice.lineItems.map((item: any) => ({
        quantity: item.quantity,
        cost: item.cost,
        product_key: item.productKey,
        product_cost: item.productCost,
        notes: item.productNotes,
        discount: item.discount,
        isAmountDiscount: item.is_amount_discount,
        line_total: item.lineTotal,
        grossLineTotal: item.gross_line_total,
        taxAmount: item.tax_amount,
      })),
    };
  }

  // ERROR HANDLING

  private handleError(error: any): void {
    console.error('An error occurred:', error.message);
    if (error.response) {
      if (error.response.data) {
        console.error('Data:', error.response.data);
        if (error.response.data.errors) {
          throw error.response.data.errors;
        }
      }
      
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error details:', error.message);
    }
    throw error;
  }
}

export default InvoiceNinjaClient;
