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

export interface ICreateCar {
  color: string;
  name: string;
}

export interface IUpdateCar {
  color: string;
  name: string;
}

export interface IUiState {
  selectCar: number | null;
  garagePage: number;
  garageAllPage: number;
  winnersPage: number;
  winnersAllPage: number;
  animationsIds: {
    [key: number]: {
      id: number | null;
    };
  };
  currentPageName: string;
}

export interface IState {
  dataCars: ICars;
  createCar: ICreateCar;
  updateCar: IUpdateCar;
  uiState: IUiState;
  dataWinners: ICarsWinners;
}
