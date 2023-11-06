// pages/index.tsx

import { Container, List, ListItem, Heading, Text, useColorModeValue, Card, CardHeader, CardBody } from '@chakra-ui/react';
import useSWR from 'swr';
import React from 'react';
import InvoiceLineItem from '@/components/invoices/InvoiceLineItem';
import CreateInvoiceAI from '@/components/invoices/CreateInvoiceAI/CreateInvoiceAI';
import InvoiceApp from '@/components/invoices/CreateInvoiceAI/Container';


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomePage: React.FC = (colors) => {
  const { data: invoices, error } = useSWR('/api/invoices', fetcher);

  if (error) return <div>Failed to load invoices</div>;
  if (!invoices) return <div>Loading...</div>;
  
  return (
    <Container maxW="container.xl" bg={colors}>
        <Card bg={colors} mb={6}>
            <CardHeader mb={6}>
                <Heading h={1}>Create Invoice</Heading>
            </CardHeader>
            <CardBody>
                <InvoiceApp />
            </CardBody>
        </Card>

        <Card bg={colors}>
            <CardHeader mb={6}>
                <Heading h={1}>Invoices</Heading>
            </CardHeader>
            <CardBody>
                <List spacing={3}>
                    {invoices.map((invoice) => (
                    <ListItem key={invoice.id} p={5} shadow="md" borderWidth="1px">
                        <Heading as="h3" size="md">{invoice.number}</Heading>
                        <Text>Date: {invoice.date}</Text>
                        <Text>Amount: {invoice.amount}</Text>
                        {
                            invoice.lineItems.map((line, index) => (
                                <InvoiceLineItem key={index} line={line} />
                            ))
                        }
                    </ListItem>
                    ))}
                </List>
            </CardBody>
        </Card>
    </Container>
  );
};

export default HomePage;
