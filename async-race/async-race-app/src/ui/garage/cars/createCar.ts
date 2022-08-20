import { createElement, updateCars } from 'Src/utils/utils';
import { createCar, getCars } from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import renderGarage from '../garagePage';
import { resetCreateOptions } from 'Src/utils/resetParams';

const listenerCreateCar = (element: HTMLElement, state: IState) => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.text.value;
    const color = form.color.value;
    await createCar({ name, color });
    const currentPage = state.garagePage;
    const newCar = await getCars(currentPage);
    if (newCar) {
      resetCreateOptions(state);
      await updateCars(state);
      renderGarage(state);
    }
  });
};

const generateFieldCreateCar = (state: IState): HTMLElement => {
  const {
    createCar: { name, color },
  } = state;

  const createCarForm = createElement('form', { class: 'create-car' });
  listenerCreateCar(createCarForm, state);

  const createCarName = createElement('input', {
    type: 'text',
    value: name,
    name: 'text',
    required: 'required',
  });
  createCarName.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.createCar.name = input.value;
  });

  const createCarColor = createElement('input', {
    type: 'color',
    value: color,
    name: 'color',
  });
  createCarColor.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.createCar.color = input.value;
  });

  const createCarBtn = document.createElement('button');
  createCarBtn.textContent = 'CREATE';

  createCarForm.append(createCarName, createCarColor, createCarBtn);

  return createCarForm;
};

export default generateFieldCreateCar;
