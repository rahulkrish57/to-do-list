import React from "react";
import { Alert, Container } from "reactstrap";
import HomeComp from "../components/home/HomeComp";

const Home: React.FC = () => {
    return (
    <div className="home">
      <Container className="container">     
        <HomeComp />
      </Container>
    </div>
  );
};

export default Home;
