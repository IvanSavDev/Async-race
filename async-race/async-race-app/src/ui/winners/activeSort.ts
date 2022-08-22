import { IState, SortCategoryType } from 'Src/types/dataInterfaces';
import { updateWinners } from 'Src/utils/utils';
import { SortTypes } from 'Src/enum/enum';

export const activeSort = (
  state: IState,
  columns: Array<HTMLElement>,
  render: (state: IState) => void,
) => {
  columns.forEach((column) => {
    column.addEventListener('click', async () => {
      const idColumn = column.getAttribute('id') as SortCategoryType;
      const currentSortType = state.sortType;
      const updateSortType = currentSortType === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
      state.sortCategory = idColumn;
      state.sortType = updateSortType;
      await updateWinners(state);
      render(state);
    });
  });
};
