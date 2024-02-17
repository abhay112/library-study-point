import { useSelector } from "react-redux";
import { useAllStudentsQuery } from "../redux/api/studentAPI";
import { RootState } from "../redux/store";
import bgimg from '../assets/bg-img.png'

const Home = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id || "";
  const { data, isLoading, isError } = useAllStudentsQuery(userId);
  console.log(data, isLoading, isError);

  return (
    <div className="home">
      <section className="banner">
        <div className="page-wrapper">
          <div className="left-section">
            <h1>Study Point Library</h1>
            <div>
              <p>The Ultimate Place To Ace
                your Dreams</p>
              <div className="btns">
                <button className="join-button">Join Now</button>
                <button>Query</button>
              </div>
            </div>
          </div>
          <div className="right-section">
            <img src={bgimg} />
          </div>
        </div>

      </section>
      <section className="">

      </section>

    </div>
  );
};

export default Home;
