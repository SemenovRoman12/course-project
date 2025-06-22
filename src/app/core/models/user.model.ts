export interface UserEntity {
  id: number;
  name: string;
  email: string;
  age?: number;
  gender?: GenderEnum | null;
  height?: number;
  weight?: number;
}

export enum GenderEnum {
  male = 'Мужской',
  female = 'Женский',
}
