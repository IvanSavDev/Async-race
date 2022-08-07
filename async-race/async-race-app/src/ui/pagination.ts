import { IState } from 'Src/types/dataInterfaces';
import { getCars, getWinners } from 'Src/api';
import { createElement, getDataWinners, updateWinners } from 'Src/utils/utils';
import renderGarage from './garage/garagePage';
import renderWinners from './winners/winnersPage';

const listenerSwitchPage = (
  element: HTMLElement,
  state: IState,
  isPrev: boolean
) => {
  element.addEventListener('click', async () => {
    const currentPageName = state.uiState.currentPageName;
    const countPage =
      currentPageName === 'garage'
        ? state.uiState.garagePage
        : state.uiState.winnersPage;
    const currentPage = isPrev ? countPage - 1 : countPage + 1;
    if (currentPageName === 'garage') {
      state.uiState.garagePage = currentPage;
      const carsData = await getCars(currentPage);
      state.dataCars = carsData;
      renderGarage(state);
    } else {
      state.uiState.winnersPage = currentPage;
      await updateWinners(state);
      renderWinners(state);
    }
  });
};

const generatePagination = (state: IState): HTMLElement => {
  const {
    garagePage,
    garageAllPage,
    currentPageName,
    winnersAllPage,
    winnersPage,
  } = state.uiState;
  const currentPage = currentPageName === 'garage' ? garagePage : winnersPage;
  const lastPage =
    currentPageName === 'garage' ? garageAllPage : winnersAllPage;
  const pagination = createElement('div', { class: 'pagination' });
  const prevPage = createElement(
    'button',
    currentPage === 1 ? { disabled: 'true' } : {},
    'PREV'
  );
  listenerSwitchPage(prevPage, state, true);
  const nextPage = createElement(
    'button',
    currentPage >= lastPage ? { disabled: 'true' } : {},
    'NEXT'
  );
  listenerSwitchPage(nextPage, state, false);
  pagination.append(prevPage, nextPage);

  return pagination;
};

export default generatePagination;

// const pagination = document.createElement('div');
// pagination.classList.add('pagination');
// const prevPage = document.createElement('button');
// prevPage.textContent = 'PREV';
// const nextPage = document.createElement('button');
// nextPage.textContent = 'NEXT';
// if (currentPage === 1) {
//   prevPage.setAttribute('disabled', '');
// } else {
//   prevPage.removeAttribute('disabled');
// }
// if (currentPage >= lastPage) {
//   nextPage.setAttribute('disabled', '');
// } else {
//   nextPage.removeAttribute('disabled');
// }
// const listenerSwitchPageWinners = (
//   element: HTMLElement,
//   state: IState,
//   render: (state: IState) => void,
//   isPrev: boolean
// ) => {
//   element.addEventListener('click', async () => {
//     const countPage = state.uiState.garagePage;
//     const currentPage = isPrev ? countPage - 1 : countPage + 1;
//     state.uiState.garagePage = currentPage;
//     const carsData = await getCars(currentPage);
//     if (carsData) {
//       state.dataCars = carsData;
//     }
//     render(state);
//   });
// };
