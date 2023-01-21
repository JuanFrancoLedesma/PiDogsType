import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";


import SearchBar from "../SearchBar/SearchBar";
import Page, { SuperiorPage } from "../Page/Page";
import HomeCard from "../HomeCards/HomeCard";


import s from "./Home.module.css";
import perro from "../../sourceImg/perro.gif";
import x from "../../sourceImg/x.gif";

import Filter from "../Filter/Filter";
import Modal from "./Modal/Modal";

const Home = () => {
  const allDogs = useAppSelector((state) => state.dogs.allBreeds);
  const allTemperaments = useAppSelector(
    (state) => state.temperaments.allTemperaments
  );
  const empty = useAppSelector(state=>state.dogs.empty)

  const [render, setRender] = useState(true);
  const handleRender = (): void => {
    setRender(!render);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 8;
  const indexLastBreed = currentPage * breedsPerPage; //8 : indice de la novena raza
  const indexFirstBreed = indexLastBreed - breedsPerPage; //8 - 8 = 0 : indice de la primer raza
  const currentBreeds = allDogs.slice(indexFirstBreed, indexLastBreed);
  const page = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 400)
  };
  const [modal, setModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const handleModal = (id?: string): void => {
    if (id) {
      setId(id);
      setModal(!modal);
    } else {
      setId("");
      setModal(!modal);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.homeContainer}>
      <div className={s.filtersContainers}>
        <Filter handleRender={handleRender} allTemperaments={allTemperaments} page={page}/>
      </div>
      <div className={s.displayContainer}>
        <div className={s.searchBarContainer}>
          <SearchBar handleRender={handleRender} page={page} />
        </div>
        <div className={s.superiorPageContainer}>
            <SuperiorPage
            breedsPerPage={breedsPerPage}
            allBreeds={allDogs.length}
            page={page}
            current={currentPage}
            />
        </div>
        <div className={s.cardsContainer}>
          {currentBreeds.length ? (
            currentBreeds?.map((e) => {
              return (
                <HomeCard
                  handleModal={handleModal}
                  id={e.id}
                  image={e.image}
                  name={e.name}
                />
              );
            })
          ) : (
            <div>
              {
                empty ? <img className={s.loading} src={x} alt="cargando" /> : <img className={s.loading} src={perro} alt="cargando" />
              }
            </div>
          )}
        </div>
        <div className={s.pageContainer}>
          {
            allDogs.length ? <Page
            breedsPerPage={breedsPerPage}
            allBreeds={allDogs.length}
            page={page}
            current={currentPage}
          /> : <div></div>
          }
          
        </div>
        {modal ? (
          <Modal id={id} handleModal={handleModal}/>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
