import React, { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const Logout = () => {
    useEffect(() => {
        // logging out the user after some wait
        setTimeout(() => {
            localStorage.removeItem('profile');
            window.location.href = process.env.REACT_APP_FRONTEND_URL;
        }, 2000);
    }, []);

    return (
        <Box style={{ margin: '4em' }}>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3} mt={4}>
                <Typography variant="h4">Signing you out...</Typography>
                <LinearProgress color="secondary" />
            </Stack>
        </Box>
    );
};

export default Logout;
