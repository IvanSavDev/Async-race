import { IState } from 'Src/types/dataInterfaces';
import { renderBtnsControlCar, renderCarControl } from 'Src/ui/garage/cars/car';

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
  return width * progress;
};

const animate =
  (draw: (img: HTMLElement, progress: number) => number) =>
  (
    element: HTMLElement,
    duration: number,
    animationCar: { id: null | number; drive: boolean; position: number }
  ) => {
    if (animationCar.drive) {
      const start = performance.now();
      animationCar.id = requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        const resultDraw = draw(element, timeFraction);
        animationCar.position = resultDraw;

        if (timeFraction < 1) {
          animationCar.id = requestAnimationFrame(animate);
        }
      });
    }
  };

const animation = animate(draw);

export const activeAnimation = async (
  state: IState,
  car: HTMLElement,
  timeDrive: number
) => {
  const { uiState } = state;
  const animationCar: { id: null | number; drive: boolean; position: number } =
    {
      id: null,
      drive: true,
      position: 0,
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
  animationsCars[idCar].position = 0;
  if (idAnimation) {
    cancelAnimationFrame(idAnimation);
    const { color } = dataCars.cars.find(({ id }) => id === idCar)!;
    renderCarControl(car, color, animationsCars[idCar]);
  }
};

export default animation;
