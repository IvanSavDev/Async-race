import { getCars, getWinners } from './api';
import { IState } from './dataInterfaces';
import renderGarage from './ui/garagePage';
import generateSwithPanel from './ui/swithPanel';
import renderWinners from './ui/winnersPage';

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
      garagePage: 1,
      winnersPage: 1,
    },
  };

  root.insertAdjacentHTML('afterbegin', generateSwithPanel());
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container-app');
  root.append(mainContainer);

  try {
    const dataCars = await getCars();
    if (dataCars) state.dataCars = dataCars;
    const dataWinners = await getWinners();
    console.log(dataWinners);
    if (dataWinners) state.dataWinners = dataWinners;
  } catch (e) {
    console.log(e);
  }

  const switchGarage = document.querySelector('.switch-page__garage')!;
  const switchWinners = document.querySelector('.switch-page__winners')!;

  switchGarage.addEventListener('click', () => renderGarage(state));
  switchWinners.addEventListener('click', () => renderWinners(state));

  renderGarage(state);
};

export default runApp;
