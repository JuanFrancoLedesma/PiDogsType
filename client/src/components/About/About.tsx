import tslogo from "../../sourceImg/tslogo.png";
import csslogo from "../../sourceImg/csslogo.png";
import expresslogo from "../../sourceImg/expresslogo.png";
import reactlogo from "../../sourceImg/reactlogo.png";
import reduxlogo from "../../sourceImg/reduxlogo.png";
import postgreslogo from "../../sourceImg/postgreslogo.png";
import sequelizelogo from "../../sourceImg/sequelizelogo.png";
import githublogo from "../../sourceImg/githublogo.png";
import linkedinlogo from "../../sourceImg/linkedinlogo.png";
import gmaillogo from "../../sourceImg/gmaillogo.png";

import s from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={s.aboutContainer}>
      <div className={s.about}>
        <h1>Proyecto Individual Henry Bootcamp</h1>
        <h2>Tecnologías usadas</h2>
        <div className={s.tecnologiasContainer}>
          <div className={s.tecnologia}>
            <img className={s.logo} src={tslogo} alt="ts" />
            <h3>Typescript</h3>
          </div>
          <div className={s.tecnologia}>
            <img
              className={s.logo}
              src={
                "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
              }
              alt="Html"
            />
            <h3>Html</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={csslogo} alt="Css" />
            <h3>Css</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={reactlogo} alt="React" />
            <h3>React</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={reduxlogo} alt="Redux" />
            <h3>Redux</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={expresslogo} alt="Express" />
            <h3>Express</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={sequelizelogo} alt="Sequelize" />
            <h3>Sequelize</h3>
          </div>
          <div className={s.tecnologia}>
            <img className={s.logo} src={postgreslogo} alt="Postgres" />
            <h3>Postgres</h3>
          </div>
        </div>
        <h2>Contactame!</h2>
        <div className={s.contactameContainer}>
          <div className={s.contacto}>
            <img className={s.logo} src={githublogo} alt="Github" />
            <a className={s.link} href="https://github.com/JuanFrancoLedesma">
              <p>Github</p>
            </a>
          </div>
          <div className={s.contacto}>
            <img className={s.logo} src={linkedinlogo} alt="Linkedin" />
            <a
              className={s.link}
              href="https://www.linkedin.com/in/juan-franco-ledesma/"
            >
              <p>Linkedin</p>
            </a>
          </div>
          <div className={s.contacto}>
            <img className={s.logo} src={gmaillogo} alt="Gmail" />
            <p>juanfledesma18@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
