import { IState, RenderType } from 'Src/types/dataInterfaces';
import { stopCar } from 'Src/api';
import { stopAnimateCar } from 'Src/utils/animations';
import { RaceStatus } from 'Src/enum/enum';

const listenerStopRace = (state: IState, resetBtn: HTMLElement, render: RenderType) => {
  resetBtn.addEventListener('click', async () => {
    state.controller.abort();
    render(state);
    state.controller = new AbortController();
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    const animations = Array.from(cars).map(async (car) => {
      const idCar = Number(car.getAttribute('id'));
      await stopCar(idCar);
      stopAnimateCar(state, car, idCar);
    });
    await Promise.allSettled(animations);
    state.uiState.raceStatus = RaceStatus.start;
    render(state);
  });
};

export default listenerStopRace;
