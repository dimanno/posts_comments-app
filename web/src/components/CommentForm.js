import './commentForm.css'
import { useState } from "react"

export function CommentForm({
                                loading,
                                error,
                                onSubmit,
                                autoFocus = false,
                                initialValues = {
                                    userName: "",
                                    email: "",
                                    homePage: "",
                                    message: "",
                                },
                            })
{
    const [userName, setUserName] = useState(initialValues.userName);
    const [email, setEmail] = useState(initialValues.email);
    const [homePage, setHomePage] = useState(initialValues.homePage);
    const [message, setMessage] = useState(initialValues.message)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(userName).then(() => setUserName(""));
        onSubmit(email).then(() => setEmail(""));
        onSubmit(homePage).then(() => setHomePage(""));
        onSubmit(message).then(() => setMessage(""));

    }

    return <div className="form-box">
                    <form onSubmit={handleSubmit}>
                        <div className={'input-container'}>
                            <div className={'input_center'}>
                                <div className="input-box">
                                    <label className="s-form-box__label">User name*</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                        // onBlur={handleBlur}
                                        name="username"
                                        placeholder={"username"}
                                        className="s-form-box__input first__input"
                                    />
                                </div>
                                <div className="input-box">
                                    <label
                                        className="s-form-box__label">Email*</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        // onBlur={handleBlur}
                                        name="email"
                                        placeholder={'email'}
                                        className="s-form-box__input first__input"
                                    />
                                </div>
                                <div className="input-box">
                                    <label
                                        className="s-form-box__label">Home page</label>
                                    <div>
                                        <input
                                            type={'text'}
                                            value={homePage}
                                            onChange={e => setHomePage(e.target.value)}
                                            // onBlur={handleBlur}
                                            name="Home page"
                                            placeholder={'Home page'}
                                            className="s-form-box__input first__input"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="input-box">
                                <label
                                    className="s-form-box__label">Message*</label>
                                <div className="comment-form-row">
                                    <textarea
                                        autoFocus={autoFocus}
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        className="message-input"
                                    />
                                    <button className="btn" type="submit" disabled={loading}>
                                        {loading ? "Loading" : "Post"}
                                    </button>
                                </div>
                                <div className="error-msg">{error}</div>
                            </div>
                        </div>
                    </form>
   </div>
}
