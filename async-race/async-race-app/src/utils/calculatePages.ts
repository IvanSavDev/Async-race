import { IState } from '../types/dataInterfaces';

export const calculateAllPagesGarage = (state: IState) => {
  const maxPages = 7;
  return Math.ceil(state.dataCars.count / maxPages);
};

export const calculateAllPagesWinners = (state: IState) => {
  const maxPages = 10;
  return Math.ceil(state.dataWinners.count / maxPages);
};
