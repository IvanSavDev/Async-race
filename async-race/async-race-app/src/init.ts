import { getCars, getWinners } from './api';
import { IState } from './types/dataInterfaces';
import renderGarage from './ui/garage/garagePage';
import generateSwithPanel from './ui/swithPanel';

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
      animationsIds: {},
      currentPageName: 'garage',
    },
  };

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container-app');
  root.append(generateSwithPanel(state), mainContainer);

  try {
    const dataCars = await getCars();
    if (dataCars) state.dataCars = dataCars;
    const dataWinners = await getWinners();
    if (dataWinners) state.dataWinners = dataWinners;
  } catch (e) {
    console.log(e);
  }

  renderGarage(state);
};

export default runApp;
