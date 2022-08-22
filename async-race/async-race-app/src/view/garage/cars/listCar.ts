import { IState } from 'Src/types/dataInterfaces';
import { createElement } from 'Src/utils/utils';
import generatePagination from 'Src/view/pagination';
import generateCar from './car';

const generateListCars = (state: IState) => {
  const {
    garagePage,
    uiState: { animationsCars },
    dataCars: { count, cars: dataCars },
  } = state;
  const container = document.createElement('div');
  const garageCount = createElement('h2', {}, `Garage (${count})`);
  const pageCount = createElement('h3', {}, `Page #${garagePage}`);
  const listCars = createElement('div', { class: 'list-cars' });
  const cars = dataCars
    .map(({ name, color, id }) => generateCar(name, color, id, animationsCars[id]));
  listCars.append(...cars);
  const pagination = generatePagination(state);
  container.append(garageCount, pageCount, listCars, pagination);
  return container;
};

export default generateListCars;
