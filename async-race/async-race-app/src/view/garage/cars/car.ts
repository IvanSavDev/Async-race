import { IAnimationCar } from 'Src/types/dataInterfaces';
import { getCarImg, getFlagImg } from 'Src/utils/getImgs';
import { createElement } from 'Src/utils/utils';

export const generateButtonsEngine = (isDrive: boolean | undefined) => {
  const containerButtons = createElement('div', { class: 'car__buttons-control' });
  const carStart = createElement(
    'button',
    { disabled: !!isDrive },
    'A',
  );

  const carStop = createElement(
    'button',
    { disabled: !isDrive },
    'B',
  );

  containerButtons.append(carStart, carStop);

  return containerButtons;
};

const generateCarInfo = (nameCar: string) => {
  const carInfo = document.createElement('div');
  const selectCar = createElement('button', {}, 'SELECT');
  const removeCar = createElement('button', {}, 'REMOVE');
  const carName = createElement('span', { class: 'car__name' }, nameCar);
  carInfo.append(selectCar, removeCar, carName);

  return carInfo;
};

export const generateCarControl = (
  color: string,
  isDrive: boolean | undefined,
  posititon: number,
) => {
  const carControlButton = generateButtonsEngine(isDrive);
  const carControl = createElement('div', { class: 'car__control' });
  const flagImgContainer = createElement('div', { class: 'car__flag-img' }, getFlagImg());
  const carImgContainer = createElement(
    'div',
    { class: 'car__img', style: `left: ${posititon}px` },
    getCarImg(color),
  );
  carControl.append(carControlButton, carImgContainer, flagImgContainer);

  return carControl;
};

const generateCar = (
  nameCar: string,
  color: string,
  id: number,
  animationCar: IAnimationCar,
): HTMLElement => {
  const carContainer = createElement('div', { class: 'car', id: String(id) });
  const carInfo = generateCarInfo(nameCar);
  const carControl = generateCarControl(
    color,
    animationCar?.drive,
    animationCar?.position,
  );

  carContainer.append(carInfo, carControl);

  return carContainer;
};

export default generateCar;
