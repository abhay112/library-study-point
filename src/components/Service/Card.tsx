import React from 'react'
import styled from 'styled-components';
interface CardProps {
    Icon: React.ElementType;
    disc: string;
    title: string;
    className:string;
}
const Card: React.FC<CardProps> = (props) => {
    const { Icon, disc, title,className } = props;
  return (
    <Container>
       <span style={{ color: className }}><Icon/></span>
        <h1>{title}</h1>
        <p>{disc}</p>
    </Container>
  )
}

export default Card;

const Container = styled.div`
    width: 100%;
    background: white;
    border-radius:10px;
    padding: 1rem;
    text-align: center;
    span{
        font-size: 4rem;
    }
    
    h1{
        font-size: 1.2rem;
        padding-bottom: 1rem;
        color:black;
    }

    p{
        font-size: 0.8rem;
    }
`