import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { getDogs } from "../../redux/storeDog/dogActions";
import { getTemperaments } from "../../redux/storeTemperament/temperamentAction";
import s from "./NavBar.module.css";

const NavBar = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    
      dispatch(getDogs())
      dispatch(getTemperaments());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={s.navContainer}>
        <div className={s.title}>
          <h3>Henry Dogs</h3>
        </div>
        <div className={s.links}>
          <button>
            <Link className={s.link} to={""}>Home</Link>
          </button>
          <button>
            <Link className={s.link} to={"create"}>Create breed</Link>
          </button>
          <button>
            <Link className={s.link} to={"about"}>About</Link>
          </button>
        </div>
      </div>
      <div className={s.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
