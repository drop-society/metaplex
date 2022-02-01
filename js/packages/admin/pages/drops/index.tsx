import * as React from 'react';
import Layout from "pages/_layout"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Grid, Link, Paper } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'eventName',
    headerName: 'Event Name',
    width: 150,
  },
  {
    field: 'venue',
    headerName: 'Venue',
  },
  {
    field: 'date',
    headerName: 'date',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'sold',
    headerName: 'Tickets Sold',
  },
];

const rows = [
  { id: 1, eventName: 'Seahawks vs Patriots', venue: 'Lumen Field', date: '02-23-2022', status: 'in-progress', sold: 0},
  { id: 2, eventName: 'Big Sean', venue: 'Madison Square Garden', date: '02-24-2022', status: 'published', sold: 1000},
];

export default () => {
    return (
        <Layout>
            <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }} >
                <Grid container spacing={3}>
                    <Grid lg={12}>
                      <Paper sx={{
                            p: 2,
                            marginBottom: 2,
                        }}>
                        <Link href="/drops/new" sx={{textDecoration: "none"}}>
                          <Button variant="outlined" sx={{marginBottom: 2}}>Create New Drop</Button>
                        </Link>
                        <div style={{ height: 520, width: '100%' }}>
                          <DataGrid
                              rows={rows}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              checkboxSelection
                              disableSelectionOnClick />
                        </div>
                      </Paper>
                    </Grid>
                </Grid>

            </Container>
        </Layout>
    )
}