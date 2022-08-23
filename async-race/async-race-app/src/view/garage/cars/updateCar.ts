import { IState } from 'Src/types/dataInterfaces';
import { createElement } from 'Src/utils/utils';

const generateFieldUpdateCar = (state: IState): HTMLElement => {
  const {
    uiState: { selectCar },
    updateCar: { name, color },
  } = state;

  const updateCarElement = createElement('form', { class: 'update-car' });

  const updateCarName = createElement('input', {
    type: 'text',
    value: name,
    name: 'text',
    disabled: !selectCar,
  });
  updateCarName.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.name = input.value;
  });

  const updateCarColor = createElement('input', {
    type: 'color',
    value: color,
    name: 'color',
    disabled: !selectCar,
  });
  updateCarColor.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.updateCar.color = input.value;
  });

  const updateCarButton = createElement(
    'button',
    {
      type: 'submit',
      disabled: !selectCar,
    },
    'UPDATE',
  );
  updateCarElement.append(updateCarName, updateCarColor, updateCarButton);

  return updateCarElement;
};

export default generateFieldUpdateCar;
