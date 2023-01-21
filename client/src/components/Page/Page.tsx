import s from "./Page.module.css";

interface PageInterface {
  breedsPerPage: number;
  allBreeds: number;
  page: (e: number) => void;
  current: number;
}

export const SuperiorPage = ({
  breedsPerPage,
  allBreeds,
  page,
  current,
}: PageInterface) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allBreeds / breedsPerPage); i++) {
    //Esto me guardara tantos numeros como sean necesarios para que todas las razas tengan su pagina y estas tengan el maximo permitido o disponible
    pageNumbers.push(i + 1);
  }

  return (
    <div className={s.pageContainer}>
      {current !== 1 ? (
        <button onClick={() => page(1)} className={s.buttonSide}>{`<<`}</button>
      ) : (
        <button disabled={true} className={s.buttonSideDisabled}>{`<<`}</button>
      )}
      {current !== 1 ? (
        <button
          onClick={() => page(current - 1)}
          className={s.button}
        >{`<`}</button>
      ) : (
        <button disabled={true} className={s.buttonDisabled}>{`<`}</button>
      )}
      {current !== pageNumbers.length ? (
        <button
          onClick={() => page(current + 1)}
          className={s.button}
        >{`>`}</button>
      ) : (
        <button disabled={true} className={s.buttonDisabled}>{`>`}</button>
      )}
      {current !== pageNumbers.length ? (
        <button
          onClick={() => page(pageNumbers.length)}
          className={s.buttonSide}
        >{`>>`}</button>
      ) : (
        <button disabled={true} className={s.buttonSideDisabled}>{`>>`}</button>
      )}
    </div>
  );
};

const Page = ({ breedsPerPage, allBreeds, page, current }: PageInterface) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allBreeds / breedsPerPage); i++) {
    //Esto me guardara tantos numeros como sean necesarios para que todas las razas tengan su pagina y estas tengan el maximo permitido o disponible
    pageNumbers.push(i + 1);
  }

  return (
    <div className={s.pageContainer}>

      {current !== 1 ? (
        <button onClick={() => page(1)} className={s.buttonSide}>{`<<`}</button>
      ) : (
        <button disabled={true} className={s.buttonSideDisabled}>{`<<`}</button>
      )}

      {current !== 1 ? (
        <button
          onClick={() => page(current - 1)}
          className={s.button}
        >{`<`}</button>
      ) : (
        <button disabled={true} className={s.buttonDisabled}>{`<`}</button>
      )}

      {pageNumbers &&
        pageNumbers.map(
          (
            number //Creo una barra de navegacion con una lista desordenada, por cada numero conseguido creo un elemento de dicha lista que sera un link que cambiara mi estado de currentPage
          ) => (
            <div key={number} className={s.buttonContainer}>
              <button
                className={number === current ? s.active : s.button}
                onClick={() => page(number)}
              >
                {number}
              </button>
            </div>
          )
      )}

      {current !== pageNumbers.length ? (
        <button
          onClick={() => page(current + 1)}
          className={s.button}
        >{`>`}</button>
      ) : (
        <button disabled={true} className={s.buttonDisabled}>{`>`}</button>
      )}

      {current !== pageNumbers.length ? (
        <button
          onClick={() => page(pageNumbers.length)}
          className={s.buttonSide}
        >{`>>`}</button>
      ) : (
        <button disabled={true} className={s.buttonSideDisabled}>{`>>`}</button>
      )}
    </div>
  );
};

export default Page;
