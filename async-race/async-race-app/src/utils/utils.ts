import {
  driveCar,
  getCar,
  getCars,
  getWinners,
  startCarRequest,
} from 'Src/api';
import { ICar, IState } from '../types/dataInterfaces';
import { activeAnimation, handleResultDriveCar } from './animations';
import { COUNT_MSEC_IN_SEC, getSecFromMsec } from './timeValues';
import { calculateAllPagesWinners } from './calculatePages';

export const getTimeDriveCar = async (idCar: number) => {
  const { velocity, distance } = await startCarRequest(idCar);
  const timeDrive = distance / velocity;
  const timeDriveInSeconds = Number((timeDrive / COUNT_MSEC_IN_SEC).toFixed(2));
  console.log(timeDriveInSeconds);
  return timeDriveInSeconds;
};

const getRandomNumber = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const generateOneHundredCars = () => {
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

export const getDataWinners = async (currentPage: number) => {
  const dataWinners = await getWinners(currentPage);
  const requestCarsWinners = dataWinners.winners.map((car) =>
    Promise.resolve(getCar(car.id))
  );
  const result = await Promise.allSettled(requestCarsWinners);
  const carsWinners = result
    .filter(({ status }) => status === 'fulfilled')
    .map((car) => (car as PromiseFulfilledResult<ICar>).value);
  const carsWinnersUpdate = carsWinners.map((car) => {
    const winnersData = dataWinners.winners.find(({ id }) => id === car.id)!;
    return {
      ...winnersData,
      ...car,
    };
  });
  return {
    winners: carsWinnersUpdate,
    count: dataWinners.count,
  };
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

export const startCar = async (
  state: IState,
  idCar: number,
  car: HTMLElement
) => {
  const timeInSeconds = await getTimeDriveCar(idCar);
  const timeInMsec = getSecFromMsec(timeInSeconds);
  activeAnimation(state, car, timeInMsec);
  const result = await driveCar(idCar);
  handleResultDriveCar(state, result, idCar, timeInSeconds);
};

export const updateWinners = async (state: IState) => {
  const {
    uiState: { winnersPage },
    sortCategory,
    sortType,
  } = state;
  const dataWinners = await getWinners(winnersPage, sortCategory, sortType);
  const requestCarsWinners = dataWinners.winners.map((car) =>
    Promise.resolve(getCar(car.id))
  );
  const result = await Promise.allSettled(requestCarsWinners);
  const carsWinners = result
    .filter(({ status }) => status === 'fulfilled')
    .map((car) => (car as PromiseFulfilledResult<ICar>).value);
  const carsWinnersUpdate = carsWinners.map((car) => {
    const winnersData = dataWinners.winners.find(({ id }) => id === car.id)!;
    return {
      ...winnersData,
      ...car,
    };
  });
  state.dataWinners.winners = carsWinnersUpdate;
  state.dataWinners.count = dataWinners.count;
  state.uiState.winnersAllPage = calculateAllPagesWinners(state);
};
