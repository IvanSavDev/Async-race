import { generateButtonsEngine } from './car';

const renderButtonsControlCar = (isDrive: boolean, car: HTMLElement) => {
  const buttonsControlCar = car.querySelector('.car__buttons-control');
  if (buttonsControlCar) {
    const newButtonsControlCar = generateButtonsEngine(isDrive);
    buttonsControlCar.replaceWith(newButtonsControlCar);
  }
};

export default renderButtonsControlCar;
