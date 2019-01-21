import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Navbar from './Navigation/Menu';
import AddGroup from './Components/AddGroup';
import AddQuestion from './Components/AddQuestion';
import AddUser from './Components/AddUser';
import AddTest from './Components/AddTest';
import TestList from './Components/TestList'
import AddQuestionnaire from './Components/AddQuestionnaire'

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
              to='/testList'
              style={style.links}
            >
              <MenuItem>
                List
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
            <Link
              to='/addUser'
              style={style.links}>
              <MenuItem>
                Add Student
          </MenuItem>
            </Link>
            <Link
              to='/addTest'
              style={style.links}
            >
              <MenuItem>
                Add Set of Questions
          </MenuItem>
            </Link>
            <Link
              to='/addGroup'
              style={style.links}
            >
              <MenuItem>
                Add Group of Students
          </MenuItem>
            </Link>
            <Link
              to='/addQuestionnaire'
              style={style.links}
            >
              <MenuItem>
                Add Questionnaire
              </MenuItem>
            </Link>
          </Navbar>
          <div>
            <Switch>
              <Route path="/" exact={true} component={TestList}></Route>
              <Route path='/testList' component={TestList}></Route>
              <Route path='/addTest' component={AddTest}></Route>
              <Route path='/addQuestion' component={AddQuestion}></Route>
              <Route path='/addGroup' component={AddGroup}></Route>
              <Route path='/addUser' component={AddUser}></Route>
              <Route path='/addQuestionnaire' component={AddQuestionnaire}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  };
};

export default App;
