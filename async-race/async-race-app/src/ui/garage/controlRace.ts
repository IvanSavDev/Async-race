import { IState } from 'Src/types/dataInterfaces';
import renderGarage from './garagePage';
import {
  createElement,
  generateOneHundredCars,
  loadCars,
  startCar,
} from 'Src/utils/utils';
import { calculateAllPagesGarage } from 'Src/utils/calculatePages';
import { createCar, stopCar } from 'Src/api';
import { stopAnimation } from 'Src/utils/animations';

const startRace = (state: IState, race: HTMLElement) => {
  race.addEventListener('click', async () => {
    state.uiState.raceStatus = 'process';
    renderControlRace(state);
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    cars.forEach(async (car) => {
      const idCar = Number(car.getAttribute('id'));
      startCar(state, idCar, car);
    });
  });
};

const stopRace = (state: IState, resetBtn: HTMLElement) => {
  resetBtn.addEventListener('click', async () => {
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    const animations = Array.from(cars).map(async (car) => {
      const idCar = Number(car.getAttribute('id')!);
      await stopCar(idCar);
      stopAnimation(state, car, idCar);
    });
    await Promise.allSettled(animations);
    state.uiState.raceStatus = 'start';
    renderControlRace(state);
  });
};

const generateCars = (state: IState, generateCarsBtn: HTMLElement) => {
  generateCarsBtn.addEventListener('click', async () => {
    const createCars = generateOneHundredCars().map((car) => createCar(car));
    await Promise.all(createCars);
    await loadCars(state);
    state.uiState.garageAllPage = calculateAllPagesGarage(state);
    renderGarage(state);
  });
};

export const renderControlRace = (state: IState) => {
  const controlRace = document.querySelector('.control-race')!;
  controlRace.replaceWith(generateFieldControlRace(state));
};

const generateFieldControlRace = (state: IState): HTMLElement => {
  const {
    uiState: { raceStatus },
  } = state;
  const controlRace = document.createElement('div');
  controlRace.classList.add('control-race');

  const race = createElement(
    'button',
    raceStatus === 'start' ? {} : { disabled: 'true' },
    'RACE'
  );
  startRace(state, race);

  const resetBtn = createElement(
    'button',
    raceStatus === 'finished' ? {} : { disabled: 'true' },
    'RESET'
  );
  stopRace(state, resetBtn);

  const generateCarsBtn = createElement(
    'button',
    { class: 'control-race__generate' },
    'GENERATE CARS'
  );
  generateCars(state, generateCarsBtn);

  controlRace.append(race, resetBtn, generateCarsBtn);

  return controlRace;
};

export default generateFieldControlRace;
// const generateCars = document.createElement('button');
// generateCars.classList.add('control-race__generate');
// generateCars.textContent = 'GENERATE CARS';

// const reset = document.createElement('button');
// reset.classList.add('control-race__reset');
// reset.textContent = 'RESET';
// if (raceStatus === 'finished') {
//   reset.removeAttribute('disabled');
// } else {
//   reset.setAttribute('disabled', '');
// }
