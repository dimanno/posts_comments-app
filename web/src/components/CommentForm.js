import './commentForm.css'
import { useState } from "react"
import {Field, Formik} from "formik";
import * as Yup from "yup";

export function CommentForm({
                                loading,
                                error,
                                onSubmit,
                                autoFocus = false,
                                initialValue = "",
                            }) {
    const [userName, setUserName] = useState(initialValue);
    const [email, setEmail] = useState(initialValue);
    const [homePage, setHomePage] = useState(initialValue);
    const [message, setMessage] = useState(initialValue)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(userName).then(() => setUserName(""));
        onSubmit(email).then(() => setEmail(""));
        onSubmit(homePage).then(() => setHomePage(""));
        onSubmit(message).then(() => setMessage(""));

    }

    return <div className="form-box">
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                userName: "",
                email: "",
                homePage: "",
                message: "",
            }}
            validationSchema={Yup.object().shape({
                userName: Yup.string().required(),
                email: Yup.string().email().required(),
                homePage: Yup.string(),
                message: Yup.string().required(),
            })}
        >
            {props => {
                const {
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <div className={'input-container'}>
                            <div className={'input_center'}>
                                <div className="input-box">
                                    <label className="s-form-box__label">User name*</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                            <div className="s-form-box__add-box">
                                <label>
                                    <Field type="checkbox" name="not_robot"/>
                                    {'not robot'}
                                </label>
                                {errors.not_robot && touched.not_robot && (
                                    <div className="form_error">{errors.not_robot}</div>
                                )}
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    </div>
}
