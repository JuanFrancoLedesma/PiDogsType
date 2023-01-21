import { Link } from "react-router-dom";
import s from "./HomeCard.module.css"

interface dogCard {
  id: string;
  image: string;
  name: string;
  handleModal: (id: string) => void
}

const HomeCard = ({ id, image, name , handleModal}: dogCard) => {
  return (
    <button onClick={()=>handleModal(id)} className={s.homeCardButton}>
      <div className={s.homeCardContainer}>
        <img className={s.homeCardImage} src={image} alt="DogImage" />
        <div className={s.info}>
          <h3>{name}</h3>
          {/* <h3>{temperament}</h3> */}
        </div>
      </div>
    </button>
    
  );
};

export default HomeCard;
