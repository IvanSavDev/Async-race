import { IState } from 'Src/types/dataInterfaces';
import listenerGenerateCars from 'Src/controllers/garage/listenerGenerateCars';
import listenerSwitchPage from 'Src/controllers/listenerSwitchPage';
import listenerCreateCar from 'Src/controllers/garage/cars/listenerCreateCar';
import listenerListCars from 'Src/controllers/garage/cars/listenerListCars';
import listenerUpdateCars from 'Src/controllers/garage/cars/listenerUpdateCar';
import renderControlRace from './renderControlRace';
import generateControlPanel from './garagePage';
import generateListCars from './cars/listCar';

const renderGarage = (state: IState) => {
  const garage = document.createElement('div');
  const app = document.querySelector('.container-app');
  garage.classList.add('garage-page');
  garage.append(generateControlPanel(state), generateListCars(state));
  const prevButton = garage.querySelector('#prev') as HTMLElement;
  const nextButton = garage.querySelector('#next') as HTMLElement;
  const createForm = garage.querySelector('.create-car') as HTMLFormElement;
  const listCars = garage.querySelector('.list-cars') as HTMLDivElement;
  const updateCar = garage.querySelector('.update-car') as HTMLDivElement;
  listenerCreateCar(state, createForm, renderGarage);
  listenerSwitchPage(state, prevButton, true, renderGarage);
  listenerSwitchPage(state, nextButton, false, renderGarage);
  listenerListCars(state, listCars, renderGarage);
  listenerUpdateCars(state, updateCar, renderGarage);
  if (app) {
    app.replaceChildren(garage);
    renderControlRace(state);
  }
  const generateCarsButton = garage.querySelector('#generate') as HTMLElement;

  listenerGenerateCars(state, generateCarsButton, renderGarage);
};

export default renderGarage;
