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
          <Button variant="contained" color="primary" component={Link} to={"/about"}>Learn More</Button>
        </div>
        <video autoPlay={true} loop={true} className="homepage--video">
          <source src={video} type="video/mp4"/>
        </video>
      </div>
      <div className="homepage--pitch">
        <h3>Why Choose Us?</h3>
        <section className="homepage--three">
          <article>
            <h4>Smart Technology</h4>
            <img></img>
            <p>Automatic detection for fraud alerts during exams</p>
          </article>
          <article>
            <h4>Easy & Secure</h4>
            <img></img>
            <p>Lorem ipsum osfkj dolor fjolo ablanka setha kewol.</p>
          </article>
          <article>
            <h4>Convenient For All</h4>
            <img></img>
            <p>Create and take exams from anywhere in the world</p>
          </article>
        </section>
      </div>
    </div>
  );
}