export interface AlertgyRole {
  _id: string;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface AlertgyUser {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  role: AlertgyRole;
  id: string;
}

export interface AlertgyMessage {
  type: string;
  message: string;
  time?: number;
}

export interface AlertgyAllergen {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  picto: AlertgyAllergenPicto;
  id: string;
  plus: boolean;
}

export interface AlertgyAllergenPicto {
  _id: string;
  name: string;
  sha256: string;
  hash: string;
  ext: string;
  mime: string;
  size: string;
  url: string;
  provider: string;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface AlertgyUserAllergen {
  user: AlertgyUser;
  allergen: AlertgyAllergen;
}