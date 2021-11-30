import React from 'react'
import './AboutUs.scss';
import eileenPic from '../media/profile-images/eileen-xue.jpg';

export default function AboutUs() {
  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about--wrapper">
        <section className="about--profiles">
          <article>
            <div className="about--profile-pic">
              Face Image
            </div>
            <div className="about--profile-blurb">
              <h2>YanBin Yuan</h2>
              <ul>
                <li><strong>🎓 Education:</strong> Master of Human Kinetics at University of Ottawa, IBM Data Science Certificate</li>
                <li><strong>⭐️ Background:</strong> 7 years in High-Performance Sport Industry (Program Management & Data Analysis) </li>
                <li><strong>♥️ Passions:</strong> Help people’s life gets easier and happier </li>
              </ul>
            </div>
          </article>
          <article>
            <div className="about--profile-pic">
              Face Image
            </div>
            <div className="about--profile-blurb">
              <h2>Roya Chobineh</h2>
              <ul>
                <li><strong>🎓 Education:</strong> Bachelor's Degree in Polymer Engineering, Data Science Diploma</li>
                <li><strong>⭐️ Background:</strong>  Data Scientist and Polymer Engineer</li>
                <li><strong>♥️ Passions:</strong>  Coding, Problem-Solving</li>
              </ul>
            </div>
          </article>
          <article>
            <div className="about--profile-pic">
              <img src={eileenPic}></img>
            </div>
            <div className="about--profile-blurb">
              <h2>Eileen Xue</h2>
              <ul>
                <li>🎓 <strong>Education:</strong> Master of Digital Media (MDM), Interactive Media Design Diploma, BSc (Psychology) </li>
                <li>⭐️ <strong>Background:</strong> Multimedia Developer and Researcher</li>
                <li>♥️ <strong>Passions:</strong> Emerging Technologies (AR/VR), Digital Accessibility, Travelling and Food</li>
              </ul>
            </div>
          </article>
        </section>
        <section>
          <h2>Tech Stack</h2>
          Show icons here: React, Node, PSQL, SASS, Material UI, and what else?
        </section>
      </div>
    </div>
  )
}
