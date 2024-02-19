import React, { useRef } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
// import ClientSlider from './ClientSlider';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Slide } from 'react-awesome-reveal';
import { IoIosQuote } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";

interface ClientSliderProps {
    item: {
        name: string;
        position: string;
        img_url: string;
        stars: number;
        disc: string;
    };
}
const clients = [
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 3,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 4,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 5,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
    {
        name: "John Michel",
        position: "web developer",
        img_url: "https://t4.ftcdn.net/jpg/02/90/27/39/360_F_290273933_ukYZjDv8nqgpOBcBUo5CQyFcxAzYlZRW.jpg",
        stars: 5,
        disc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Temporibus consequuntur dolores labore natus similique nemo doloribus cum accusantium adipisci maiores.`
    },
]
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
        {
            breakpoint: 990,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 530,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

const Clients = () => {
    // const arrowRef = useRef(null);
    const arrowRef = useRef<Slider | null>(null);

    return (
        <Container id='client'>
            <Slide direction="left">
                <span className="green">testimonials</span>
                <h1>what Student's say</h1>
            </Slide>
            <Slide direction="right">
            <Testimonials>
                <Slider ref={arrowRef} {...settings}>
                    {clients.map((item, i) => (
                        <ClientSlider item={item} key={i} />
                    ))}
                </Slider>
                <Buttons>
                    <button
                        onClick={() => arrowRef.current && arrowRef.current.slickPrev()}
                    >
                        <IoIosArrowBack />
                    </button>
                    <button
                        onClick={() => arrowRef.current && arrowRef.current.slickNext()}
                    >
                        <IoIosArrowForward />
                    </button>
                </Buttons>
            </Testimonials>
            </Slide>
        </Container>
    )
}

export default Clients


const ClientSlider: React.FC<ClientSliderProps> = ({ item }) => {
    const { name, position, img_url, stars, disc } = item;
    return (
        <Container1>
            <Header>
                <span className='quote'><IoIosQuote /></span>
                <div>
                    {Array(stars).fill(undefined).map((_, i) => (
                        <span className='star' key={i}>
                            <AiOutlineStar />
                        </span>
                    ))}
                </div>
            </Header>
            <Body>
                {disc}
            </Body>
            <Footer>
                <img src={img_url} alt={name} />
                <div className="details">
                    <h1>{name}</h1>
                    <p>{position}</p>
                </div>
            </Footer>
        </Container1>
    )
}

const Container = styled.div`
    width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 4rem 0;

    @media(max-width:840px){
        width: 90%;
    }

    span{
        font-weight: 700;
        text-transform: uppercase;
    }

    h1{
        padding-top: 1rem;
        text-transform: capitalize;
    }

    .slick-list, .slick-slider, .slick-track{
        padding: 0;
    }

    .slick-dots{
        text-align: left;
        margin-left: 1rem;
    }

    .slick-dots li button:before{
        content: "";
    }

    .slick-dots li button{
        width: 9px;
        height: 4px;
        background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
        padding: 0.1rem;
        margin-top: 1rem;
        transition: all 400ms ease-in-out;
        border-radius: 50px;
    }
    
    .slick-dots li.slick-active button{
        background: #01be96;
        width: 15px;
    }

    .slick-dots li{
        margin: 0;
    }
`

const Testimonials = styled.div`
    margin-top: 2rem;
    position: relative;
`
const Buttons = styled.div`
    position: absolute;
    right: 0.7rem;
    bottom: -2.5rem;

    button{
        background-color: transparent;
        margin-left: 0.5rem;
        border: none;
        color: #01be96;
        cursor: pointer;
        font-size: 1.5rem;
    }

    @media(max-width:530px){
        display: none;
    }
`
const Container1 = styled.div`
    background: #ffffff;
    padding: 1.5rem 1rem;
    margin: 0 1rem;
    border-radius:10px;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    .quote{
        font-size: 3rem;
        color: #01be96;
        opacity: 0.7;
    }

    .star{
        color: #ffcd3c;
        font-size: 1.3rem;
    }
`
const Body = styled.p`
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    color:black;
`
const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    img{
        width: 4rem;
        height: 4rem;
        border-radius: 50px;
        object-fit: cover;
    }

    h1{
        font-size: 1.2rem;
        font-weight: 700;
        @media(max-width: 580px){
            font-size: 1rem;
        }
        @media(max-width: 538px){
            font-size: 0.9rem;
        }
    }

    p{
        font-size: 0.8rem;
        color: red;

        @media(max-width: 538px){
            font-size: 0.6rem;
        }
    }
`