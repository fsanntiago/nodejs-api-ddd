import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  save(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
