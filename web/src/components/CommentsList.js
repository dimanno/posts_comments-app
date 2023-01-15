import { Comment } from "./Comment"

export function CommentsList({ comments }) {
    console.log('comments', comments)
    return comments.map(comment => (
        <div key={comment.id} className="comment-stack">
            <Comment {...comment} />
        </div>
    ))
}