import { getCars } from 'Src/api';
import renderGarage from 'Src/ui/garage/garagePage';
import { IState } from '../types/dataInterfaces';

export const resetCreateOptions = (state: IState) => {
  state.createCar.color = '#ffffff';
  state.createCar.name = '';
};

export const resetUpdateOptions = (state: IState) => {
  state.updateCar.color = '#ffffff';
  state.updateCar.name = '';
  state.uiState.selectCar = null;
};

export const resetControlRaceOptions = (state: IState) => {
  state.createCar.color = '#ffffff';
  state.createCar.name = '';
  state.updateCar.color = '#ffffff';
  state.updateCar.name = '';
  state.uiState.selectCar = null;
};

export const calculateAllPagesGarage = (state: IState) => {
  const maxPages = 7;
  return Math.ceil(state.dataCars.count / maxPages);
};

export const calculateAllPagesWinners = (state: IState) => {
  const maxPages = 10;
  return Math.ceil(state.dataWinners.count / maxPages);
};

export const loadCars = async (state: IState) => {
  if (state.dataCars.cars.length === 0 && state.uiState.garagePage !== 1) {
    state.uiState.garagePage -= 1;
  }
  const currentPage = state.uiState.garagePage;
  const dataCars = await getCars(currentPage);
  if (dataCars) {
    state.dataCars = dataCars;
  }
};

// enum nameCars {
//   Niva = 'Niva',
//   Creta = 'Creta',
//   Logan = 'Logan',
//   A5 = 'A5',
//   Vesta = 'Vesta',
//   Rapid = 'Rapid',
//   Solaris = 'Solaris',
//   Rio = 'Rio',
//   Q5 = 'Q5',
//   K5 = 'K5',
// }

// enum ModelsCars {
//   Lada = 'Lada',
//   Kia = 'Kia',
//   Hyundai = 'Hyundai',
//   Volkswagen = 'Volkswagen',
//   Skoda = 'Skoda',
//   BMW = 'BMW',
//   Audi = 'Audi',
//   Mersedes = 'Mersedes',
//   Reno = 'Reno',
//   Datsun = 'Datsun',
// }

const nameCars = [
  'Niva',
  'Creta',
  'Logan',
  'A5',
  'Vesta',
  'Rapid',
  'Solaris',
  'Rio',
  'Q5',
  'K5',
];
const modeslCars = [
  'Lada',
  'Kia',
  'Hyundai',
  'Volkswagen',
  'Skoda',
  'BMW',
  'Audi',
  'Mersedes',
  'Reno',
  'Datsun',
];

const getRandomNumber = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const generateOneHundredCars = () => {
  const elements = new Array(100).fill(1);
  return elements.map(() => {
    const index = getRandomNumber(0, 9);
    return {
      name: `${modeslCars[index]} ${nameCars[index]}`,
      color: randomColor(),
    };
  });
};

export const setAttributes = (
  element: HTMLElement,
  attrs: { [key: string]: string }
) => Object.keys(attrs).forEach((key) => element.setAttribute(key, attrs[key]));

export const createElement = (
  elementName: string,
  attrs: { [key: string]: string } = {},
  text: string = ''
) => {
  const element = document.createElement(elementName);
  Object.keys(attrs).forEach((key) => element.setAttribute(key, attrs[key]));
  element.innerHTML = text;
  return element;
};

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
      // timeFraction изменяется от 0 до 1
      // console.log(time, start);
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      draw(element, timeFraction); // отрисовать её

      if (timeFraction < 1) {
        animationStop.id = requestAnimationFrame(animate);
      }
    });
  };

const animation = animate(draw);

export { animation };
