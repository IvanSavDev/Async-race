import { IState } from 'Src/types/dataInterfaces';
import generateFieldCreateCar from './cars/createCar';
import generateFieldUpdateCar from './cars/updateCar';
import generateFieldControlRace from './controlRace';
import generateListCars from './cars/listCar';
import generatePagination from './pagination';
import { calculateAllPagesGarage } from 'Src/utils/utils';

const generateControlPanel = (state: IState): DocumentFragment => {
  const fragment = new DocumentFragment();
  const createCar = generateFieldCreateCar(state);
  const updateCar = generateFieldUpdateCar(state);
  const controlRace = generateFieldControlRace(state);
  fragment.append(createCar, updateCar, controlRace);

  return fragment;
};

const renderGarage = (state: IState): void => {
  const garage = document.createElement('div');
  const app = document.querySelector('.container-app')!;
  garage.classList.add('garage');
  state.uiState.garageAllPage = calculateAllPagesGarage(state); // не должная менять стейт
  garage.append(
    generateControlPanel(state),
    generateListCars(state),
    generatePagination(state)
  );
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
