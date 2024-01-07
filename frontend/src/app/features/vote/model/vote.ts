export interface VoteInput {
  vote: boolean
  userId: string
  sessionId: string
}
export interface Vote {
  id: string
  vote: boolean
  pautaId: string
  userId: string
  sessionId: string
  createdAt: string
  updatedAt: string
}
