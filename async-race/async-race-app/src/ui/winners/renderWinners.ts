import { IState } from 'Src/types/dataInterfaces';
import { SortCategory } from 'Src/enum/enum';
import { activeSort } from './activeSort';
import listenerSwitchPage from './switchPage';
import { generateWinners } from './winnersPage';

const renderWinners = (state: IState) => {
  const app = document.querySelector('.container-app') as HTMLElement;
  const winnersPage = generateWinners(state);
  const winnersColumn = winnersPage.querySelector(
    `#${SortCategory.wins}`,
  ) as HTMLElement;
  const timeColumn = winnersPage.querySelector(
    `#${SortCategory.time}`,
  ) as HTMLElement;
  const prevButton = winnersPage.querySelector('#prev') as HTMLElement;
  const nextButton = winnersPage.querySelector('#next') as HTMLElement;
  listenerSwitchPage(state, prevButton, true, renderWinners);
  listenerSwitchPage(state, nextButton, false, renderWinners);
  if (winnersColumn && timeColumn) {
    activeSort(state, [winnersColumn, timeColumn], renderWinners);
  }
  app.replaceChildren(winnersPage);
};

export default renderWinners;
