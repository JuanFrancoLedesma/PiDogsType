import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={s.landingPageContainer}>
      <span className={s.logo}>HENRY DOGS</span>
        <Link to={"/home"} className={s.link}>
        Acceder
        </Link>
    </div>
  );
};

export default LandingPage;
