import React, { useState } from 'react';
import { Paper, Text, NumberInput, Select, Tabs, Table } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function DataVisualization() {
  const [topN, setTopN] = useState(10);
  const [selectedState, setSelectedState] = useState('AL');

  const BASE_URL = 'http://localhost:8000';

  const { data: plants = [], isLoading } = useQuery(
    ['plants', topN, selectedState],
    async () => {
      const params = new URLSearchParams({
        top_n: topN,
        ...(selectedState && { state: selectedState }),
      });
      const response = await fetch(BASE_URL+`/plants/top?${params}`);
      if (!response.ok) {
        toast.error('Failed to fetch plant data.');
      }
      return response.json();
    }
  );

  return (
    <Paper p="md">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
        <NumberInput
          label="Top N Plants"
          value={topN}
          onChange={(val) => {
            if (typeof val !== 'number' || isNaN(val) || val < 1) {
              setTopN(1);
            } else {
              setTopN(val);
            }
          }}
          min={1}
          max={100}
          style={{ flex: 1 }}
          allowEmpty={false}
          clampOnBlur
        />
        <Select
          label="Select State"
          placeholder="All States"
          value={selectedState}
          onChange={setSelectedState}
          data={states.map(state => ({ value: state, label: state }))}
          style={{ flex: 1 }}
        />
      </div>

      <Tabs defaultValue="table">
        <Tabs.List>
          <Tabs.Tab value="table">Table View</Tabs.Tab>
          <Tabs.Tab value="chart">Chart View</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="table" pt="xs">
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  {/* <th>Id</th> */}
                  <th style={{ textAlign: 'left' }}>Plant Name</th>
                  <th style={{ textAlign: 'left' }}>State</th>
                  <th style={{ textAlign: 'left' }}>Net Generation (MWh)</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant.id}>
                    <td style={{ textAlign: 'left' }}>{plant.plant_name}</td>
                    <td style={{ textAlign: 'left' }}>{plant.state}</td>
                    <td style={{ textAlign: 'left' }}>{plant.net_generation_mwh.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="chart" pt="xs">
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={plants}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="net_generation_mwh" fill="#339af0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}

export default DataVisualization;