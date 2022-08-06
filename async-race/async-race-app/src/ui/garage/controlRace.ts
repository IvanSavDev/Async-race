import { IState } from 'Src/types/dataInterfaces';
import renderGarage from './garagePage';
import {
  generateOneHundredCars,
  loadCars,
  resetControlRaceOptions,
} from 'Src/utils/utils';
import { createCar } from 'Src/api';

const generateFieldControlRace = (state: IState): HTMLDivElement => {
  const controlRace = document.createElement('div');
  controlRace.classList.add('control-race');
  const race = document.createElement('button');
  race.classList.add('control-race__start');
  race.textContent = 'RACE';
  race.addEventListener('click', () => {});
  const reset = document.createElement('button');
  reset.classList.add('control-race__reset');
  reset.textContent = 'RESET';
  reset.addEventListener('click', () => {
    resetControlRaceOptions(state);
    renderGarage(state);
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
