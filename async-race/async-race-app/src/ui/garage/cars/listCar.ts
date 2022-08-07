import { deleteCar, deleteWinner } from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import { calculateAllPagesGarage, loadCars } from 'Src/utils/utils';
import generatePagination from 'Src/ui/pagination';
import generateCar from './car';
import renderGarage from '../garagePage';
import { activeAnimation, stopAnimation } from 'Src/utils/animations';

const listenListCars = (state: IState, element: HTMLElement) => {
  element.addEventListener('click', async (event) => {
    const {
      dataCars,
      uiState,
      updateCar,
      uiState: { animationsCars },
    } = state;
    const target = event.target as HTMLElement;
    const containerCar = target.closest('.car') as HTMLElement;
    if (!containerCar) return;
    const idCar = Number(containerCar.getAttribute('id'));
    const { name, color } = dataCars.cars.find(({ id }) => id === idCar)!;

    if (target.tagName === 'BUTTON' && target.textContent === 'SELECT') {
      uiState.selectCar = idCar;
      updateCar.color = color;
      updateCar.name = name;
      renderGarage(state);
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'REMOVE') {
      const isWinner = state.dataWinners.winners.find(({ id }) => id === idCar);
      if (isWinner) {
        await deleteWinner(idCar);
      }
      await deleteCar(idCar);
      if (dataCars.cars.length === 1) {
        dataCars.cars = [];
      }
      uiState.garageAllPage = calculateAllPagesGarage(state);
      Object.keys(animationsCars).forEach(
        (key: string) => (animationsCars[Number(key)].drive = false)
      );

      delete state.uiState.animationsCars[idCar];
      await loadCars(state);
      renderGarage(state);
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'A') {
      activeAnimation(state, containerCar, false);
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'B') {
      stopAnimation(state, containerCar, idCar);
    }
  });
};

const generateListCars = (state: IState): HTMLDivElement => {
  const {
    uiState: { garagePage, animationsCars },
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
  const cars = dataCars.map(({ name, color, id }) =>
    generateCar(name, color, id, animationsCars[id]?.drive)
  );
  listCars.append(...cars);
  const pagination = generatePagination(state);
  container.append(garageCount, pageCount, listCars, pagination);
  return container;
};

export default generateListCars;
