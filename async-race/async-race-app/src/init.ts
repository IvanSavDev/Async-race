import { getCar, getCars, getWinners } from './api';
import { ICar, IState } from './types/dataInterfaces';
import renderGarage from './ui/garage/garagePage';
import generateSwithPanel from './ui/swithPanel';
import {
  calculateAllPagesGarage,
  calculateAllPagesWinners,
} from './utils/utils';

const runApp = async () => {
  const root = document.getElementById('root')!;

  const state: IState = {
    dataCars: {
      cars: [],
      count: 0,
    },
    dataWinners: {
      winners: [],
      count: 0,
    },
    createCar: {
      color: '#FFFFFF',
      name: '',
    },
    updateCar: {
      color: '#FFFFFF',
      name: '',
    },
    uiState: {
      selectCar: null,
      garageAllPage: 1,
      garagePage: 1,
      winnersPage: 1,
      winnersAllPage: 1,
      lastWinner: null,
      animationsCars: {},
      currentPageName: 'garage',
      raceStatus: 'start',
    },
  };

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container-app');
  root.append(generateSwithPanel(state), mainContainer);

  try {
    const dataCars = await getCars();
    if (dataCars) {
      state.dataCars = dataCars;
      state.uiState.garageAllPage = calculateAllPagesGarage(state);
    }
    const dataWinners = await getWinners();
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
  } catch (e) {
    console.log(e);
  }
  console.log(state);
  renderGarage(state);
};

export default runApp;
