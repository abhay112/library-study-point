import img from '../assets/images/new_home_end2end_img1.svg'
const FeaturesSection = () => {
  return (
    <div className="new_home_end2end_sec" id="Features_sec">
      <div className="new_home_end2end_cont">
        <h2>
          <span>Tunningo Blueprint </span>
          for Accelerating Your Library
        </h2>
        <div className="new_home_end2end_wrapper">
          {/* Card 1 */}
          <div className="new_home_end2end_card">
            <div className="new_home_end2end_left">
              <h3>
                <span>1.</span> Structured Industry-vetted Curriculum
              </h3>
              <div className="new_home_end2end_content_wrap">
                <p>
                  Instructors have a great level of clarity and it's easy to
                  understand any concept. The curriculum is structured and the
                  level of questions is also very good.
                </p>
              </div>
             
            </div>
            <div className="new_home_end2end_right">
              <img
                className="end2endimg"
                src={img}
                alt="Curriculum Illustration"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="new_home_end2end_card reverse card2" style={{ flexDirection: 'row-reverse' }}>
            <div className="new_home_end2end_left reverse">
              <h3>
                <span>2.</span> 1:1 Mentorship from Industry experts
              </h3>
              <div className="new_home_end2end_content_wrap">
                <p>
                  Being a student in Bosscoder Academy, I overcame many problem
                  solving issues in a smooth way. 1:1 mentorship with mock
                  interviews gives me confidence to solve more and more problems.
                </p>
              </div>
             
            </div>
            <div className="new_home_end2end_right">
              <img
                className="end2endimg"
                src={img}
                alt="Mentorship Illustration"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="new_home_end2end_card">
            <div className="new_home_end2end_left">
              <h3>
                <span>1.</span> Structured Industry-vetted Curriculum
              </h3>
              <div className="new_home_end2end_content_wrap">
                <p>
                  Instructors have a great level of clarity and it's easy to
                  understand any concept. The curriculum is structured and the
                  level of questions is also very good.
                </p>
              </div>
          
            </div>
            <div className="new_home_end2end_right">
              <img
                className="end2endimg"
                src={img}
                alt="Curriculum Illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
