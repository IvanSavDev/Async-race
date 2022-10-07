import { IState } from 'Src/types/dataInterfaces';
import { createElement, updateWinners } from 'Src/utils/utils';
import { Pages } from 'Src/enum/enum';
import renderGarage from './garage/renderGarage';
import renderWinners from './winners/renderWinners';

const generateSwitchPanel = (state: IState) => {
  const switchPage = createElement('div', { class: 'switch-page' });
  const switchGarage = createElement(
    'button',
    { class: 'switch-page__garage' },
    'TO GARAGE',
  );
  const switchWinners = createElement(
    'button',
    { class: 'switch-page__winners' },
    'TO WINNERS',
  );
  switchGarage.addEventListener('click', () => {
    state.uiState.currentPageName = Pages.garage;
    renderGarage(state);
  });
  switchWinners.addEventListener('click', async () => {
    state.uiState.currentPageName = Pages.winners;
    await updateWinners(state);
    renderWinners(state);
  });

  switchPage.append(switchGarage, switchWinners);

  return switchPage;
};

export default generateSwitchPanel;
