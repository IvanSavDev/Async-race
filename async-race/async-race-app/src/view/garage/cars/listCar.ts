import { IState } from 'Src/types/dataInterfaces';
import generatePagination from 'Src/view/pagination';
import generateCar from './car';

const generateListCars = (state: IState) => {
  const {
    garagePage,
    uiState: { animationsCars },
    dataCars: { count, cars: dataCars },
  } = state;
  const container = document.createElement('div');
  const garageCount = document.createElement('h2');
  garageCount.textContent = `Garage (${count})`;
  const pageCount = document.createElement('h3');
  pageCount.textContent = `Page #${garagePage}`;
  const listCars = document.createElement('div');
  listCars.classList.add('list-cars');
  const cars = dataCars
    .map(({ name, color, id }) => generateCar(name, color, id, animationsCars[id]));
  listCars.append(...cars);
  const pagination = generatePagination(state);
  container.append(garageCount, pageCount, listCars, pagination);
  return container;
};

export default generateListCars;
