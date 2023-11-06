import React from 'react';
import { Box, Card, CardBody, CardHeader, Container, Heading, StatGroup, useColorModeValue } from '@chakra-ui/react';
import CostStat from '../components/costs/CostStat';

const App = () => {
  return (
    <Container maxW="container.xl">
        <Card bg={useColorModeValue('gray.100', 'gray.900')} mb={6}>
            <CardHeader mb={6}>
                <Heading h={2}>LLM</Heading>
            </CardHeader>
            <CardBody>
                <StatGroup>
                <CostStat period="day" />
                <CostStat period="month" />
                <CostStat period="year" />
                </StatGroup>
            </CardBody>
        </Card>        
    </Container>
  );
};

export default App;
