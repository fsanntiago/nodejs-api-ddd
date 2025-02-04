import { Entity } from '@/shared/entities/entity'
import { UniqueEntityID } from '@/shared/entities/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updateAt?: Date
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  protected touch() {
    this.props.updateAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
