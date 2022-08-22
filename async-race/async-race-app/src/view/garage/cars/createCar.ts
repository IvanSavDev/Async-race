import { createElement } from 'Src/utils/utils';
import { IState } from 'Src/types/dataInterfaces';

const generateFieldCreateCar = (state: IState): HTMLElement => {
  const {
    createCar: { name, color },
  } = state;

  const createCarForm = createElement('form', { class: 'create-car' });

  const createCarName = createElement('input', {
    type: 'text',
    value: name,
    name: 'text',
    required: 'required',
  });
  createCarName.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.createCar.name = input.value;
  });

  const createCarColor = createElement('input', {
    type: 'color',
    value: color,
    name: 'color',
  });
  createCarColor.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    state.createCar.color = input.value;
  });

  const createCarBtn = createElement('button', {}, 'CREATE');

  createCarForm.append(createCarName, createCarColor, createCarBtn);

  return createCarForm;
};

export default generateFieldCreateCar;
