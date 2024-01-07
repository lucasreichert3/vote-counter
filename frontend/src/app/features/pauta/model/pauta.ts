import { Session } from "../../session/model/session"

export interface Pauta {
  id: string
  title: string
  description: string
  category: string
  createdAt: Date
  updatedAt: Date
  session?: Session
}

export enum PautaSessionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all'
}

export interface PautaInput {
  title: string
  description?: string
  category: string
}
