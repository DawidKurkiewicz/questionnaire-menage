import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Navbar from './Navigation/Menu';
import AddGroup from './Components/AddGroup';
import AddQuestion from './Components/AddQuestion';
import AddUser from './Components/AddUser';
import AddTest from './Components/AddTest';

const style = {
  links: {
    textDecoration: 'none'
  }
};

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Navbar>
          <Link
              to='/addGroup'
              style={style.links}
            >
              <MenuItem>
                Add Group of Users
          </MenuItem>
            </Link>
            <Link
              to='/addUser'
              style={style.links}>
              <MenuItem>
                Add One User
          </MenuItem>
            </Link>
            <Link
              to='/addTest'
              style={style.links}
            >
              <MenuItem>
                Add Test
          </MenuItem>
            </Link>
            <Link
              to='/addQuestion'
              style={style.links}
            >
              <MenuItem>
                Add Question
          </MenuItem>
            </Link>
          </Navbar>
          <div>
            <Switch>
              <Route path="/" exact={true} component={AddTest}></Route>
              <Route path='/addTest' component={AddTest}></Route>
              <Route path='/addQuestion' component={AddQuestion}></Route>
              <Route path='/addGroup' component={AddGroup}></Route>
              <Route path='/addUser' component={AddUser}></Route>      
            </Switch>
          </div>
        </div>
      </Router>
    )
  };
};

export default App;
