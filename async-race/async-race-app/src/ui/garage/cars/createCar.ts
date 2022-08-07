import {
  calculateAllPagesGarage,
  resetCreateOptions,
  setAttributes,
} from 'Src/utils/utils';
import { createCar, getCars } from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import renderGarage from '../garagePage';

const listenerCreateCar = (element: HTMLFormElement, state: IState) => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.text.value;
    const color = form.color.value;
    await createCar({ name, color });
    const currentPage = state.uiState.garagePage;
    const newCar = await getCars(currentPage);
    if (newCar) {
      resetCreateOptions(state);
      state.dataCars = newCar;
      state.uiState.garageAllPage = calculateAllPagesGarage(state);
      renderGarage(state);
    }
  });
};

const generateFieldCreateCar = (state: IState): HTMLFormElement => {
  const {
    createCar: { name, color },
  } = state;
  const createCarForm = document.createElement('form');
  createCarForm.classList.add('create-car');
  listenerCreateCar(createCarForm, state);

  const createCarName = document.createElement('input');
  setAttributes(createCarName, {
    type: 'text',
    value: name,
    name: 'text',
    required: '',
  });
  createCarName.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    state.createCar.name = input.value;
  });

  const createCarColor = document.createElement('input');
  setAttributes(createCarColor, { type: 'color', value: color, name: 'color' });
  createCarColor.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    state.createCar.color = input.value;
  });
  const createCarBtn = document.createElement('button');
  createCarBtn.textContent = 'CREATE';
  createCarForm.append(createCarName, createCarColor, createCarBtn);

  return createCarForm;
};

export default generateFieldCreateCar;
