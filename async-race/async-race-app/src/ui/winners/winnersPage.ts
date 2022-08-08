import { getCarImg } from 'Src/utils/getImgs';
import {
  ICarWinnerUpdate,
  IState,
  SortCategoryType,
} from 'Src/types/dataInterfaces';
import generatePagination from '../pagination';
import { updateWinners } from 'Src/utils/utils';
import { SortCategory, SortTypes } from 'Src/enum/enum';

const sortCategory: {
  'Best time (seconds)': SortCategoryType;
  Wins: SortCategoryType;
} = {
  'Best time (seconds)': SortCategory.time,
  Wins: SortCategory.wins,
};

enum TableHeaders {
  Number = 'Number',
  Car = 'Car',
  Name = 'Name',
  Wins = 'Wins',
  Time = 'Best time (seconds)',
}

const activeSort = (
  state: IState,
  column: HTMLElement,
  header: TableHeaders.Wins | TableHeaders.Time
) => {
  column.addEventListener('click', async () => {
    const currentSortType = state.sortType;
    const updateSortType =
      currentSortType === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
    state.sortCategory = sortCategory[header];
    state.sortType = updateSortType;
    await updateWinners(state);
    renderWinners(state);
  });
};

const generateHeaderTable = (state: IState) => {
  const { sortType } = state;
  const headerTable = document.createElement('thead');
  const rowHeader = document.createElement('tr');
  const columnHeader = Object.values(TableHeaders).map((header) => {
    const column = document.createElement('th');
    column.textContent = header;
    if (header === TableHeaders.Wins || header === TableHeaders.Time) {
      activeSort(state, column, header);
      const updatedHeader =
        sortType === SortTypes.ASC ? `${header} ↓` : `${header} ↑`;
      column.textContent =
        sortCategory[header] === state.sortCategory ? updatedHeader : header;
    }
    return column;
  });
  rowHeader.append(...columnHeader);
  headerTable.append(rowHeader);
  return headerTable;
};

const generateBodyTable = (
  winners: Array<ICarWinnerUpdate>,
  numberPage: number
) => {
  const bodyTable = document.createElement('tbody');
  const rowsBody = winners.map(({ wins, time, color, name }, index) => {
    const limitWinnersOnPage = 10;
    const prevPageNumber = numberPage - 1;
    const diffWithPrevPage = prevPageNumber * limitWinnersOnPage;
    const currentNumberRow = index + 1;
    const numberCarOnPage = diffWithPrevPage + currentNumberRow;
    const row = document.createElement('tr');
    const numberCar = document.createElement('td');
    numberCar.textContent = String(numberCarOnPage);
    const carImg = document.createElement('td');
    carImg.innerHTML = getCarImg(color);
    const carName = document.createElement('td');
    carName.textContent = name;
    const countWinner = document.createElement('td');
    countWinner.classList.add('wins');
    countWinner.textContent = String(wins);
    const bestTime = document.createElement('td');
    bestTime.textContent = String(time);
    row.append(numberCar, carImg, carName, countWinner, bestTime);
    return row;
  });
  bodyTable.append(...rowsBody);
  return bodyTable;
};

const generateWinners = (state: IState) => {
  const {
    winnersPage,
    dataWinners: { count, winners },
  } = state;
  const container = document.createElement('div');
  const table = document.createElement('table');
  const countCar = document.createElement('h2');
  countCar.textContent = `Winners (${count})`;
  const countPage = document.createElement('h3');
  countPage.textContent = `Page #${winnersPage}`;
  const headerTable = generateHeaderTable(state);
  const bodyTable = generateBodyTable(winners, winnersPage);
  const pagination = generatePagination(state);

  table.append(headerTable, bodyTable);
  container.append(countCar, countPage, table, pagination);
  return container;
};

const renderWinners = (state: IState) => {
  const app = document.querySelector('.container-app')!;
  app.replaceChildren(generateWinners(state));
};

export default renderWinners;
