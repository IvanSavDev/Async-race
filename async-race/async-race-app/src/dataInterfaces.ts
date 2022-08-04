export interface ICar {
  name: 'string';
  color: 'string';
  id: number;
}

export interface ICars {
  cars: Array<ICar> | [];
  count: number;
}

export interface ICarWinner {
  id: number;
  wins: number;
  time: number;
}

export interface ICarsWinners {
  winners: Array<ICarWinner>;
  count: number;
}

export interface IState {
  dataCars: ICars;
  createCar: {
    color: string;
    name: string;
  };
  updateCar: {
    color: string;
    name: string;
  };
  uiState: {
    selectCar: number | null;
    garagePage: number;
    winnersPage: number;
  };
  dataWinners: ICarsWinners;
}
