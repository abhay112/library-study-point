import styled from 'styled-components';

const Project = (props: { item: { img: string; disc: string } }) => {
    const { img } = props.item;
    return (
        <Container className="project">
            <img src={img} alt="project" />
        </Container>
    );
};


const Container = styled.div`
    height: 10rem;
    background-color: #4e5156;
    margin: 0 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 400ms ease-in-out;
    }

    :hover > img {
        transform: scale(1.3);
    }

    :hover > .disc {
        bottom: 0;
    }
`;

export default Project