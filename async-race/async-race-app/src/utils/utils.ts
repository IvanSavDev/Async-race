import {
  createWinner,
  getCar,
  getCars,
  getWinner,
  getWinners,
  getRaceData,
  stopCar,
  updateWinner,
} from 'Src/api';
import renderControlRace from 'Src/view/garage/renderControlRace';
import { ICar, ICarWinnerUpdate, IState } from 'Src/types/dataInterfaces';
import { COUNT_MSEC_IN_SEC } from './time';

export const MAX_CARS_ON_WINNERS_PAGE = 10;
export const MAX_CARS_ON_GARAGE_PAGE = 7;

export const calculateAllPagesGarage = (state: IState) => (
  Math.ceil(state.dataCars.count / MAX_CARS_ON_GARAGE_PAGE)
);
export const calculateAllPagesWinners = (state: IState) => (
  Math.ceil(state.dataWinners.count / MAX_CARS_ON_WINNERS_PAGE)
);

export const createElement = (
  elementName: string,
  attrs: { [key: string]: string | boolean } = {},
  text = '',
) => {
  const element = document.createElement(elementName);
  Object.keys(attrs).forEach((key) => {
    if (typeof attrs[key] === 'boolean') {
      if (!attrs[key] === false) {
        element.setAttribute(key, key);
      }
    } else {
      element.setAttribute(key, String(attrs[key]));
    }
  });
  element.innerHTML = text;
  return element;
};

const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const getTimeDriveCar = async (idCar: number) => {
  const { velocity, distance } = await getRaceData(idCar);
  const timeDrive = distance / velocity;
  const timeDriveInSeconds = Number((timeDrive / COUNT_MSEC_IN_SEC).toFixed(2));
  return timeDriveInSeconds;
};

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
  const carModels = [
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
      name: `${carModels[index]} ${nameCars[index]}`,
      color: randomColor(),
    };
  });
};

export const updateCars = async (state: IState) => {
  const result = await getCars(state.garagePage);
  state.dataCars = result;
  state.uiState.garageAllPage = calculateAllPagesGarage(state);
};

export const updateWinners = async (state: IState) => {
  const { winnersPage, sortCategory, sortType } = state;
  const dataWinners = await getWinners(winnersPage, sortCategory, sortType);
  const requestCarsWinners = dataWinners.winners.map(async (car) => {
    const matchCar = await getCar(car.id);
    return {
      ...matchCar,
      ...car,
    };
  });
  const result = await Promise.allSettled(requestCarsWinners);
  const carsWinners = result
    .filter(({ status }) => status === 'fulfilled')
    .map((car) => (car as PromiseFulfilledResult<ICarWinnerUpdate>).value);
  state.dataWinners.winners = carsWinners;
  state.dataWinners.count = dataWinners.count;
  state.uiState.winnersAllPage = calculateAllPagesWinners(state);
};

export const handleResultDriveCar = async (
  state: IState,
  result: number,
  idCar: number,
  time: number,
) => {
  const {
    uiState: { animationsCars },
    uiState,
    dataCars: { cars },
  } = state;
  const animationId = animationsCars[idCar].id;
  const isDrive = animationsCars[idCar].drive;
  if (result === 500 && animationId) {
    cancelAnimationFrame(animationId);
    uiState.animationsCars[idCar].drive = false;
    stopCar(idCar);
  }

  if (result === 200 && uiState.raceStatus === 'process' && isDrive) {
    uiState.raceStatus = 'finished';
    const currentCar = cars.find(({ id }) => id === idCar) as ICar;
    alert(`${currentCar.name} wont first! Time: ${time}`);
    renderControlRace(state);
    const winner = await getWinner(idCar);
    if (winner) {
      const { wins } = winner;
      const bestTime = Math.min(winner.time, time);
      await updateWinner(idCar, wins + 1, bestTime);
    } else {
      await createWinner(idCar, 1, time);
    }
  }
};
