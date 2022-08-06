import { getCarImg } from '../../utils/getImgs';
import { ICar, ICarWinner, IState } from '../../types/dataInterfaces';

enum TableHeaders {
  Number = 'Number',
  Car = 'Car',
  Name = 'Name',
  Wins = 'Wins',
  Time = 'Best time (seconds)',
}
const generateHeaderTable = () => {
  const headerTable = document.createElement('thead');
  const rowHeader = document.createElement('tr');
  const columnHeader = Object.values(TableHeaders).map((header) => {
    const column = document.createElement('th');
    column.textContent = header;
    return column;
  });

  rowHeader.append(...columnHeader);
  headerTable.append(rowHeader);
  return headerTable;
};

const generateBodyTable = (winners: Array<ICarWinner>, cars: Array<ICar>) => {
  const bodyTable = document.createElement('tbody');
  const rowsBody = winners.map(({ wins, time, id }) => {
    const row = document.createElement('tr');
    const numberCar = document.createElement('td');
    numberCar.textContent = String(id);
    const carImg = document.createElement('td');
    const carName = document.createElement('td');
    const currentCar = cars.find((carData) => carData.id === id);
    if (currentCar) {
      carImg.innerHTML = getCarImg(currentCar.color);
      carName.textContent = currentCar.name;
    }
    const countWinner = document.createElement('td');
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
    dataWinners: { count, winners },
    uiState: { winnersPage },
    dataCars: { cars },
  } = state;
  const container = document.createElement('div');
  const table = document.createElement('table');
  const countCar = document.createElement('h2');
  countCar.textContent = `Garage (${count})`;
  const countPage = document.createElement('h3');
  countPage.textContent = `Page #${winnersPage}`;
  const headerTable = generateHeaderTable();
  const bodyTable = generateBodyTable(winners, cars);

  table.append(headerTable, bodyTable);
  container.append(countCar, countPage, table);
  return container;
};

const renderWinners = (state: IState) => {
  const app = document.querySelector('.container-app')!;
  app.replaceChildren(generateWinners(state));
};

export default renderWinners;

// return `
//     <div>
//       <h2>Garage (${countCars})</h2>
//       <h3>Page #${page}</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Number</th>
//             <th>Car</th>
//             <th>Name</th>
//             <th>Wins</th>
//             <th>Best time (seconds)</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${winningCars.map((dataCar, index) => {
//             return `
//               <tr>
//                 <td>${index + 1}</td>
//                 <td>${1}</td>
//                 <td>${1}</td>
//                 <td>${dataCar.wins}</td>
//                 <td>${dataCar.time}</td>
//               </tr>
//             `;
//           })}
//         <tbody>
//       </table>
//     </div>`;
