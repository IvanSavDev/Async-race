import { IState } from './dataInterfaces';
import { getCars } from './api';
import renderGarage from './ui/garagePage';

export const loadCars = async (state: IState) => {
  const { garagePage } = state.uiState;
  const dataCars = await getCars(garagePage);
  if (dataCars) {
    state.dataCars = dataCars;
  }
  renderGarage(state);
};
