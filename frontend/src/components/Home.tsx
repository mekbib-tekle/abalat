import Container from '@mui/material/Container';

const Home = () => {
    return (
        <Container>
            <h1>Welcome</h1>
            <h3>Dashboard: last week's activity </h3>
            <p>(You have 25 members under your care: 12 members, 5 regulars, 4 visitors, 3 remote)</p>
            <p>(You contacted 7 members last week, 4 phone calls, 2 text messages, 1 face to face)</p>

            <br></br>
            <h3>Members under my care</h3>
            <p>List of members for follow up</p>
        </Container>
    );
  };
  
  export default Home;