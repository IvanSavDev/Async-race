import { IState } from 'Src/types/dataInterfaces';
import { calculateAllPagesWinners, createElement } from 'Src/utils/utils';
import renderGarage from './garage/garagePage';
import renderWinners from './winners/winnersPage';
import { getDataWinners } from 'Src/utils/utils';

const generateSwithPanel = (state: IState) => {
  const switchPage = createElement('div', { class: 'switch-page' });
  const switchGarage = createElement(
    'button',
    { class: 'switch-page__garage' },
    'TO GARAGE'
  );
  const switchWinners = createElement(
    'button',
    { class: 'switch-page__winners' },
    'TO WINNERS'
  );
  switchGarage.addEventListener('click', () => {
    state.uiState.raceStatus = 'start';
    state.uiState.currentPageName = 'garage';
    renderGarage(state);
  });
  switchWinners.addEventListener('click', async () => {
    state.uiState.currentPageName = 'winners';
    const result = await getDataWinners(state.uiState.winnersPage);
    state.dataWinners = result;
    state.uiState.winnersAllPage = calculateAllPagesWinners(state);
    console.log(state);
    renderWinners(state);
  });

  switchPage.append(switchGarage, switchWinners);

  return switchPage;
};

export default generateSwithPanel;

// const switchPage = document.createElement('div');
// switchPage.classList.add('switch-page');
// const switchGarage = document.createElement('button');
// switchGarage.classList.add('switch-page__garage');
// switchGarage.textContent = 'TO GARAGE';
// const switchWinners = document.createElement('button');
// switchWinners.classList.add('switch-page__winners');
// switchWinners.textContent = 'TO WINNERS';
