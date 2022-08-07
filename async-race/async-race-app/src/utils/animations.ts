import {
  createWinner,
  driveCar,
  getWinners,
  startCar,
  stopCar,
  updateWinner,
} from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import { renderCarControl } from 'Src/ui/garage/cars/car';
import { renderControlRace } from 'Src/ui/garage/controlRace';

const draw = (img: HTMLElement, progress: number) => {
  const widthBtnsContainerCar = 55;
  const widthCar = 100;
  const widthGap = 40;
  const widthMarginRight = 20;
  const width =
    document.documentElement.clientWidth -
    widthBtnsContainerCar -
    widthCar -
    widthGap -
    widthMarginRight;
  img.style.left = `${width * progress}px`;
};

export const animate =
  (draw: (img: HTMLElement, progress: number) => void) =>
  (
    element: HTMLElement,
    duration: number,
    animationStop: { id: null | number }
  ) => {
    const start = performance.now();
    animationStop.id = requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      draw(element, timeFraction);

      if (timeFraction < 1) {
        animationStop.id = requestAnimationFrame(animate);
      }
    });
  };

const animation = animate(draw);

export const activeAnimation = async (
  state: IState,
  car: HTMLElement,
  recordWinner: boolean
) => {
  try {
    const { dataCars, uiState } = state;
    const animationCar: { id: null | number; drive: boolean } = {
      id: null,
      drive: true,
    };
    const idCar = Number(car.getAttribute('id'));
    uiState.animationsCars[idCar] = animationCar;
    const currentCar = dataCars.cars.find(({ id }) => id === idCar)!;
    renderCarControl(car, currentCar.color, animationCar.drive);
    const { velocity, distance } = await startCar(idCar);
    const timeDrive = distance / velocity;
    const currentCarImg = car.querySelector('.car__img') as HTMLElement;
    animation(currentCarImg, timeDrive, animationCar);
    const result = await driveCar(idCar);
    if (result === 500 && animationCar.id) {
      cancelAnimationFrame(animationCar.id);
      uiState.animationsCars[idCar].drive = false;
      stopCar(idCar);
    }

    if (result === 200 && recordWinner && uiState.animationsCars[idCar].drive) {
      const lastWinner = uiState.lastWinner;
      if (lastWinner) {
        return;
      }
      const timeInSeconds = Math.round(timeDrive / 1000);
      alert(`${currentCar.name} wont first! Time: ${timeInSeconds}`);
      uiState.lastWinner = idCar;
      uiState.raceStatus = 'finished';
      renderControlRace(state);
      const winner = state.dataWinners.winners.find(({ id }) => id === idCar);
      if (winner) {
        const { wins } = winner;
        console.log('update');
        const bestTime =
          winner.time > timeInSeconds ? timeInSeconds : winner.time;
        await updateWinner(idCar, wins + 1, bestTime);
      } else {
        console.log('create');
        await createWinner(idCar, 1, timeInSeconds);
      }
    }
  } catch (error) {
    console.log('error active animation', error);
  }
};

export const stopAnimation = async (
  state: IState,
  car: HTMLElement,
  idCar: number
) => {
  try {
    const { uiState } = state;
    uiState.animationsCars[idCar].drive = false;
    await stopCar(idCar);
    const idAnimation = uiState.animationsCars[idCar].id;
    if (idAnimation) {
      cancelAnimationFrame(idAnimation);
      const { color } = state.dataCars.cars.find(({ id }) => id === idCar)!;
      renderCarControl(car, color, uiState.animationsCars[idCar].drive);
    }
  } catch (error) {
    console.log('error stop animation', error);
  }
};

export default animation;
