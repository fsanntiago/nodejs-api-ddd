import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'First comment',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      'First comment',
    )
    expect(inMemoryAnswerCommentsRepository.items[0].answerId).toEqual(
      newAnswer.id,
    )
  })

  it('should not be able to comment on answer that do not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: 'answer-1',
        content: 'Answer not exist',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
