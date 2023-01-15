import { useComment } from "../context/CommentContext"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment } from "../services/comments.service.js"
import { CommentForm } from "../components/CommentForm.js"
import { CommentsList } from "../components/CommentsList.js"

export function CommentPage() {
    const { rootComments, createLocalComment } = useComment()
    const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

    function onCommentCreate(message) {
        return createCommentFn({
            // postId: comment.id,
            message }).then(
            createLocalComment
        )
    }

    return (
        <>
            <h3 className="comments-title"> Write something ...</h3>
            <section>
                <CommentForm
                    loading={loading}
                    error={error}
                    onSubmit={onCommentCreate}
                />
                {rootComments != null && rootComments.length > 0 && (
                    <div className="mt-4">
                        <CommentsList comments={rootComments} />
                    </div>
                )}
            </section>
        </>
    )
}