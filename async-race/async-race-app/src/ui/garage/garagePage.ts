import { IState } from 'Src/types/dataInterfaces';
import generateFieldCreateCar from './cars/createCar';
import generateFieldUpdateCar from './cars/updateCar';
import generateFieldControlRace from './controlRace';
import generateListCars from './cars/listCar';

const generateControlPanel = (state: IState): HTMLElement => {
  const container = document.createElement('div');
  container.classList.add('control-panel');
  const createCar = generateFieldCreateCar(state);
  const updateCar = generateFieldUpdateCar(state);
  const controlRace = generateFieldControlRace(state);
  container.append(createCar, updateCar, controlRace);

  return container;
};

const renderGarage = (state: IState): void => {
  const garage = document.createElement('div');
  const app = document.querySelector('.container-app')!;
  garage.classList.add('garage-page');
  garage.append(generateControlPanel(state), generateListCars(state));
  console.log(state);
  app.replaceChildren(garage);
};

export default renderGarage;

// const generateGarage = (state: IState): HTMLDivElement => {
//   const garage = document.createElement('div');
//   garage.classList.add('garage');
//   garage.append(
//     generateControlPanel(state),
//     generateListCars(state),
//     generatePagination(state, renderGarage)
//   );
//   return garage;
// };
