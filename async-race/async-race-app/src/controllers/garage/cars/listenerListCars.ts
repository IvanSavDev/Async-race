import {
  deleteCar, deleteWinner, stopCar, startCar,
} from 'Src/api';
import { ICar, IState, RenderType } from 'Src/types/dataInterfaces';
import { updateCars } from 'Src/utils/utils';
import { stopAnimateCar } from 'Src/utils/animations';

const listenerListCars = (state: IState, element: HTMLElement, render: RenderType) => {
  element.addEventListener('click', async ({ target }) => {
    const {
      dataCars, uiState, updateCar, garagePage,
    } = state;
    const selectedElement = target as HTMLElement;
    const containerCar = selectedElement.closest('.car') as HTMLElement;
    if (!containerCar) return;
    const idCar = Number(containerCar.getAttribute('id'));
    const { name, color } = dataCars.cars.find(({ id }) => id === idCar) as ICar;
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'SELECT'
    ) {
      uiState.selectCar = idCar;
      updateCar.color = color;
      updateCar.name = name;
      render(state);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'REMOVE'
    ) {
      await deleteCar(idCar);
      await deleteWinner(idCar);
      delete state.uiState.animationsCars[idCar];
      if (dataCars.cars.length === 1 && garagePage !== 1) {
        state.garagePage -= 1;
      }
      await updateCars(state);
      render(state);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'A'
    ) {
      await startCar(state, idCar, containerCar);
    }
    if (
      selectedElement.tagName === 'BUTTON'
      && selectedElement.textContent === 'B'
    ) {
      state.controller.abort();
      state.controller = new AbortController();
      await stopCar(idCar);
      stopAnimateCar(state, containerCar, idCar);
    }
  });
};

export default listenerListCars;
