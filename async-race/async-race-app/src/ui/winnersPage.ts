import { getCarImg } from '../getImgs';
import { ICarWinner, IState } from '../dataInterfaces';

const generateWinners = (
  winningCars: Array<ICarWinner>,
  countCars: number,
  page: number
) => {
  return `
      <div>
        <h2>Garage (${countCars})</h2>
        <h3>Page #${page}</h3>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best time (seconds)</th>
            </tr>
          </thead>
          <tbody>
            ${winningCars.map((dataCar, index) => {
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td>${1}</td>
                  <td>${1}</td>
                  <td>${dataCar.wins}</td>
                  <td>${dataCar.time}</td>
                </tr>
              `;
            })}
          <tbody>
        </table>
      </div>`;
};

const renderWinners = (state: IState) => {
  const app = document.querySelector('.container-app')!;
  app.innerHTML = generateWinners(
    state.dataWinners.winners,
    state.dataCars.count,
    state.uiState.winnersPage
  );
};

export default renderWinners;
