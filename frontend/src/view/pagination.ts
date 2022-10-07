import { IState } from 'Src/types/dataInterfaces';
import { createElement } from 'Src/utils/utils';
import { Pages } from 'Src/enum/enum';

const generatePagination = (state: IState) => {
  const {
    garagePage,
    uiState: { garageAllPage, currentPageName, winnersAllPage },
    winnersPage,
  } = state;
  const currentPage = currentPageName === Pages.garage ? garagePage : winnersPage;
  const lastPage = currentPageName === Pages.garage ? garageAllPage : winnersAllPage;
  const pagination = createElement('div', { class: 'pagination' });
  const prevPage = createElement(
    'button',
    { disabled: currentPage === 1 },
    'PREV',
  );
  prevPage.setAttribute('id', 'prev');
  const nextPage = createElement(
    'button',
    { disabled: currentPage >= lastPage },
    'NEXT',
  );
  nextPage.setAttribute('id', 'next');
  pagination.append(prevPage, nextPage);

  return pagination;
};

export default generatePagination;
