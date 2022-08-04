import { ICar, ICars, ICarsWinners } from './dataInterfaces';

const apiBasePath = 'http://localhost:3000';

const garagePath = `${apiBasePath}/garage`;
const winnersPath = `${apiBasePath}/winners`;
const enginePath = `${apiBasePath}/engine`;

export const getCars = async (
  page = 1,
  limit = 7
): Promise<ICars | undefined> => {
  try {
    const response = await fetch(`${garagePath}?_page=${page}&_limit=${limit}`);
    const countCars = response.headers.get('X-Total-Count');
    const dataCars = await response.json();
    return {
      cars: dataCars,
      count: Number(countCars),
    };
  } catch (e) {
    console.log(e);
  }
};

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${garagePath}/${id}`);
  const dataCar = await response.json();
  return dataCar;
};

export const createCar = async (name: string, color: string) => {
  const response = await fetch(`${garagePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });
  const dataCar = await response.json();
  return dataCar;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${garagePath}/${id}`, {
    method: 'DELETE',
  });
  const dataCar = await response.json();
  return dataCar;
};

export const updateCar = async (id: number, name: string, color: string) => {
  const response = await fetch(`${garagePath}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });
  const dataCar = await response.json();
  return dataCar;
};

export const startCar = async (id: number) => {
  const response = await fetch(`${enginePath}?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const dataCar = await response.json();
  return dataCar;
};

export const stopCar = async (id: number) => {
  const response = await fetch(`${enginePath}?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const dataCar = await response.json();
  return dataCar;
};

export const driveCar = async (id: number) => {
  const response = await fetch(`${enginePath}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  const dataCar = await response.json();
  return dataCar;
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${winnersPath}/${id}`);
  const dataCar = await response.json();
  return dataCar;
};

export const getWinners = async (
  page = 1,
  sort = 'id',
  order = 'ASC',
  limit = 10
): Promise<ICarsWinners | undefined> => {
  try {
    const response = await fetch(
      `${winnersPath}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );
    const countCars = response.headers.get('X-Total-Count');
    const dataCars = await response.json();
    return {
      winners: dataCars,
      count: Number(countCars),
    };
  } catch (error) {
    console.log(error);
  }
};

export const createWinner = async (id: number, wins: number, time: number) => {
  const response = await fetch(`${winnersPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, wins, time }),
  });
  const dataCar = await response.json();
  return dataCar;
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${winnersPath}/${id}`, {
    method: 'DELETE',
  });
  const dataCar = await response.json();
  return dataCar;
};

export const updateWinner = async (id: number, wins: number, time: number) => {
  const response = await fetch(`${garagePath}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  });
  const dataCar = await response.json();
  return dataCar;
};
