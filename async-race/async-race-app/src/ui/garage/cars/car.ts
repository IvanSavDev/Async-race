import { getCarImg, getFlagImg } from 'Src/utils/getImgs';

const generateCar = (
  nameCar: string,
  color: string,
  id: number,
  animationsIds: {
    [key: number]: {
      id: number | null;
    };
  }
): HTMLDivElement => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  carContainer.setAttribute('id', String(id));
  const container = document.createElement('div');
  const selectCar = document.createElement('button');
  selectCar.textContent = 'SELECT';
  const removeCar = document.createElement('button');
  removeCar.textContent = 'REMOVE';
  const carName = document.createElement('span');
  carName.classList.add('car__name');
  carName.textContent = nameCar;
  container.append(selectCar, removeCar, carName);

  const isDrive = Boolean(animationsIds[id]);
  const controlCar = document.createElement('div');
  controlCar.classList.add('car__container-control');
  const containerBtns = document.createElement('div');
  const carStart = document.createElement('button');
  carStart.textContent = 'A';
  if (isDrive) {
    carStart.setAttribute('disabled', '');
  } else {
    carStart.removeAttribute('disabled');
  }
  const carStop = document.createElement('button');
  carStop.textContent = 'B';
  if (!isDrive) {
    carStop.setAttribute('disabled', '');
  } else {
    carStop.removeAttribute('disabled');
  }
  containerBtns.append(carStart, carStop);
  const flagImgContainer = document.createElement('div');
  flagImgContainer.classList.add('flag-img');
  flagImgContainer.innerHTML = getFlagImg();
  const carImgContainer = document.createElement('div');
  carImgContainer.classList.add('car-img');
  carImgContainer.innerHTML = getCarImg(color);

  controlCar.append(containerBtns, carImgContainer, flagImgContainer);
  carContainer.append(container, controlCar);

  return carContainer;
};

export default generateCar;
