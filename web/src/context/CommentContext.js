import React, { useContext, useEffect, useMemo, useState } from "react"
// import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import {getComments} from "../services/comments.service.js"

const Context = React.createContext()

export function useComment() {
    return useContext(Context)
}

export function CommentProvider({ children }) {
    // const { id } = useParams()
    const { loading, error, value: comments } = useAsync(getComments)
    const [parentComments, setParentComments] = useState([])

    const commentsByParentId = useMemo(() => {
        const group = {}
        parentComments.forEach(comment => {
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
        })
        return group
    }, [parentComments])
    useEffect(() => {
        if (comments == null) return
        setParentComments(comments)
    }, [comments])
      function getReplies(parentId) {
            return commentsByParentId[parentId]
        }

        function createLocalComment(comment) {
            setParentComments(prevComments => {
                return [comment, ...prevComments]
            })
        }

        function updateLocalComment(id, message) {
            setParentComments(prevComments => {
                return prevComments.map(comment => {
                    if (comment.id === id) {
                        return {...comment, message}
                    } else {
                        return comment
                    }
                })
            })
        }

        function deleteLocalComment(id) {
            setParentComments(prevComments => {
                return prevComments.filter(comment => comment.id !== id)
            })
        }

        function toggleLocalCommentLike(id, addLike) {
            setParentComments(prevComments => {
                return prevComments.map(comment => {
                    if (id === comment.id) {
                        if (addLike) {
                            return {
                                ...comment,
                                likeCount: comment.likeCount + 1,
                                likedByMe: true,
                            }
                        } else {
                            return {
                                ...comment,
                                likeCount: comment.likeCount - 1,
                                likedByMe: false,
                            }
                        }
                    } else {
                        return comment
                    }
                })
            })
        }

        return (
            <Context.Provider
                value={{
                    rootComments: commentsByParentId[null],
                    getReplies,
                    createLocalComment,
                    updateLocalComment,
                    deleteLocalComment,
                    toggleLocalCommentLike,
                }}
            >
                {loading ? (
                    <h1>Loading</h1>
                ) : error ? (
                    <h1 className="error-msg">{error}</h1>
                ) : (
                    children
                )}
            </Context.Provider>
        )
    }