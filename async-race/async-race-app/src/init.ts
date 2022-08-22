import { getCars } from './api';
import { IState } from './types/dataInterfaces';
import renderGarage from './view/garage/renderGarage';
import generateSwitchPanel from './view/switchPanel';
import { updateWinners, calculateAllPagesGarage } from './utils/utils';
import {
  Pages, RaceStatus, SortCategory, SortTypes,
} from './enum/enum';

const runApp = async () => {
  const root = document.getElementById('root') as HTMLElement;

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
    sortType: SortTypes.ASC,
    sortCategory: SortCategory.wins,
    garagePage: 1,
    winnersPage: 1,
    uiState: {
      selectCar: null,
      garageAllPage: 1,
      winnersAllPage: 1,
      animationsCars: {},
      currentPageName: Pages.garage,
      raceStatus: RaceStatus.start,
    },
    controller: new AbortController(),
  };

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container-app');
  root.append(generateSwitchPanel(state), mainContainer);

  const dataCars = await getCars();
  if (dataCars) {
    state.dataCars = dataCars;
    state.uiState.garageAllPage = calculateAllPagesGarage(state);
  }
  await updateWinners(state);
  renderGarage(state);
};

export default runApp;
