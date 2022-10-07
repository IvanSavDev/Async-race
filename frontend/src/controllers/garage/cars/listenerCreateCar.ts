import { IState, RenderType } from 'Src/types/dataInterfaces';
import { updateCars } from 'Src/utils/utils';
import { createCar, getCars } from 'Src/api';
import { resetCreateOptions } from 'Src/utils/resetParams';

const listenerCreateCar = (state: IState, element: HTMLFormElement, render: RenderType) => {
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
      render(state);
    }
  });
};

export default listenerCreateCar;
