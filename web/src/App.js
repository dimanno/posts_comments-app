// import {RootCommentsList} from "./components/RootComments.list";
import {Route, Routes} from "react-router-dom"
import {Auth} from "./pages/Auth";
import {CommentProvider} from "./context/CommentContext";
import {CommentPage} from "./pages/Comment.page";

function App() {
  return (
    <div className="container">
        <Routes>
            <Route path="/auth" element={<Auth/>}/>
            {/*<Route path="/comments" element={<RootCommentsList/>}/>*/}
            <Route
                path="/comments"
                element={
                <CommentProvider>
                    <CommentPage/>
                </CommentProvider>
            }/>
        </Routes>
    </div>
  );
}

export default App;
