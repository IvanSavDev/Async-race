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

export interface IAnimationCar {
  id: number | null;
  drive: boolean;
  position: number;
}

export interface IUiState {
  selectCar: number | null;
  garageAllPage: number;
  winnersAllPage: number;
  animationsCars: {
    [key: number]: IAnimationCar;
  };
  currentPageName: string;
  raceStatus: string;
}

export type SortType = 'ASC' | 'DESC';
export type SortCategoryType = 'wins' | 'time';

export interface IState {
  dataCars: ICars;
  createCar: ICreateCar;
  updateCar: IUpdateCar;
  dataWinners: ICarsWinners;
  sortType: SortType;
  sortCategory: SortCategoryType;
  garagePage: number;
  winnersPage: number;
  uiState: IUiState;
  controller: AbortController;
}
