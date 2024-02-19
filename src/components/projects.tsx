import { useRef } from 'react'

import styled from 'styled-components';
import { Slide } from 'react-awesome-reveal';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Project from './project';
import img1 from '../assets/images/lib/1.jpg'
import img2 from '../assets/images/lib/2.jpg'
import img3 from '../assets/images/lib/3.jpg'
import img4 from '../assets/images/lib/4.png'
import img5 from '../assets/images/lib/5.png'
import img6 from '../assets/images/lib/6.jpg'



const data = [
    {
        img: img6,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: img1,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: img2,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: img3,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: img4,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    {
        img: img5,
        disc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet iure rerum obcaecati et laborum earum!"
    },
    
];

const settings = {
    className: "center",
    centerMode: true,
    dots: false,
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
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                centerMode: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                centerMode: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false
            }
        }
    ]
};
const Projects = () => {
    const arrowRef = useRef<Slider | null>(null);


    return (
        <Container id='project'>
            <Slide direction="left">
                <h1>Library <span className="green">Photos</span></h1>
            </Slide>
            <Slide direction="right">
                <Slides  >
                    <SlideContainer>
                        <Slider ref={arrowRef} {...settings}>
                            {data.map((item, i) => (
                                <Project item={item} key={i} />
                            ))}
                        </Slider>
                        <Buttons>
                            <button
                                onClick={() => arrowRef.current && arrowRef.current.slickPrev()}
                                className='back'><IoIosArrowBack /></button>
                            <button
                                onClick={() => arrowRef.current && arrowRef.current.slickNext()}
                                className='next'><IoIosArrowForward /></button>
                        </Buttons>
                    </SlideContainer>
                </Slides>
            </Slide>

        </Container>
    )
}

export default Projects;
const SlideContainer = styled.div`
  position: relative;
`
const Container = styled.div`
    width: 80%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5rem 0;
    text-align: center;
    position: relative;
    @media(max-width: 840px){
        width: 90%;
    }
    h1{
        font-size: 1.9rem;
    }

    p{
        width: 28rem;
        margin: 0 auto;
        padding: 1rem 0;
        font-size: 0.9rem;
        @media(max-width : 500px){
            width: 90%;
        }
    }
    
`
const Buttons = styled.div`
  button{
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.100);
    cursor: pointer;
    color: #01be96;
    border: none;
    position: absolute;
    top: 45%;
    right: -1rem;
  }

  .back{
    left: -1rem;
  }
`

const Slides = styled.div``



// const Project = (props: { item: { img: string; disc: string } }) => {
//     const { img, disc } = props.item;
//     return (
//         <ProjectContainer className="project">
//             <img src={img} alt="project" />
//             <div className="disc">
//                 <h1>Description</h1>
//                 <p>
//                     {disc}
//                     <a href="#">demo</a>
//                 </p>
//             </div>
//         </ProjectContainer>
//     );
// };


// const ProjectContainer = styled.div`
//     height: 10rem;
//     background-color: #4e5156;
//     margin: 0 0.5rem;
//     padding: 0.5rem;
//     border-radius: 5px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 400ms ease-in-out;
//     }
//     .disc {
//         position: absolute;
//         right: 0;
//         left: 0;
//         bottom: -10rem;
//         text-align: left;
//         padding: 0.5rem;
//         background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
//         transition: all 400ms ease-in-out;
//         z-index:99;
//         h1 {
//             font-size: 1rem;
//         }

//         p {
//             width: 90%;
//             font-size: 0.8rem;
//             a {
//                 margin-left: 0.4rem;
//                 color: red;
//             }
//         }
//     }

//     :hover > img {
//         transform: scale(1.3);
//     }

//     :hover > .disc {
//         bottom: 0;
//     }
// `;