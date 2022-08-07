import { IState } from 'Src/types/dataInterfaces';
import renderGarage from './garagePage';
import { generateOneHundredCars, loadCars } from 'Src/utils/utils';
import { createCar } from 'Src/api';
import { activeAnimation, stopAnimation } from 'Src/utils/animations';

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

  const race = document.createElement('button');
  race.classList.add('control-race__start');
  race.textContent = 'RACE';
  if (raceStatus === 'start') {
    race.removeAttribute('disabled');
  } else {
    race.setAttribute('disabled', '');
  }
  race.addEventListener('click', async () => {
    state.uiState.raceStatus = 'process';
    state.uiState.lastWinner = null;
    renderControlRace(state);
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    cars.forEach((car) => activeAnimation(state, car, true));
  });

  const reset = document.createElement('button');
  reset.classList.add('control-race__reset');
  reset.textContent = 'RESET';
  if (raceStatus === 'finished') {
    reset.removeAttribute('disabled');
  } else {
    reset.setAttribute('disabled', '');
  }
  reset.addEventListener('click', async () => {
    // renderControlRace(state);
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    const animations = Array.from(cars).map((car) => {
      const idCar = car.getAttribute('id')!;
      return stopAnimation(state, car, Number(idCar));
    });
    await Promise.allSettled(animations);
    state.uiState.raceStatus = 'start';
    renderControlRace(state);
    console.log(state);
  });

  const generateCars = document.createElement('button');
  generateCars.classList.add('control-race__generate');
  generateCars.textContent = 'GENERATE CARS';
  generateCars.addEventListener('click', async () => {
    const createCars = generateOneHundredCars().map((car) => createCar(car));
    await Promise.all(createCars);
    await loadCars(state);
    renderGarage(state);
  });

  controlRace.append(race, reset, generateCars);

  return controlRace;
};

export default generateFieldControlRace;
