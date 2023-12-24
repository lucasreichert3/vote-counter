import { Session } from './Session';

export interface Pauta {
  id: string;
  title: string;
  description: string;
  session?: Session;
  updatedAt: Date;
  createdAt: Date;
}
