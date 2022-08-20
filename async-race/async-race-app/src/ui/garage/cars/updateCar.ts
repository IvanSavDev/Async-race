import { IState } from 'Src/types/dataInterfaces';
import { updateCar } from 'Src/api';
import renderGarage from '../garagePage';
import { resetUpdateOptions } from 'Src/utils/resetParams';
import { createElement, updateCars } from 'Src/utils/utils';

const listenerUpdateCar = (element: HTMLElement, state: IState) => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.text.value;
    const color = form.color.value;
    const selectCar = state.uiState.selectCar!;
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

  const updateCar = createElement('form', { class: 'update-car' });
  listenerUpdateCar(updateCar, state);

  const updateCarName = createElement('input', {
    type: 'text',
    value: name,
    name: 'text',
    disabled: selectCar ? false : true,
  });
  updateCarName.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.name = input.value;
  });

  const updateCarColor = createElement('input', {
    type: 'color',
    value: color,
    name: 'color',
    disabled: selectCar ? false : true,
  });
  updateCarColor.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.color = input.value;
  });

  const updateCarBtn = createElement(
    'button',
    {
      type: 'submit',
      disabled: selectCar ? false : true,
    },
    'UPDATE'
  );
  updateCar.append(updateCarName, updateCarColor, updateCarBtn);

  return updateCar;
};

export default generateFieldUpdateCar;
