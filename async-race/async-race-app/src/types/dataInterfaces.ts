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

export interface ICarWinnerUpdate extends ICarWinner {
  name: string;
  color: string;
}

export interface ICarsWinners {
  winners: Array<ICarWinnerUpdate>;
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
  lastWinner: number | null;
  animationsCars: {
    [key: number]: {
      id: number | null;
      drive: boolean;
    };
  };
  currentPageName: string;
  raceStatus: string;
}

export interface IState {
  dataCars: ICars;
  createCar: ICreateCar;
  updateCar: IUpdateCar;
  uiState: IUiState;
  dataWinners: ICarsWinners;
}
