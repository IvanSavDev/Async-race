import { IState, RenderType } from 'Src/types/dataInterfaces';
import { handleResultDriveCar } from 'Src/utils/utils';
import { startCar } from 'Src/api';
import { RaceStatus } from 'Src/enum/enum';

const listenerStartRace = (state: IState, race: HTMLElement, render: RenderType) => {
  race.addEventListener('click', async () => {
    state.uiState.raceStatus = RaceStatus.process;
    render(state);
    const cars = document.querySelectorAll('.car') as NodeListOf<HTMLElement>;
    cars.forEach(async (car) => {
      const idCar = Number(car.getAttribute('id'));
      const { result, time } = await startCar(state, idCar, car);
      if (result) {
        handleResultDriveCar(state, result, idCar, time);
      }
    });
  });
};

export default listenerStartRace;
