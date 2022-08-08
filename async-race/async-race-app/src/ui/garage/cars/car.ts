import { IAnimationCar } from 'Src/types/dataInterfaces';
import { getCarImg, getFlagImg } from 'Src/utils/getImgs';
import { createElement } from 'Src/utils/utils';

const generateBtnsEngine = (isDrive: boolean | undefined) => {
  const containerBtns = createElement('div', { class: 'car__btns-control' });
  const carStart = createElement(
    'button',
    { disabled: isDrive ? true : false },
    'A'
  );

  const carStop = createElement(
    'button',
    { disabled: isDrive ? false : true },
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

const generateCarControl = (
  color: string,
  isDrive: boolean | undefined,
  posititon: number
) => {
  const carControlBtn = generateBtnsEngine(isDrive);

  const carControl = document.createElement('div');
  carControl.classList.add('car__control');

  const flagImgContainer = document.createElement('div');
  flagImgContainer.classList.add('car__flag-img');
  flagImgContainer.innerHTML = getFlagImg();
  const carImgContainer = document.createElement('div');
  carImgContainer.classList.add('car__img');
  carImgContainer.innerHTML = getCarImg(color);
  carImgContainer.style.left = `${posititon}px`;
  carControl.append(carControlBtn, carImgContainer, flagImgContainer);

  return carControl;
};

const generateCar = (
  nameCar: string,
  color: string,
  id: number,
  animationCar: IAnimationCar
): HTMLDivElement => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  carContainer.setAttribute('id', String(id));

  const carInfo = generateCarInfo(nameCar);
  const carControl = generateCarControl(
    color,
    animationCar?.drive,
    animationCar?.position
  );

  carContainer.append(carInfo, carControl);

  return carContainer;
};

export const renderCarControl = (
  car: HTMLElement,
  color: string,
  animationCar: IAnimationCar
) => {
  const carControl = car.querySelector('.car__control');
  if (carControl) {
    const newCarControl = generateCarControl(
      color,
      animationCar.drive,
      animationCar.position
    );
    carControl.replaceWith(newCarControl);
  }
};

export const renderBtnsControlCar = (isDrive: boolean, car: HTMLElement) => {
  const btnsControlCar = car.querySelector('.car__btns-control');
  if (btnsControlCar) {
    const newBtnsControlCar = generateBtnsEngine(isDrive);
    btnsControlCar.replaceWith(newBtnsControlCar);
  }
};

export default generateCar;
