import { deleteCar, driveCar, getCars, startCar, stopCar } from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import { animation, loadCars } from 'Src/utils/utils';
import generateCar from './car';
import renderGarage from '../garagePage';

const listenListCars = (state: IState, element: HTMLElement) => {
  element.addEventListener('click', async (event) => {
    const { dataCars, uiState, updateCar } = state;
    const target = event.target as HTMLElement;
    const containerCar = target.closest('.car')!;
    const idCar = Number(containerCar.getAttribute('id'));
    const car = containerCar.querySelector('.car-img') as HTMLElement;

    if (target.tagName === 'BUTTON' && target.textContent === 'SELECT') {
      const { name, color } = dataCars.cars.find(({ id }) => id === idCar)!;
      uiState.selectCar = idCar;
      updateCar.color = color;
      updateCar.name = name;
      renderGarage(state);
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'REMOVE') {
      await deleteCar(idCar);
      if (dataCars.cars.length === 1) {
        dataCars.cars = [];
      }
      await loadCars(state);
      renderGarage(state);
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'A') {
      const { velocity, distance } = await startCar(idCar);
      const timeDrive = distance / velocity;
      const animationStopId: { id: null | number } = {
        id: null,
      };
      animation(car, timeDrive, animationStopId);
      uiState.animationsIds[idCar] = animationStopId;
      const result = await driveCar(idCar);
      if (result === 500 && animationStopId.id) {
        cancelAnimationFrame(animationStopId.id);
      }
    }
    if (target.tagName === 'BUTTON' && target.textContent === 'B') {
      await stopCar(idCar);
      const idAnimation = uiState.animationsIds[idCar].id;
      if (idAnimation) {
        cancelAnimationFrame(idAnimation);
        car.style.left = '0px';
      }
    }
  });
};

const generateListCars = (state: IState): HTMLDivElement => {
  const {
    uiState: { garagePage },
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
  const cars = dataCars.map((car) =>
    generateCar(car.name, car.color, car.id, state.uiState.animationsIds)
  );
  listCars.append(...cars);
  container.append(garageCount, pageCount, listCars);
  return container;
};

export default generateListCars;
