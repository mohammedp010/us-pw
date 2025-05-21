import React, { useState } from 'react';
import { Paper, Text, Group, Button, FileInput } from '@mantine/core';
import { toast } from 'sonner';

function FileUpload({ onSuccess, onFileUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://localhost:8000';

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(BASE_URL+'/upload-to-minio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('File uploaded successfully!');
        if (onFileUploaded && file?.name) {
          onFileUploaded(file.name);
        }
        onSuccess();
      } else {
        toast.error('Failed to upload file.');
      }
    } catch (error) {
      toast.error('Upload failed.');
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper p="md">
      <Text size="sm" mb="md">Upload your power plant data file (CSV format)</Text>
      
      <Group>
        <FileInput
          placeholder="Choose file"
          accept=".csv"
          value={file}
          onChange={setFile}
          style={{ flex: 1 }}
        />
        <Button 
          onClick={handleUpload}
          loading={loading}
          disabled={!file}
        >
          Upload
        </Button>
      </Group>
    </Paper>
  );
}

export default FileUpload;