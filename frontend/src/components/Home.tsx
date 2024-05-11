import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import MyFollowUp from './MyFollowUp';

const Home = () => {
    return (
        <Container>

            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
                    General Stats
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid container xs={6} md={6} spacing={1} style={{ padding: "10px", textAlign: 'center' }}>
                            <Grid item xs={12}>
                                <Card><CardContent>
                                    <Typography>TOTAL in EECFIN</Typography>
                                    <Typography variant='h5'>159</Typography>
                                </CardContent></Card>
                            </Grid>

                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Members
                                        <Typography variant='body1' fontWeight='bold'>103</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Regulars
                                        <Typography variant='body1' fontWeight='bold'>16</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Visitors
                                        <Typography variant='body1' fontWeight='bold'>10</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Remote
                                        <Typography variant='body1' fontWeight='bold'>30</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container xs={6} md={6} spacing={1} style={{ padding: "10px", textAlign: 'center' }}>
                            <Grid item xs={12}>
                                <Card><CardContent>
                                    UNDER MY CARE
                                    <Typography variant='h5'>48</Typography>
                                </CardContent></Card>
                            </Grid>

                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Members
                                        <Typography variant='body1' fontWeight='bold'>25</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Regulars
                                        <Typography variant='body1' fontWeight='bold'>5</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Visitors
                                        <Typography variant='body1' fontWeight='bold'>3</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card>
                                    <CardContent>
                                        Remote
                                        <Typography variant='body1' fontWeight='bold'>15</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>


            <Accordion>
                <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
                    Recent Activities
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid container xs={6} md={6} spacing={1} style={{ padding: "10px", textAlign: 'center' }}>
                            <h3>Your recent activity</h3>
                            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" className='summary-week-header'>This week</Typography>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Typography>Total<br /> contacted</Typography>
                                            <Typography> 7</Typography>
                                        </Grid>
                                        <Grid container spacing={2} xs={9}>
                                            <Grid item xs={4}>
                                                <Typography>4 <br />Phone calls</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>2 <br />Text messages</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>1 <br />Face to face</Typography>
                                            </Grid>
                                            <Grid xs={12}><Divider></Divider></Grid>
                                            <Grid item xs={3}>
                                                <Typography>3</Typography>
                                                <Typography>Members</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Regulars</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Visitors</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>2</Typography>
                                                <Typography>Remote</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" className='summary-week-header'>Last week</Typography>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Typography>Total<br /> contacted</Typography>
                                            <Typography> 13</Typography>
                                        </Grid>
                                        <Grid container spacing={2} xs={9}>
                                            <Grid item xs={4}>
                                                <Typography>8 <br />Phone calls</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>2 <br />Text messages</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>1 <br />Face to face</Typography>
                                            </Grid>
                                            <Grid xs={12}><Divider></Divider></Grid>
                                            <Grid item xs={3}>
                                                <Typography>9</Typography>
                                                <Typography>Members</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Regulars</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Visitors</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>2</Typography>
                                                <Typography>Remote</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid container xs={6} md={6} spacing={1} style={{ padding: "10px", textAlign: 'center' }}>
                            <h3>Elders' activity</h3>
                            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" className='summary-week-header'>This week</Typography>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Typography>Total<br /> contacted</Typography>
                                            <Typography> 35</Typography>
                                        </Grid>
                                        <Grid container spacing={2} xs={9}>
                                            <Grid item xs={4}>
                                                <Typography>24 <br />Phone calls</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>12 <br />Text messages</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>1 <br />Face to face</Typography>
                                            </Grid>
                                            <Grid xs={12}><Divider></Divider></Grid>
                                            <Grid item xs={3}>
                                                <Typography>30</Typography>
                                                <Typography>Members</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Regulars</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Visitors</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>2</Typography>
                                                <Typography>Remote</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card variant="outlined" style={{ marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" className='summary-week-header'>Last week</Typography>
                                    <br />
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                            <Typography>Total<br /> contacted</Typography>
                                            <Typography> 36</Typography>
                                        </Grid>
                                        <Grid container spacing={2} xs={9}>
                                            <Grid item xs={4}>
                                                <Typography>22 <br />Phone calls</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>8 <br />Text messages</Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography>6 <br />Face to face</Typography>
                                            </Grid>
                                            <Grid xs={12}><Divider></Divider></Grid>
                                            <Grid item xs={3}>
                                                <Typography>25</Typography>
                                                <Typography>Members</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>5</Typography>
                                                <Typography>Regulars</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>1</Typography>
                                                <Typography>Visitors</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography>2</Typography>
                                                <Typography>Remote</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Grid>
                <Grid>
                    <h3>Members under my care</h3>
                    <MyFollowUp />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
