import './App.css';
import Login from './Login/Login'
import SideMenu from './SideMenu/SideMenu'
import {Route,Switch,Link,BrowserRouter,withRouter} from 'react-router-dom'
import Signup from './Signup/Signup'

function App() {
  return (
    <div>
      <BrowserRouter>
      <SideMenu/>
      <Switch>
      <Route exact path="/login/" component={Login}/>
      <Route exact path="/signup/" component={Signup}/>
      </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
