import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import video from '../media/girl-laptop-pexels.mp4';
import './Home.scss';

export default function Home() {
  return (
    <div className="homepage">
      <div className="homepage--top">
        <div className="homepage--text">
          {/* <h1>"Name of App" </h1> */}
          <h1>Take exams from the comfort of your own home</h1>
          <h2>Proctored exams powered by machine learning</h2>
          <Button variant="contained" color="primary" size="large" component={Link} to={"/about"}>Learn More</Button>
        </div>
        {/* Source: https://www.pexels.com/video/a-woman-working-on-a-laptop-in-a-couch-4492795/ */}
        <video autoPlay={true} loop={true} className="homepage--video">
          <source src={video} type="video/mp4"/>
        </video>
      </div>
      <div className="homepage--pitch">
        <h2>Why Choose Us?</h2>
        <section className="homepage--three">
          <article>
            <h3>Smart Technology</h3>
            <img></img>
            <div className="homepage--emoji">🤖</div>
            <p>Automatic detection for fraud alerts and warnings during exams</p>
          </article>
          <article>
            <h3>Easy & Secure</h3>
            <img></img>
            <div className="homepage--emoji">🔒</div>
            <p>Authenticate directly on the browser without external applications</p>
          </article>
          <article>
            <h3>Convenient For All</h3>
            <img></img>
            <div className="homepage--emoji">😃</div>
            <p>Create and take exams from anywhere in the world...on your terms!</p>
          </article>
        </section>
      </div>
    </div>
  );
}