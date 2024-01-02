import { Session } from '@prisma/client';

export default class Pauta {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly category: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly description: string | null,
    readonly session?: Session
  ) {}
}
