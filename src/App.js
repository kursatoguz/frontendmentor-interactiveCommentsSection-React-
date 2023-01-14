import "./App.css";
import Comments from "./components/Comments";
import UserComment from "./components/SendComment";

function App() {
  return (
    <div className="container">
      <Comments />
      <UserComment commentType="send" />
    </div>
  );
}

export default App;
