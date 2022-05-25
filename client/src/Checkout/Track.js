import React, { useState, useEffect, useRef } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import axios from 'axios';

const Track = () => {
    // Getting details of the user
    const userData = JSON.parse(localStorage.getItem('profile'));
    let Cid = userData ? userData.uid + 2000 : 2001;
    const trackImageUrl =
        'https://images.unsplash.com/photo-1449247666642-264389f5f5b1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2hpcHBpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=600';
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/cart/get-cart`, {
                cid: Cid,
            })
            .then((res) => {
                console.log('hi cart items found', res.data);
                setCartItems(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Box sx={{ width: '90%', margin: '5em', paddingTop: '3em' }}>
            <Grid container>
                <Grid item sm={6} style={{ margin: '2em' }}>
                    <h2>Tracking Order: #{Cid}</h2>
                    <LinearProgress
                        variant="buffer"
                        value={progress}
                        valueBuffer={buffer}
                        style={{ margin: '0.2em' }}
                    />
                    <img
                        className="card-img-top bg-dark cover"
                        widht="100"
                        height="300"
                        alt=""
                        src={trackImageUrl}
                    />
                </Grid>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid
                        item
                        sm={5}
                        style={{
                            border: '1px solid purple',
                            boxSizing: 'border-box',
                            borderRadius: '25px',
                            borderStyle: 'dashed',
                            paddingTop: '2em',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{ padding: 'auto', alignContent: 'center' }}>
                            Progress
                        </h3>
                        <Timeline position="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="success" />

                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Order Placed</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="success" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Packed</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        color="secondary"
                                    />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Shipped to: </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" />
                                </TimelineSeparator>
                                <TimelineContent>
                                    Delivered to: 36-A, D-Block, Juhu, Mumbai
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                        <h6 style={{ margin: '2em', fontStyle: 'italic' }}>
                            Return Address: Industrial Trolley in Mumbai, A
                            Wing/A.K. Industrial Estate, Off. Veer Savarkar
                            Flyover Bridge, Goregaon (W), Mumbai, Maharashtra
                            400062
                        </h6>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Track;
