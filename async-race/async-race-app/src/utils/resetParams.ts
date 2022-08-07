import { IState } from '../types/dataInterfaces';

export const resetCreateOptions = (state: IState) => {
  state.createCar.color = '#ffffff';
  state.createCar.name = '';
};

export const resetUpdateOptions = (state: IState) => {
  state.updateCar.color = '#ffffff';
  state.updateCar.name = '';
  state.uiState.selectCar = null;
};

export const resetControlRaceOptions = (state: IState) => {
  state.createCar.color = '#ffffff';
  state.createCar.name = '';
  state.updateCar.color = '#ffffff';
  state.updateCar.name = '';
  state.uiState.selectCar = null;
};
