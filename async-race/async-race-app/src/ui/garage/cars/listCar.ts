import {
  deleteCar, deleteWinner, stopCar, startCar,
} from 'Src/api';
import { ICar, IState } from 'Src/types/dataInterfaces';
import { updateCars } from 'Src/utils/utils';
import generatePagination from 'Src/ui/pagination';
import { stopAnimation } from 'Src/utils/animations';
import generateCar from './car';
import renderGarage from '../garagePage';

const listenListCars = (state: IState, element: HTMLElement) => {
  element.addEventListener('click', async ({ target }) => {
    const {
      dataCars, uiState, updateCar, garagePage,
    } = state;
    const selectedElement = target as HTMLElement;
    const containerCar = selectedElement.closest('.car') as HTMLElement;
    if (!containerCar) return;
    const idCar = Number(containerCar.getAttribute('id'));
    const { name, color } = dataCars.cars.find(({ id }) => id === idCar) as ICar;
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'SELECT'
    ) {
      uiState.selectCar = idCar;
      updateCar.color = color;
      updateCar.name = name;
      renderGarage(state);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'REMOVE'
    ) {
      await deleteCar(idCar);
      await deleteWinner(idCar);
      delete state.uiState.animationsCars[idCar];
      if (dataCars.cars.length === 1 && garagePage !== 1) {
        state.garagePage -= 1;
      }
      await updateCars(state);
      renderGarage(state);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'A'
    ) {
      await startCar(state, idCar, containerCar);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'B'
    ) {
      state.controller.abort();
      state.controller = new AbortController();
      await stopCar(idCar);
      stopAnimation(state, containerCar, idCar);
    }
  });
};

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
  listenListCars(state, listCars);
  const cars = dataCars
    .map(({ name, color, id }) => generateCar(name, color, id, animationsCars[id]));
  listCars.append(...cars);
  const pagination = generatePagination(state);
  container.append(garageCount, pageCount, listCars, pagination);
  return container;
};

export default generateListCars;
