import { Container, Grid, Paper } from '@mui/material';
import * as React from 'react';
import Chart from 'src/components/dashboard/Chart';
import Deposits from 'src/components/dashboard/Deposits';
import Orders from 'src/components/dashboard/Orders';
import Layout from 'pages/_layout';

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={1} md={2} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          <Grid item xs={11} md={10} lg={9}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item lg={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </Layout>
  );
}
