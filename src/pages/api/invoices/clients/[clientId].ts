// pages/api/clients/[clientId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import InvoiceNinjaClient from 'src/server/invoice/InvoiceNinjaClient';
import { ClientDTO } from '@/models/DTO/client';

const invoiceNinjaClient = new InvoiceNinjaClient(process.env.INVOICE_API_KEY || '');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { clientId },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const clientDTO: ClientDTO = await invoiceNinjaClient.getClientById(clientId as string);
      res.status(200).json(clientDTO);
    } catch (error) {
      console.error(`Error fetching client with ID: ${clientId}`, error);
      if (error.response) {
        console.error(error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.error(error.request);
        res.status(500).json({ error: 'No response received from server' });
      } else {
        console.error('Error', error.message);
        res.status(500).json({ error: error.message });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
