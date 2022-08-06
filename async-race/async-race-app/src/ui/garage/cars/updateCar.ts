import { IState } from '../../../types/dataInterfaces';
import { updateCar, getCars } from 'Src/api';
import renderGarage from '../garagePage';
import { resetUpdateOptions } from 'Src/utils/utils';

const listenerUpdateCar = (element: HTMLFormElement, state: IState) => {
  element.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const name = form.text.value;
      const color = form.color.value;
      const selectCar = state.uiState.selectCar!;
      await updateCar(selectCar, name, color);
      const newCars = await getCars();
      if (newCars) {
        state.dataCars = newCars;
        resetUpdateOptions(state);
        renderGarage(state);
      }
    } catch (e) {
      console.error(e);
    }
  });
};

const setDisabled = (state: IState, element: HTMLElement) => {
  const isSelectCar = state.uiState.selectCar;
  if (!isSelectCar) {
    element.setAttribute('disabled', 'true');
  } else {
    element.removeAttribute('disabled');
  }
};

const generateFieldUpdateCar = (state: IState): HTMLFormElement => {
  const {
    updateCar: { name, color },
  } = state;

  const updateCar = document.createElement('form');
  updateCar.classList.add('update-car');
  listenerUpdateCar(updateCar, state);
  const updateCarName = document.createElement('input');
  updateCarName.setAttribute('type', 'text');
  updateCarName.setAttribute('value', name);
  updateCarName.setAttribute('name', 'text');
  setDisabled(state, updateCarName);
  updateCarName.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    state.updateCar.name = input.value;
  });
  const updateCarColor = document.createElement('input');
  updateCarColor.setAttribute('type', 'color');
  updateCarColor.setAttribute('value', color);
  updateCarColor.setAttribute('name', 'color');
  setDisabled(state, updateCarColor);
  updateCarColor.addEventListener('input', (event) => {
    const input = event.target as HTMLInputElement;
    state.updateCar.color = input.value;
  });
  const updateCarBtn = document.createElement('button');
  updateCarBtn.setAttribute('type', 'submit');
  updateCarBtn.textContent = 'UPDATE';
  setDisabled(state, updateCarBtn);
  updateCar.append(updateCarName, updateCarColor, updateCarBtn);

  return updateCar;
};

export default generateFieldUpdateCar;
