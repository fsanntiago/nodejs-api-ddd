import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      content: 'First comment',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'First comment',
    )
    expect(inMemoryQuestionCommentsRepository.items[0].questionId).toEqual(
      newQuestion.id,
    )
  })

  it.skip('should not be able to comment on question that do not exist', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: 'question-1',
        content: 'Question not exist',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
