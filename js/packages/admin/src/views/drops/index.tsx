import * as React from 'react';
import { Container } from '@mui/material';
import DropForm from 'src/views/drops/DropForm';

export default () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }} >
            <DropForm/>
        </Container>
    )
}
