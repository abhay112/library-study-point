import { useSelector } from "react-redux";
import { useAllStudentsQuery } from "../redux/api/studentAPI";
import { RootState } from "../redux/store";
import { lazy } from "react";
import ImageGalleryComponent from "../components/image-gallery-cmp";
import Services from "../components/Service/Services";
import ProfComponent from "../components/ProfComponent";
import Footer from "../components/Footer";

const SliderComponent = lazy(() => import("../components/slider-component"));

const Home = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id || "";
  const { data, isLoading, isError } = useAllStudentsQuery(userId);
  console.log(data, isLoading, isError);

  return (
    <main className="landing-page">
      <div className="section-01">
        <div className="page-wrapper">
          <div className="landing-page-container">
            <div>
              <ProfComponent />
            </div>
          </div>
        </div>
      </div>
      <div className="section-02">
        <div className="page-wrapper">
          <Services />
        </div>
      </div>
      <div className="section-03">
        <div className="page-wrapper">
          <ImageGalleryComponent />
        </div>
      </div>
      <div className="section-04">
        <div className="page-wrapper">
          <SliderComponent />
        </div>

      </div>
      <div className="section-05">
        <div className="page-wrapper">
          <Footer />
        </div>
      </div>
    </main>
  );
};


export default Home;
