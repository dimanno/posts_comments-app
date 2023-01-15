import {makeRequest} from "./makeRequest";

export function createComment() {
    return makeRequest('http://localhost:7000/api/comments' )
}
export function getComments() {
    return makeRequest('http://localhost:7000/api/comments' )
}

export function getComment(id) {
    return makeRequest(`http://localhost:7000/api/comments/${id}` )
}

export function updateComment({ message, id }) {
    return makeRequest(`http://localhost:7000/api/comments/${id}`, {
        method: "PUT",
        data: { message },
    })
}

export function deleteComment({id }) {
    return makeRequest(`http://localhost:7000/api/comments/${id}`, {
        method: "DELETE",
    })
}

export function toggleCommentLike({ id,}) {
    return makeRequest(`http://localhost:7000/api/comments/${id}/toggleLike`, {
        method: "POST",
    })
}