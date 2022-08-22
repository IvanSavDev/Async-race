import { ICar, IState } from 'Src/types/dataInterfaces';
import renderButtonsControlCar from 'Src/view/garage/cars/renderButtonsControlCar';
import renderCarControl from 'Src/view/garage/cars/renderCarControl';

const draw = (img: HTMLElement, progress: number) => {
  const widthButtonsControlCar = 55;
  const widthCar = 100;
  const widthGap = 40;
  const widthMarginRight = 20;
  const widthTrack = document.documentElement.clientWidth;
  const width = widthTrack - widthButtonsControlCar - widthCar - widthGap - widthMarginRight;
  img.style.left = `${width * progress}px`;
  return width * progress;
};

const animate = (drawAnimation: (img: HTMLElement, progress: number) => number) => (
  element: HTMLElement,
  duration: number,
  animationCar: { id: null | number; drive: boolean; position: number },
) => {
  if (animationCar.drive) {
    const start = performance.now();
    animationCar.id = requestAnimationFrame(function animateStart(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const resultDraw = drawAnimation(element, timeFraction);
      animationCar.position = resultDraw;

      if (timeFraction < 1) {
        animationCar.id = requestAnimationFrame(animateStart);
      }
    });
  }
};

const animation = animate(draw);

export const animateCar = async (
  state: IState,
  car: HTMLElement,
  timeDrive: number,
) => {
  const { uiState } = state;
  const animationCar: { id: null | number; drive: boolean; position: number } = {
    id: null,
    drive: true,
    position: 0,
  };
  const idCar = Number(car.getAttribute('id'));
  uiState.animationsCars[idCar] = animationCar;
  renderButtonsControlCar(animationCar.drive, car);
  const currentCarImg = car.querySelector('.car__img') as HTMLElement;
  animation(currentCarImg, timeDrive, animationCar);
};

export const stopAnimation = async (
  state: IState,
  car: HTMLElement,
  idCar: number,
) => {
  const {
    uiState: { animationsCars },
    dataCars,
  } = state;
  animationsCars[idCar].drive = false;
  const idAnimation = animationsCars[idCar].id;
  animationsCars[idCar].position = 0;
  if (idAnimation) {
    cancelAnimationFrame(idAnimation);
    const { color } = dataCars.cars.find(({ id }) => id === idCar) as ICar;
    renderCarControl(car, color, animationsCars[idCar]);
  }
};

export default animation;
