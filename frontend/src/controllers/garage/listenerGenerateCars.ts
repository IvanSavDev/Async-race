import { IState, RenderType } from 'Src/types/dataInterfaces';
import {
  generateOneHundredCars,
  updateCars,
  calculateAllPagesGarage,
} from 'Src/utils/utils';
import { createCar } from 'Src/api';

const listenerGenerateCars = (
  state: IState,
  generateCarsButton: HTMLElement,
  render: RenderType,
) => {
  generateCarsButton.addEventListener('click', async () => {
    const createCars = generateOneHundredCars().map((car) => createCar(car));
    await Promise.all(createCars);
    await updateCars(state);
    state.uiState.garageAllPage = calculateAllPagesGarage(state);
    render(state);
  });
};

export default listenerGenerateCars;
