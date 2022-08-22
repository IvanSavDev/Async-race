import { SortCategory } from 'Src/enum/enum';
import { SortCategoryType } from 'Src/types/dataInterfaces';

export const sortCategory: {
  'Best time (seconds)': SortCategoryType;
  Wins: SortCategoryType;
} = {
  'Best time (seconds)': SortCategory.time,
  Wins: SortCategory.wins,
};

export enum TableHeaders {
  Number = 'Number',
  Car = 'Car',
  Name = 'Name',
  Wins = 'Wins',
  Time = 'Best time (seconds)',
}
