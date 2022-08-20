import { IState } from '../types/dataInterfaces';
import { MAX_CARS_ON_GARAGE_PAGE, MAX_CARS_ON_WINNERS_PAGE } from './utils';

export const calculateAllPagesGarage = (state: IState) => (
  Math.ceil(state.dataCars.count / MAX_CARS_ON_GARAGE_PAGE)
);
export const calculateAllPagesWinners = (state: IState) => (
  Math.ceil(state.dataWinners.count / MAX_CARS_ON_WINNERS_PAGE)
);
