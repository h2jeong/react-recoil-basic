import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./layout/Header";
import Notification from "./layout/Notification";
import Create from "./note/Create";
import List from "./note/List";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./user/Dashboard";
import Login from "./user/Login";
import Register from "./user/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <main>
        <Notification />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/list" component={List} />
          <Route path="/create" component={Create} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
