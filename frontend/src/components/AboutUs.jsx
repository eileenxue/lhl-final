import React from 'react'
import './AboutUs.scss';
import eileenPic from '../media/profile-images/eileen-xue.jpg';
import yanbinPic from '../media/profile-images/yanbin-yuan.jpg';
import royaPic from '../media/profile-images/roya-chobineh.jpg';

import reactLogo from '../media/tech-stack/react-logo.png';
import sassLogo from '../media/tech-stack/sass-logo.png';
import materialuiLogo from '../media/tech-stack/materialui-logo.png';
import nodejsLogo from '../media/tech-stack/nodejs-logo.png';
import expressLogo from '../media/tech-stack/expressjs-logo.png';
import postgresqlLogo from '../media/tech-stack/postgresql-logo.png';
import tensorflowLogo from '../media/tech-stack/tensorflowjs-logo.png';
import socketioLogo from '../media/tech-stack/socketio-logo.jpg';
 

export default function AboutUs() {
  return (
    <div className="about">
      <div className="about--title">
        <h1>About Us</h1>
        <p className="hide-me about--secret">AKA The Coolest Team Ever 🎉</p>
      </div>
      <div className="about--wrapper">
        <section className="about--profiles">
        <article>
            <div className="about--profile-pic">
              <img src={eileenPic} alt="Eileen Xue"/>
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
          <article>
            <div className="about--profile-pic">
              <img src={yanbinPic} alt="YanBin Yuan"/>
            </div>
            <div className="about--profile-blurb">
              <h2>YanBin Yuan</h2>
              <ul>
                <li><strong>🎓 Education:</strong> Master of Human Kinetics at University of Ottawa, IBM Data Science Certificate</li>
                <li><strong>⭐️ Background:</strong> 7 years in High-Performance Sports Industry (Program Management & Data Analysis) </li>
                <li><strong>♥️ Passions:</strong> Help people’s life gets easier and happier </li>
              </ul>
            </div>
          </article>
          <article>
            <div className="about--profile-pic">
              <img src={royaPic} alt="Roya Chobineh"/>
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
        </section>
        <section className="about--tech">
          <h2>Technology Stack</h2>
          {/* Show icons here: React, Node, PSQL, SASS, Material UI, and what else? */}
          <div className="logo-wrapper">
            <img src={reactLogo} alt="React logo"/>
            <img src={sassLogo} alt="Sass logo"/>
            <img src={materialuiLogo} alt="MaterialUI logo"/>
            <img src={nodejsLogo} alt="NodeJS logo"/>
            <img src={expressLogo} alt="ExpressJS logo"/>
            <img src={postgresqlLogo} alt="PostgreSQL logo"/>
            <img src={tensorflowLogo} alt="TensorflowJS logo"/>
            <img src={socketioLogo} alt="SocketIO logo"/>
          </div>
        </section>
      </div>
    </div>
  )
}
