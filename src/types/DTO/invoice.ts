import { z } from 'zod';

export interface InvoiceDTO {
    id: string;
    clientId: string;
    number: string;
    date: string;
    dueDate: string;
    amount: string;
    balance: string;
    lineItems: InvoiceLineItemDTO[]; 
}

export interface InvoiceLineItemDTO {
    quantity: number;
    cost: number;
    productKey: string;
    productCost: number;
    productNotes: string;
    discount: number;
    isAmountDiscount: boolean;
    lineTotal: number;
    grossLineTotal: number;
    taxAmount: number;
}

export const InvoiceLineItemDTOSchema = z.object({
  quantity: z.number(),
  cost: z.number(),
  productKey: z.string().describe("Unit of the service for example days, hours"),
  productCost: z.number(),
  productNotes: z.string().describe("Description of the service"),
  discount: z.number(),
  isAmountDiscount: z.boolean(),
  lineTotal: z.number(),
  grossLineTotal: z.number(),
  taxAmount: z.number(),
});

export const InvoiceDTOSchema = z.object({
  id: z.string(),
  lineItems: z.array(InvoiceLineItemDTOSchema),
});

export type zInvoiceDTO = z.infer<typeof InvoiceDTOSchema>;
export type zInvoiceLineItemDTO = z.infer<typeof InvoiceLineItemDTOSchema>;
