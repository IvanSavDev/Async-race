import { IAnimationCar } from 'Src/types/dataInterfaces';
import { generateCarControl } from './car';

const renderCarControl = (
  car: HTMLElement,
  color: string,
  animationCar: IAnimationCar,
) => {
  const carControl = car.querySelector('.car__control');
  if (carControl) {
    const newCarControl = generateCarControl(
      color,
      animationCar.drive,
      animationCar.position,
    );
    carControl.replaceWith(newCarControl);
  }
};

export default renderCarControl;
