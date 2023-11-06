// pages/api/clients/index.ts (create a new file or adjust your existing endpoint)

import { NextApiRequest, NextApiResponse } from 'next';
import InvoiceNinjaClient from 'src/server/invoice/InvoiceNinjaClient';
import { ClientDTO } from '@/models/DTO/client';

const invoiceNinjaClient = new InvoiceNinjaClient(process.env.INVOICE_API_KEY || '');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const clientDTOs: ClientDTO[] = await invoiceNinjaClient.getAllClients();
      res.status(200).json({ data: clientDTOs });
    } catch (error) {
      console.error('Failed to fetch clients with DTO', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
