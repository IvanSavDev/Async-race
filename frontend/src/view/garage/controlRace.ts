import { IState } from 'Src/types/dataInterfaces';
import { createElement } from 'Src/utils/utils';
import { RaceStatus } from 'Src/enum/enum';

const generateFieldControlRace = (state: IState): HTMLElement => {
  const {
    uiState: { raceStatus },
  } = state;
  const controlRace = createElement('div', { class: 'control-race' });

  const race = createElement(
    'button',
    {
      disabled: raceStatus !== RaceStatus.start,
      id: 'race',
    },
    'RACE',
  );

  const resetButton = createElement(
    'button',
    {
      disabled: raceStatus !== RaceStatus.finished,
      id: 'reset',
    },
    'RESET',
  );

  const generateCarsButton = createElement(
    'button',
    {
      class: 'control-race__generate',
      id: 'generate',
    },
    'GENERATE CARS',
  );

  controlRace.append(race, resetButton, generateCarsButton);

  return controlRace;
};

export default generateFieldControlRace;
