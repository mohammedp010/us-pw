import React, { useState } from 'react';
import { MantineProvider, Stepper, Button, Container, Paper, Title } from '@mantine/core';
import FileUpload from './components/FileUpload';
import DataIngestion from './components/DataIngestion';
import DataVisualization from './components/DataVisualization';
import { Toaster } from 'sonner';

function App() {
  const [active, setActive] = useState(0);
  const [fileName, setFileName] = useState('');

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <MantineProvider>
      <Toaster position="top-center"/>
      <Container size="lg" py="xl">
        <Paper shadow="sm" p="xl" radius="md">
          <Title order={2} mb="xl" ta="center">Power Plant Data Management</Title>
          
          <Stepper active={active} onStepClick={setActive} mb="xl">
            <Stepper.Step label="Upload File" description="Upload to MinIO">
              <FileUpload onSuccess={nextStep} onFileUploaded={setFileName} />
            </Stepper.Step>
            
            <Stepper.Step label="Ingest Data" description="Process to Database">
              <DataIngestion onSuccess={nextStep} fileName={fileName} />
            </Stepper.Step>
            
            <Stepper.Step label="Visualize Data" description="View Top Plants">
              <DataVisualization />
            </Stepper.Step>
          </Stepper>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Button variant="default" onClick={prevStep} disabled={active === 0}>
              Back
            </Button>
            <Button onClick={nextStep} disabled={active === 2}>
              Next
            </Button>
          </div>
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default App;