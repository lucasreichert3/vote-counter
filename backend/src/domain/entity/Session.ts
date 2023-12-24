import { Vote } from './Vote';

export interface Session {
  id: string;
  pautaId: string;
  votes: Vote;
  open: boolean;
  openDate: Date;
  duration: number;
  updatedAt: Date;
  createdAt: Date;
}
