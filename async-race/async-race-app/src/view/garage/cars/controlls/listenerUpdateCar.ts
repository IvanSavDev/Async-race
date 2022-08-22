import { IState, RenderType } from 'Src/types/dataInterfaces';
import { updateCar } from 'Src/api';
import { resetUpdateOptions } from 'Src/utils/resetParams';
import { updateCars } from 'Src/utils/utils';

const listenerUpdateCar = (state: IState, element: HTMLDivElement, render: RenderType) => {
  element.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.text.value;
    const color = form.color.value;
    const selectCar = state.uiState.selectCar as number;
    await updateCar(selectCar, name, color);
    await updateCars(state);
    resetUpdateOptions(state);
    render(state);
  });
};

export default listenerUpdateCar;
