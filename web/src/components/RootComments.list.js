import {getComments} from "../services/comments.service";
import {useAsync} from "../hooks/useAsync";
export function RootCommentsList() {
    const {loading, error, value: comments} = useAsync(getComments);

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) return <h1 className={'error-msg'}>{error}</h1>

    return <div>
        {
            comments.map(comment => <h1 key={comment.id}>{comment.user.userName}</h1>)
        }
    </div>
}