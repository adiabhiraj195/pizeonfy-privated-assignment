
import ThemeButton from "./theme";
import Login from "./pages/login";
import Register from "./pages/register";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PostPage from "./pages/post-page";

function App() {
  return (
    <div className="App min-w-full min-h-screen bg-red-100 dark:bg-black dark:text-white" >
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/register" Component={Register}/>
        <Route path="/dashboard" Component={Dashboard}/>
        <Route path="/dashboard/:id" Component={PostPage}/>
      </Routes>
      
      {/* <ThemeButton /> */}
    </div>
  );
}

export default App;
