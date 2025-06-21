export interface UserEntity {
  id?: number;
  name: string;
  email: string;
  age?: number;
  gender?: genderEnum;
  height?: number;
  weight?: number;
}

export enum genderEnum {
  male = 'Мужской',
  female = 'Женский',
}
