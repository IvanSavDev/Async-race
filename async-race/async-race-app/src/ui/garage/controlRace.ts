import { IState } from 'Src/types/dataInterfaces';
import {
  createElement,
  generateOneHundredCars,
  updateCars,
  handleResultDriveCar,
} from 'Src/utils/utils';
import { calculateAllPagesGarage } from 'Src/utils/calculatePages';
import { createCar, stopCar, startCar } from 'Src/api';
import { stopAnimation } from 'Src/utils/animations';
import { RaceStatus } from 'Src/enum/enum';
import renderGarage from './garagePage';

const startRace = (state: IState, race: HTMLElement) => {
  race.addEventListener('click', async () => {
    state.uiState.raceStatus = RaceStatus.process;
    renderControlRace(state);
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    cars.forEach(async (car) => {
      const idCar = Number(car.getAttribute('id'));
      const { result, time } = await startCar(state, idCar, car);
      if (result) {
        handleResultDriveCar(state, result, idCar, time);
      }
    });
  });
};

const stopRace = (state: IState, resetBtn: HTMLElement) => {
  resetBtn.addEventListener('click', async () => {
    state.controller.abort();
    renderControlRace(state);
    state.controller = new AbortController();
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    const animations = Array.from(cars).map(async (car) => {
      const idCar = Number(car.getAttribute('id'));
      await stopCar(idCar);
      stopAnimation(state, car, idCar);
    });
    await Promise.allSettled(animations);
    state.uiState.raceStatus = RaceStatus.start;
    renderControlRace(state);
  });
};

const generateCars = (state: IState, generateCarsBtn: HTMLElement) => {
  generateCarsBtn.addEventListener('click', async () => {
    const createCars = generateOneHundredCars().map((car) => createCar(car));
    await Promise.all(createCars);
    await updateCars(state);
    state.uiState.garageAllPage = calculateAllPagesGarage(state);
    renderGarage(state);
  });
};

const generateFieldControlRace = (state: IState): HTMLElement => {
  const {
    uiState: { raceStatus },
  } = state;
  const controlRace = createElement('div', { class: 'control-race' });

  const race = createElement(
    'button',
    { disabled: raceStatus !== RaceStatus.start  },
    'RACE',
  );
  startRace(state, race);

  const resetBtn = createElement(
    'button',
    { disabled: raceStatus !== RaceStatus.finished },
    'RESET',
  );
  stopRace(state, resetBtn);

  const generateCarsBtn = createElement(
    'button',
    { class: 'control-race__generate' },
    'GENERATE CARS',
  );
  generateCars(state, generateCarsBtn);

  controlRace.append(race, resetBtn, generateCarsBtn);

  return controlRace;
};

export const renderControlRace = (state: IState) => {
  const controlRace = document.querySelector('.control-race');
  if (controlRace) {
    controlRace.replaceWith(generateFieldControlRace(state));
  }
};

export default generateFieldControlRace;
