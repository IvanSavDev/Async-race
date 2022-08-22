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

  const resetBtn = createElement(
    'button',
    {
      disabled: raceStatus !== RaceStatus.finished,
      id: 'reset',
    },
    'RESET',
  );

  const generateCarsBtn = createElement(
    'button',
    {
      class: 'control-race__generate',
      id: 'generate',
    },
    'GENERATE CARS',
  );

  controlRace.append(race, resetBtn, generateCarsBtn);

  return controlRace;
};

export default generateFieldControlRace;
