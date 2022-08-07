import { getCarImg, getFlagImg } from 'Src/utils/getImgs';
import { createElement } from 'Src/utils/utils';

const generateBtnsEngine = (isDrive: boolean | undefined) => {
  const containerBtns = document.createElement('div');
  containerBtns.classList.add('car__btns-control');
  const carStart = createElement(
    'button',
    isDrive ? { disabled: 'true' } : {},
    'A'
  );

  const carStop = createElement(
    'button',
    isDrive ? {} : { disabled: 'true' },
    'B'
  );

  containerBtns.append(carStart, carStop);

  return containerBtns;
};

const generateCarInfo = (nameCar: string) => {
  const carInfo = document.createElement('div');
  const selectCar = document.createElement('button');
  selectCar.textContent = 'SELECT';

  const removeCar = document.createElement('button');
  removeCar.textContent = 'REMOVE';

  const carName = document.createElement('span');
  carName.classList.add('car__name');
  carName.textContent = nameCar;

  carInfo.append(selectCar, removeCar, carName);

  return carInfo;
};

const generateCarControl = (color: string, isDrive: boolean | undefined) => {
  const carControlBtn = generateBtnsEngine(isDrive);

  const carControl = document.createElement('div');
  carControl.classList.add('car__control');

  const flagImgContainer = document.createElement('div');
  flagImgContainer.classList.add('car__flag-img');
  flagImgContainer.innerHTML = getFlagImg();
  const carImgContainer = document.createElement('div');
  carImgContainer.classList.add('car__img');
  carImgContainer.innerHTML = getCarImg(color);
  carControl.append(carControlBtn, carImgContainer, flagImgContainer);

  return carControl;
};

const generateCar = (
  nameCar: string,
  color: string,
  id: number,
  animationCar: boolean | undefined
): HTMLDivElement => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  carContainer.setAttribute('id', String(id));

  const carInfo = generateCarInfo(nameCar);
  const carControl = generateCarControl(color, animationCar);

  carContainer.append(carInfo, carControl);

  return carContainer;
};

export const renderCarControl = (
  car: HTMLElement,
  color: string,
  isDrive: boolean | undefined
) => {
  const carControl = car.querySelector('.car__control')!;
  const newCarControl = generateCarControl(color, isDrive);
  carControl.replaceWith(newCarControl);
};

export const renderBtnsControlCar = (isDrive: boolean, car: HTMLElement) => {
  const btnsControlCar = car.querySelector('.car__btns-control')!;
  const newbtnsControlCar = generateBtnsEngine(isDrive);
  btnsControlCar.replaceWith(newbtnsControlCar);
};

export default generateCar;

// carStart.textContent = 'A';
// if (isDrive) {
//   carStart.setAttribute('disabled', '');
// } else {
//   carStart.removeAttribute('disabled');
// }

// const carStop = document.createElement('button');
// carStop.textContent = 'B';
// if (!isDrive) {
//   carStop.setAttribute('disabled', '');
// } else {
//   carStop.removeAttribute('disabled');
// }
