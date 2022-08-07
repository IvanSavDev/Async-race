import { createWinner, startCarRequest, stopCar, updateWinner } from 'Src/api';
import { IState } from 'Src/types/dataInterfaces';
import { renderBtnsControlCar, renderCarControl } from 'Src/ui/garage/cars/car';
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

const animate =
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

export const handleResultDriveCar = async (
  state: IState,
  result: number,
  idCar: number,
  time: number
) => {
  const { uiState } = state;
  const animationId = state.uiState.animationsCars[idCar].id;
  if (result === 500 && animationId) {
    cancelAnimationFrame(animationId);
    uiState.animationsCars[idCar].drive = false;
    stopCar(idCar);
  }

  if (result === 200 && uiState.raceStatus === 'process') {
    uiState.raceStatus = 'finished';
    const currentCar = state.dataCars.cars.find(({ id }) => id === idCar)!;
    alert(`${currentCar.name} wont first! Time: ${time}`);
    renderControlRace(state);
    const winner = state.dataWinners.winners.find(({ id }) => id === idCar);
    if (winner) {
      const { wins } = winner;
      const bestTime = winner.time > time ? time : winner.time;
      await updateWinner(idCar, wins + 1, bestTime);
    } else {
      await createWinner(idCar, 1, time);
    }
  }
};

export const activeAnimation = async (
  state: IState,
  car: HTMLElement,
  timeDrive: number
) => {
  const { uiState } = state;
  const animationCar: { id: null | number; drive: boolean } = {
    id: null,
    drive: true,
  };
  const idCar = Number(car.getAttribute('id'));
  uiState.animationsCars[idCar] = animationCar;
  renderBtnsControlCar(animationCar.drive, car);
  const currentCarImg = car.querySelector('.car__img') as HTMLElement;
  animation(currentCarImg, timeDrive, animationCar);
};

export const stopAnimation = async (
  state: IState,
  car: HTMLElement,
  idCar: number
) => {
  const {
    uiState: { animationsCars },
    dataCars,
  } = state;
  animationsCars[idCar].drive = false;
  const idAnimation = animationsCars[idCar].id;
  if (idAnimation) {
    cancelAnimationFrame(idAnimation);
    const { color } = dataCars.cars.find(({ id }) => id === idCar)!;
    const isDrive = animationsCars[idCar].drive;
    renderCarControl(car, color, isDrive);
  }
};

export default animation;
