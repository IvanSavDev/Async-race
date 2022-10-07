import { IState } from 'Src/types/dataInterfaces';
import startRace from 'Src/controllers/garage/listenerStartRace';
import stopRace from 'Src/controllers/garage/listenerStopRace';
import generateFieldControlRace from './controlRace';

const renderControlRace = (state: IState) => {
  const newControlRace = generateFieldControlRace(state);
  const controlRace = document.querySelector('.control-race');
  const startRaceButton = newControlRace?.querySelector('#race') as HTMLElement;
  const stopRaceButton = newControlRace.querySelector('#reset') as HTMLElement;
  startRace(state, startRaceButton, renderControlRace);
  stopRace(state, stopRaceButton, renderControlRace);
  if (controlRace) {
    controlRace.replaceWith(newControlRace);
  }
};

export default renderControlRace;
