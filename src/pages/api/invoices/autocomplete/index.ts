// pages/api/clients/index.ts (create a new file or adjust your existing endpoint)

import { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

import { InvoiceDTO } from '@/models/DTO/invoice';
import { InvoiceDTOSchema } from '@/models/DTO/invoice';
import { convertTextToJson } from '@/server/parse';
import { ClientDTOSchema, ClientDTO } from '@/models/DTO/client';
import InvoiceNinjaClient from '@/server/invoice/InvoiceNinjaClient';

const invoiceNinjaClient = new InvoiceNinjaClient(process.env.INVOICE_API_KEY || '');

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  if (method === 'GET') {
    const { text } = query;
    try {
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        let invoice = await convertTextToJson(text, InvoiceDTOSchema);
        invoice.jsonContent.number = `INV-${currentYear}${("0" + month).slice(-2)}00`;
        invoice.jsonContent.date = new Date().toISOString().split('T')[0];
        invoice.jsonContent.dueDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
        invoice.jsonContent.clientId = await getClient(text);
        res.status(200).json(invoice);
    } catch (error) {
      console.error('Failed to fetch clients with DTO', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

async function getClient(text:string) : Promise<ClientDTO> {
  const clientDTOs: ClientDTO[] = await invoiceNinjaClient.getAllClients();
  const client = await convertTextToJson(text + '\n' + JSON.stringify(clientDTOs), ClientDTOSchema);
  return client.id;
}