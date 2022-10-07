import { IState } from 'Src/types/dataInterfaces';
import { updateWinners } from 'Src/utils/utils';
import { Pages } from 'Src/enum/enum';
import { getCars } from 'Src/api';

const listenerSwitchPage = (
  state: IState,
  element: HTMLElement,
  isPrev: boolean,
  render: (state: IState) => void,
) => {
  const {
    winnersPage,
    garagePage,
    uiState: { currentPageName },
  } = state;
  element.addEventListener('click', async () => {
    const countPage = currentPageName === Pages.garage ? garagePage : winnersPage;
    const currentPage = isPrev ? countPage - 1 : countPage + 1;
    if (currentPageName === Pages.garage) {
      state.garagePage = currentPage;
      const carsData = await getCars(currentPage);
      state.dataCars = carsData;
      render(state);
    }
    if (currentPageName === Pages.winners) {
      state.winnersPage = currentPage;
      await updateWinners(state);
      render(state);
    }
  });
};

export default listenerSwitchPage;
