import { ICar, IState } from 'Src/dataInterfaces';
import { getCarImg, getFlagImg } from '../getImgs';

// return `
//   <form class="create-car">
//     <input type="text" class="create-car__text">
//     <input type="color" value="#ffffff" class="create-car__color">
//     <button>CREATE</button>
//   </form>
//   <form class="update-car">
//     <input type="text" class="update-car__text">
//     <input type="color" value="#ffffff" class="update-car__color">
//     <button>UPDATE</button>
//   </form>
//   <div class="control-race">
//     <button class="control-race__start">RACE</button>
//     <button class="control-race__reset">RESET</button>
//     <button class="control-race__generate">GENERATE CARS</button>
//   </div>`;

const generateControlPanel = (state: IState) => {
  const fragment = new DocumentFragment();
  const { createCar: create, updateCar: update } = state;

  const createCar = document.createElement('form');
  createCar.classList.add('create-car');
  const createCarName = document.createElement('input');
  createCarName.setAttribute('type', 'text');
  createCarName.setAttribute('class', 'create-car__text');
  createCarName.setAttribute('value', create.name);
  const createCarColor = document.createElement('input');
  createCarColor.setAttribute('type', 'color');
  createCarColor.setAttribute('class', 'create-car__color');
  createCarColor.setAttribute('value', create.color);
  const createCarBtn = document.createElement('button');
  createCarBtn.textContent = 'CREATE';
  createCarBtn.addEventListener('click', () => {});
  createCar.append(createCarName, createCarColor, createCarBtn);

  const updateCar = document.createElement('form');
  updateCar.classList.add('update-car');
  const updateCarName = document.createElement('input');
  updateCarName.setAttribute('type', 'text');
  updateCarName.setAttribute('class', 'create-car__text');
  updateCarName.setAttribute('value', update.name);
  const updateCarColor = document.createElement('input');
  updateCarColor.setAttribute('type', 'color');
  updateCarColor.setAttribute('class', 'create-car__color');
  updateCarColor.setAttribute('value', update.color);
  const updateCarBtn = document.createElement('button');
  updateCarBtn.textContent = 'UPDATE';
  updateCarBtn.addEventListener('click', () => {});
  updateCar.append(updateCarName, updateCarColor, updateCarBtn);

  const controlRace = document.createElement('div');
  controlRace.classList.add('control-race');
  const race = document.createElement('button');
  race.classList.add('control-race__start');
  race.textContent = 'RACE';
  race.addEventListener('click', () => {});
  const reset = document.createElement('button');
  reset.classList.add('control-race__reset');
  reset.textContent = 'RESET';
  reset.addEventListener('click', () => {});
  const generateCars = document.createElement('button');
  generateCars.classList.add('control-race__generate');
  generateCars.textContent = 'GENERATE CARS';
  generateCars.addEventListener('click', () => {});
  controlRace.append(race, reset, generateCars);

  fragment.append(createCar, updateCar, controlRace);
  return fragment;
};

const generateCar = (nameCar: string, imgCar: string, imgFlag: string) => {
  const carContainer = document.createElement('div');
  carContainer.classList.add('car');
  const container = document.createElement('div');
  const selectCar = document.createElement('button');
  selectCar.textContent = 'SELECT';
  const removeCar = document.createElement('button');
  removeCar.textContent = 'REMOVE';
  const carName = document.createElement('span');
  carName.classList.add('car__name');
  carName.textContent = nameCar;
  container.append(selectCar, removeCar, carName);

  const controlCar = document.createElement('div');
  controlCar.classList.add('car__contrainer-control');
  const containerBtns = document.createElement('div');
  const carStart = document.createElement('button');
  carStart.textContent = 'A';
  const carStop = document.createElement('button');
  carStop.textContent = 'B';
  containerBtns.append(carStart, carStop);
  const flagImgContainer = document.createElement('div');
  flagImgContainer.classList.add('flag-img');
  flagImgContainer.innerHTML = imgFlag;

  const carImgContainer = document.createElement('div');
  carImgContainer.innerHTML = imgCar;

  controlCar.append(containerBtns, carImgContainer, flagImgContainer); // ты тут добавил строку вместо узла
  carContainer.append(container, controlCar);

  return carContainer;

  // return `
  //   <div class="car">
  //     <div>
  //       <button class="car__select">SELECT</button>
  //       <button class="car__remove">REMOVE</button>
  //       <span class="car__name">${nameCar}</span>
  //     </div>
  //     <div class="car__contrainer-control">
  //       <div>
  //         <button class="car__start">A</button>
  //         <button class="car__stop">B</button>
  //       </div>
  //       ${imgCar}
  //       <div class="flag-img">
  //         ${getFlagImg()}
  //       </div>
  //     </div>
  //   </div>`;
};

const generateListCars = (
  cars: Array<HTMLDivElement>,
  countCars: number,
  page: number
) => {
  const container = document.createElement('div');
  const garageCount = document.createElement('h2');
  garageCount.textContent = `Garage (${countCars})`;
  const pageCount = document.createElement('h3');
  pageCount.textContent = `Page #${page}`;
  const listCars = document.createElement('div');
  listCars.classList.add('list-cars');
  listCars.append(...cars);
  container.append(garageCount, pageCount, listCars);
  return container;
  // return `
  //   <div>
  //     <h2>Garage (${countCars})</h2>
  //     <h3>Page #${page}</h3>
  //     <div class="list-cars">
  //       ${cars.join('')}
  //     </div>
  //   </div>`;
};

const generateGarage = (state: IState) => {
  const {
    dataCars: { cars, count },
    uiState: { garagePage },
  } = state;

  const garage = document.createElement('div');
  garage.classList.add('garage');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  const prevPage = document.createElement('button');
  prevPage.textContent = 'PREV';
  const nextPage = document.createElement('button');
  nextPage.textContent = 'NEXT';
  pagination.append(prevPage, nextPage);
  garage.append(
    generateControlPanel(state),
    generateListCars(
      cars.map((car) =>
        generateCar(car.name, getCarImg(car.color), getFlagImg())
      ),
      count,
      garagePage
    ),
    pagination
  );
  return garage;

  // return `
  //   <div class="garage">
  //     ${generateControlPanel(state)}
  //     ${generateListCars(
  //       cars.map((car) =>
  //         generateCar(car.name, getCarImg(car.color), getFlagImg())
  //       ),
  //       count,
  //       garagePage
  //     )}
  //     <div class="pagination">
  //       <button class="pagination__prev">PREV</button>
  //       <button class="pagination_next">NEXT</button>
  //     </div>
  //   </div>`;
};

const renderGarage = (state: IState) => {
  const app = document.querySelector('.container-app')!;
  app.replaceChildren(generateGarage(state));
};

export default renderGarage;
