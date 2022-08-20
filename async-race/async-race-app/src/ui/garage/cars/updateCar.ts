import { IState } from 'Src/types/dataInterfaces';
import { updateCar } from 'Src/api';
import { resetUpdateOptions } from 'Src/utils/resetParams';
import { createElement, updateCars } from 'Src/utils/utils';
import renderGarage from '../garagePage';

const listenerUpdateCar = (element: HTMLElement, state: IState) => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.text.value;
    const color = form.color.value;
    const selectCar = state.uiState.selectCar as number;
    await updateCar(selectCar, name, color);
    await updateCars(state);
    resetUpdateOptions(state);
    renderGarage(state);
  });
};

const generateFieldUpdateCar = (state: IState): HTMLElement => {
  const {
    uiState: { selectCar },
    updateCar: { name, color },
  } = state;

  const updateCarElement = createElement('form', { class: 'update-car' });
  listenerUpdateCar(updateCarElement, state);

  const updateCarName = createElement('input', {
    type: 'text',
    value: name,
    name: 'text',
    disabled: !selectCar,
  });
  updateCarName.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.name = input.value;
  });

  const updateCarColor = createElement('input', {
    type: 'color',
    value: color,
    name: 'color',
    disabled: !selectCar,
  });
  updateCarColor.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.color = input.value;
  });

  const updateCarBtn = createElement(
    'button',
    {
      type: 'submit',
      disabled: !selectCar,
    },
    'UPDATE',
  );
  updateCar.append(updateCarName, updateCarColor, updateCarBtn);

  return updateCar;
};

export default generateFieldUpdateCar;
