import { FaRegNewspaper } from "react-icons/fa";
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import styled from "styled-components";
import Card from "./Card";
import { Fade, Slide } from "react-awesome-reveal";

const Services = () => {
  return (
    <Container id="service">
      <Slide direction="down">
        <h4>
          Our<span className="green"> Services</span>
        </h4>
        <h1>What We Have</h1>
      </Slide>
      <Cards>
        <Slide direction="left">
          <Card
            Icon={FaRegNewspaper}
            title={"Multiple News Papers"}
            disc={`Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?`}
            className={"#47ec71"}
          />
        </Slide>
        <Fade >
          <Card
            Icon={FaGlassWaterDroplet}
            title={"Miniral Water"}
            disc={`Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?`}
                className={"#546de9"}
          />
        </Fade>
        <Slide direction="right">
          <Card
            Icon={CgWebsite}
            title={"Wifi"}
            disc={`Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?`}
                className={"#e054e8"}
          />
        </Slide>
        <Slide direction="left">
          <Card
            Icon={CgWebsite}
            title={"Air Conditionar"}
            disc={`Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Commodi et asperiores cum exercitationem officia rem amet minus magnam? Cum, voluptatem?`}
                className={"#e8bd54"}
          />
        </Slide>
      </Cards>
    </Container>
  );
};

export default Services;

const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0;
  @media (max-width: 840px) {
    width: 90%;
  }

  h1 {
    padding-top: 1rem;
  }
`;
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 4rem;
  gap: 1rem;
`;
