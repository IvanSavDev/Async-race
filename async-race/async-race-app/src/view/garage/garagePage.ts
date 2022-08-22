import { IState } from 'Src/types/dataInterfaces';
import generateFieldCreateCar from './cars/createCar';
import generateFieldUpdateCar from './cars/updateCar';
import generateFieldControlRace from './controlRace';

const generateControlPanel = (state: IState): HTMLElement => {
  const container = document.createElement('div');
  container.classList.add('control-panel');
  const createCar = generateFieldCreateCar(state);
  const updateCar = generateFieldUpdateCar(state);
  const controlRace = generateFieldControlRace(state);
  container.append(createCar, updateCar, controlRace);

  return container;
};

export default generateControlPanel;
