// pages/api/invoices/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import InvoiceNinjaClient from 'src/server/invoice/InvoiceNinjaClient';
import { Invoice } from '@/models/InvoiceNinja/invoice'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.INVOICE_API_KEY;
  const invoiceNinjaClient = new InvoiceNinjaClient(apiKey);

  if (req.method === 'GET') {
    try {
      const invoices = await invoiceNinjaClient.getInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      console.error('The API call failed', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newInvoice: Invoice = req.body; // @TODO validate body asap
      const createdInvoice = await invoiceNinjaClient.createInvoice(newInvoice);
      res.status(201).json(createdInvoice);
    } catch (error) {
      console.error('The API call failed', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
