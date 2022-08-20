import { SortCategory, SortTypes } from './enum/enum';
import {
  ICar,
  ICars,
  ICarsWinners,
  ICarWinner,
  IState,
} from './types/dataInterfaces';
import { animateCar } from './utils/animations';
import { getSecFromMsec } from './utils/time';
import { getTimeDriveCar, MAX_CARS_ON_WINNERS_PAGE, MAX_CARS_ON_GARAGE_PAGE } from './utils/utils';

const apiBasePath = 'http://localhost:3000';

const garagePath = `${apiBasePath}/garage`;
const winnersPath = `${apiBasePath}/winners`;
const enginePath = `${apiBasePath}/engine`;

export const getCars = async (page = 1, limit = MAX_CARS_ON_GARAGE_PAGE): Promise<ICars> => {
  const response = await fetch(`${garagePath}?_page=${page}&_limit=${limit}`);
  const carsCount = response.headers.get('X-Total-Count');
  const carsData = await response.json();
  return {
    cars: carsData,
    count: Number(carsCount),
  };
};

export const getCar = async (id: number): Promise<ICar | Record<string, unknown>> => {
  const response = await fetch(`${garagePath}/${id}`);
  const carData = await response.json();
  return carData;
};

export const createCar = async (insertDataCar: {
  name: string;
  color: string;
}): Promise<ICar> => {
  const response = await fetch(`${garagePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insertDataCar),
  });
  const carData = await response.json();
  return carData;
};

export const deleteCar = async (id: number): Promise<Record<string, unknown>> => {
  const response = await fetch(`${garagePath}/${id}`, {
    method: 'DELETE',
  });
  const carData = await response.json();
  return carData;
};

export const updateCar = async (
  id: number,
  name: string,
  color: string,
): Promise<ICar | Record<string, unknown>> => {
  const response = await fetch(`${garagePath}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });
  const carData = await response.json();
  return carData;
};

export const driveCar = async (
  id: number,
  signal: AbortSignal,
): Promise<number> => {
  try {
    const response = await fetch(`${enginePath}?id=${id}&status=drive`, {
      method: 'PATCH',
      signal,
    });
    return response.status;
  } catch (error) {
    const codeError = (error as DOMException).code;
    return codeError;
  }
};

export const startCar = async (
  state: IState,
  idCar: number,
  car: HTMLElement,
) => {
  const timeInSeconds = await getTimeDriveCar(idCar);
  const timeInMilliSeconds = getSecFromMsec(timeInSeconds);
  animateCar(state, car, timeInMilliSeconds);
  const result = await driveCar(idCar, state.controller.signal);
  return {
    result,
    time: timeInSeconds,
  };
};

export const startCarRequest = async (
  id: number,
): Promise<{ velocity: number; distance: number }> => {
  const response = await fetch(`${enginePath}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const carData = await response.json();
  return carData;
};

export const stopCar = async (id: number) => {
  const response = await fetch(`${enginePath}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const carData = await response.json();
  return carData;
};

export const getWinner = async (id: number): Promise<ICarWinner | null> => {
  const response = await fetch(`${winnersPath}/${id}`);
  if (response.status === 404) {
    return null;
  }
  const carData = await response.json();
  return carData;
};

export const getWinners = async (
  page = 1,
  sort = SortCategory.wins,
  order = SortTypes.ASC,
  limit = MAX_CARS_ON_WINNERS_PAGE,
): Promise<ICarsWinners> => {
  const response = await fetch(
    `${winnersPath}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const carsCount = response.headers.get('X-Total-Count');
  const carsData = await response.json();
  return {
    winners: carsData,
    count: Number(carsCount),
  };
};

export const createWinner = async (
  id: number,
  wins: number,
  time: number,
): Promise<ICarWinner> => {
  const response = await fetch(`${winnersPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, wins, time }),
  });
  const carData = await response.json();
  return carData;
};

export const deleteWinner = async (id: number): Promise<Record<string, unknown>> => {
  const response = await fetch(`${winnersPath}/${id}`, {
    method: 'DELETE',
  });
  const carData = await response.json();
  return carData;
};

export const updateWinner = async (
  id: number,
  wins: number,
  time: number,
): Promise<ICarWinner | Record<string, unknown>> => {
  const response = await fetch(`${winnersPath}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  });
  const carData = await response.json();
  return carData;
};
