import { getCars } from './api';
import { IState } from './types/dataInterfaces';
import renderGarage from './ui/garage/garagePage';
import generateSwithPanel from './ui/swithPanel';
import { updateWinners } from './utils/utils';
import { calculateAllPagesGarage } from './utils/calculatePages';

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
    sortType: 'ASC',
    sortCategory: 'wins',
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
    updateWinners(state);
  } catch (e) {
    console.log(e);
  }
  console.log(state);
  renderGarage(state);
};

export default runApp;
