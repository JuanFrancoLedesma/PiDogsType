import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  clearBreedDetail,
  getBreedById,
} from "../../../redux/storeDog/dogActions";
import s from "./Modal.module.css";
import perroBlanco from "../../../sourceImg/perroBlanco.gif";

interface ModalInterface {
  id: string;
  handleModal: (id?: string) => void;
}

const Modal = ({ id, handleModal }: ModalInterface) => {
  const dispatch = useAppDispatch();

  const breedDetail = useAppSelector((state) => state.dogs.breedDetail);
  const [unit, setUnit] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getBreedById(id));
    return () => {
      dispatch(clearBreedDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.modalContainer}>
      {/* <button className={s.sideButton}>{`<`}</button> */}
      <div className={s.modal}>
        <div className={s.modalImage}>
          {breedDetail.name ? (
            <img src={breedDetail.image} alt="Dog" />
          ) : (
            <img src={perroBlanco} alt="Dog" />
          )}
        </div>
        <div className={s.info}>
          {breedDetail.name ? (
            <div>
              <h3>Nombre: {breedDetail.name}</h3>
              {unit ? (
                <h3>
                  Peso: {" "}
                  {`${breedDetail.metric_weight[0]} - ${breedDetail.metric_weight[1]} kg`}
                </h3>
              ) : (
                <h3>
                  Peso: {" "}
                  {`${breedDetail.imperial_weight[0]} - ${breedDetail.imperial_weight[1]} lb`}
                </h3>
              )}
              {unit ? (
                <h3>
                  Altura: {" "}
                  {`${breedDetail.metric_height[0]} - ${breedDetail.metric_height[1]} m`}
                </h3>
              ) : (
                <h3>
                  Altura: {" "}
                  {`${breedDetail.imperial_height[0]} - ${breedDetail.imperial_height[1]} in`}
                </h3>
              )}
              <h3>
                Esperanza de vida: {" "}
                {`${breedDetail.life_span[0]} - ${breedDetail.life_span[1]} años`}
              </h3>
            </div>
          ) : (
            <div>
              
            </div>
          )}
        </div>
        <button className={s.x} onClick={() => handleModal()}>
          X
        </button>
        <button className={s.units} onClick={() => setUnit(!unit)}>
          Unit
        </button>
      </div>
      {/* <button className={s.sideButton}>{`>`}</button> */}
    </div>
  );
};

export default Modal;
