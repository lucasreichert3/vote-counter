export interface SessionInput {
  pautaId: string
  closeDate: string
}

export interface Session {
  id: string
  pautaId: string
  closeDate: Date
  createdAt: Date
  updatedAt: Date
}
