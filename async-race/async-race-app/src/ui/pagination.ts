import { IState } from 'Src/types/dataInterfaces';
import { getCars } from 'Src/api';
import { createElement, updateWinners } from 'Src/utils/utils';
import renderGarage from './garage/garagePage';
import renderWinners from './winners/winnersPage';
import { Pages } from 'Src/enum/enum';

const listenerSwitchPage = (
  state: IState,
  element: HTMLElement,
  isPrev: boolean
) => {
  const {
    winnersPage,
    garagePage,
    uiState: { currentPageName },
  } = state;
  element.addEventListener('click', async () => {
    const countPage =
      currentPageName === Pages.garage ? garagePage : winnersPage;
    const currentPage = isPrev ? countPage - 1 : countPage + 1;
    if (currentPageName === Pages.garage) {
      state.garagePage = currentPage;
      const carsData = await getCars(currentPage);
      state.dataCars = carsData;
      renderGarage(state);
    }
    if (currentPageName === Pages.winners) {
      state.winnersPage = currentPage;
      await updateWinners(state);
      renderWinners(state);
    }
  });
};

const generatePagination = (state: IState) => {
  const {
    garagePage,
    uiState: { garageAllPage, currentPageName, winnersAllPage },
    winnersPage,
  } = state;
  const currentPage =
    currentPageName === Pages.garage ? garagePage : winnersPage;
  const lastPage =
    currentPageName === Pages.garage ? garageAllPage : winnersAllPage;
  const pagination = createElement('div', { class: 'pagination' });
  const prevPage = createElement(
    'button',
    { disabled: currentPage === 1 ? true : false },
    'PREV'
  );
  listenerSwitchPage(state, prevPage, true);
  const nextPage = createElement(
    'button',
    { disabled: currentPage >= lastPage ? true : false },
    'NEXT'
  );
  listenerSwitchPage(state, nextPage, false);
  pagination.append(prevPage, nextPage);

  return pagination;
};

export default generatePagination;
