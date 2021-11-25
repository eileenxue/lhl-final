import video from '../media/girl-laptop-pexels.mp4';
import './Home.scss';

export default function Home() {
  return (
    <div className="homepage">
      <h1>"Name of App" </h1>
      <h2>Take exams from the comfort of your own home</h2>
      <h3>Proctored exams powered by machine learning</h3>
      <h4>Struggles of copywriting</h4>
      <h5>...our app is cool. Just use it.</h5>
      <video autoPlay={true} loop={true} className="homepage--video">
        <source src={video} type="video/mp4"/>
      </video>
    </div>


  );
}