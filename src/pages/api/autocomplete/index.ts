// pages/api/convert-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { schemas, SchemaIdentifier } from '@/models/product'
import { convertTextToJson } from '@/server/parse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { text, schemaId } = req.body;

      if (typeof text !== 'string' || typeof schemaId !== 'string') {
        res.status(400).json({
          message: "Invalid input: 'text' and 'schemaId' must be strings.",
          inputText: text,
          schemaId: schemaId,
        });
        return;
      }

      const schema = schemas[schemaId as SchemaIdentifier];

      if (!schema) {
        res.status(400).json({
          message: `Schema with identifier '${schemaId}' not found.`,
          inputText: text,
          schemaId: schemaId,
        });
        return;
      }

      const jsonResponse = await convertTextToJson(text, schema);

      res.status(200).json({
        result: jsonResponse,
        inputText: text,
        schemaId: schemaId,
      });

    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An error occurred',
        inputText: req.body.text,
        schemaId: req.body.schemaId,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
