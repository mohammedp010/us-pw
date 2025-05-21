import React, { useState } from 'react';
import { Paper, Text, Button, TextInput } from '@mantine/core';
import { toast } from 'sonner';

function DataIngestion({ onSuccess, fileName: initialFileName }) {
  const [fileName, setFileName] = useState(initialFileName || '');
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8000';

  React.useEffect(() => {
    if (initialFileName) setFileName(initialFileName);
  }, [initialFileName]);

  const handleIngest = async () => {
    if (!fileName) return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/upload?file_name=${encodeURIComponent(fileName)}`, {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Data ingested successfully!');
        onSuccess();
      } else {
        toast.error('Failed to ingest data.');
      }
    } catch (error) {
      toast.error('Ingestion failed.');
      console.error('Ingestion failed:', error);
    } finally {
      setLoading(false);
    }
  };
console.log('fileName', fileName);
  return (
    <Paper p="md">
      <Text size="sm" mb="md">Enter the name of the file to ingest into the database</Text>
      <TextInput
        placeholder="File name"
        value={fileName}
        onChange={(event) => setFileName(event.currentTarget.value)}
        mb="md"
      />
      
      <Button 
        onClick={handleIngest}
        loading={loading}
        disabled={!fileName}
        fullWidth
      >
        Ingest Data
      </Button>
    </Paper>
  );
}

export default DataIngestion;