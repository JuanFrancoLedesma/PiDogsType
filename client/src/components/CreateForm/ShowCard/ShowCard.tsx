import { errorInterface, inputInterface } from "../../../types";
import s from "./ShowCard.module.css";

interface ShowCardInterface {
  input: inputInterface;
  unit: boolean;
  handleDeleteTemperament: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  error: errorInterface;
}

const ShowCard = ({
  input,
  unit,
  handleDeleteTemperament,
  error,
}: ShowCardInterface) => {
  return (
    <div className={s.cardContainer}>
      <div className={s.image}>
        <img
          src={
            input.image
              ? input.image
              : "https://images.vexels.com/media/users/3/144319/isolated/preview/788e7641cffc9529e90ba61c54dc6d09-perro-silueta-ambulante.png"
          }
          alt="Carga a tu mascota!"
        />
      </div>
      <div className={s.infoContainer}>
        <div className={s.info}>
          {error.name ? <p>{error.name}</p> : <p>{input.name}</p>}
        </div>
        {!error.weight && input.minWeight && input.maxWeight ? (
          <div className={s.info}>
            {unit ? (
              <p>{`${input.minWeight} - ${input.maxWeight} Kg`}</p>
            ) : (
              <p>{`${input.minWeight} - ${input.maxWeight} lb`}</p>
            )}
          </div>
        ) : (
          <div className={s.info}>
            <p>{error.weight}</p>
          </div>
        )}
        {!error.height && input.minHeight && input.maxHeight ? (
          <div className={s.info}>
            {unit ? (
              <p>{`${input.minHeight} - ${input.maxHeight} m`}</p>
            ) : (
              <p>{`${input.minHeight} - ${input.maxHeight} ib`}</p>
            )}
          </div>
        ) : (
          <div className={s.info}>
            <p>{error.height}</p>
          </div>
        )}
        <div className={s.info}>
          {!error.life_span && input.minLifeSpan && input.maxLifeSpan ? (
            <p>
              {input.minLifeSpan} - {input.maxLifeSpan} años
            </p>
          ) : (
            <div className={s.info}>
              <p>{error.life_span}</p>
            </div>
          )}
        </div>
        {!error.temperaments ? (
          <div className={s.infoTemper}>
            {input.temperaments?.map((temperament) => {
              return (
                <button
                  value={temperament}
                  onClick={(e) => handleDeleteTemperament(e)}
                >
                  X {temperament}
                </button>
              );
            })}
          </div>
        ) : (
          <div className={s.info}>
            <p>{error.temperaments}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
