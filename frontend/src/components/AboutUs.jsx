import React from 'react'
import './AboutUs.scss';

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
              <h2>Name Here</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices, 
                lorem sit amet sollicitudin fermentum, sem libero iaculis nisl, placerat condimentum 
                dui magna ac leo. Quisque in sem a nisl elementum pretium. Sed lobortis interdum metus, 
                quis placerat purus rutrum eget. Quisque id dui vitae tellus facilisis tempus. 
                Nam lobortis scelerisque neque vitae rhoncus. </p>
            </div>
          </article>
          <article>
            <div className="about--profile-pic">
              Face Image
            </div>
            <div className="about--profile-blurb">
              <h2>Name Here</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices, 
                lorem sit amet sollicitudin fermentum, sem libero iaculis nisl, placerat condimentum 
                dui magna ac leo. Quisque in sem a nisl elementum pretium. Sed lobortis interdum metus, 
                quis placerat purus rutrum eget. Quisque id dui vitae tellus facilisis tempus. 
                Nam lobortis scelerisque neque vitae rhoncus. </p>
            </div>
          </article>
          <article>
            <div className="about--profile-pic">
              Face Image
            </div>
            <div className="about--profile-blurb">
              <h2>Name Here</h2>
              <ul>
                <li>👩‍🎓 Background</li>
                <li>❤️ Passions</li>
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
