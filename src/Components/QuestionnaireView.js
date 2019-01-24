import React from 'react';
import Paper from 'material-ui/Paper';
import { database } from '../firebase';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";

const style = {
    paper: {
        margin: 20,
        padding: 20,
        height: "100%",
        textAlign: 'center',
        wordWrap: "break-word"
    },
    button: {
        marginTop: 20
    },
    subheader: {
      fontSize: "20px"
    }
}

class QuestionnaireView extends React.Component {
    constructor(props) {
        super(props)
        this.state.id = props.match.params.id
    }

    state = {
        id: "",
        questionnaire: {},
        questionnaireArray: [],
        numOfTests: 0,
        numOfGroups: 0
    }

    loadData = () => {
        database.ref(`/questionnaires/${this.state.id}`).on("value", snapshot => {
          this.setState({ questionnaire: snapshot.val() });
          let arrayOfGroups = []
          let arrayOfTests = []
          Object.keys(snapshot.val().groups).forEach(key => {
            arrayOfGroups.push(key)
          })
          Object.keys(snapshot.val().tests).forEach(key => {
            arrayOfTests.push(key)
          })
          this.loadGroupsData(arrayOfGroups)
          this.loadTestData(arrayOfTests)
          this.setState({
            questionnaireArray: Object.values(this.state.questionnaire)
          })
          this.setState({
            numOfTests: Object.values(this.state.questionnaireArray[2]).length
          })
          this.setState({
            numOfGroups: Object.values(this.state.questionnaireArray[1]).length
          })
        })
      }

      loadGroupsData = arrayOfGroups => {
        database.ref(`/groups`).on("value", snapshot => {
          if (!snapshot.val()) {
            this.setState({ groups: {} })
            return
          }
          const groupsArray = Object.entries(snapshot.val())
          const groupsList = groupsArray.map(([id, values]) => {
            values.id = id
            return values
          })
          let array = []
          groupsList.filter(el => {
            if (arrayOfGroups.includes(el.id)) {
              array.push(el.description)
            }
            return el
          })
          console.log(array);
          this.setState({ groups: array.join(", ") })
        })
      }

      loadTestData = arrayOfTests => {
        database.ref(`/tests`).on("value", snapshot => {
          if (!snapshot.val()) {
            this.setState({ tests: {} })
            return
          }
          const testsArray = Object.entries(snapshot.val())
          const testsList = testsArray.map(([id, values]) => {
            values.id = id
            return values
          })
          let array = []
          testsList.filter(el => {
            if (arrayOfTests.includes(el.id)) {
              array.push(el.description);
            }
            return el
          })
          this.setState({ tests: array.join(", ") })
        })
      }

      componentDidMount() {
        this.loadData();
      }
      componentWillUnmount() {
        database.ref(`/questionnaires/${this.state.id}`).off();

      }

    render() {
            return (
                <Paper style={style.paper}>
                  <h1>Title: {this.state.questionnaire.description}</h1>
                  <h3 style={style.text}>{`Number of Tests: ${
                    this.state.numOfTests
                  }`}</h3>
                  <List>
                    <Subheader style={style.subheader}> Tests included: </Subheader>
                    <ListItem disabled={true} primaryText={this.state.tests} />
                  </List>
                  <h3 style={style.text}>{`Number of Groups: ${
                    this.state.numOfGroups
                  }`}</h3>
                  <List>
                    <Subheader style={style.subheader}> Groups included: </Subheader>
                    <ListItem disabled={true} primaryText={this.state.groups} />
                  </List>
                <Link
                    to='/List'
                    style={style.links}
                >
                    <RaisedButton
                        label={"Back to Questionnaire list"}
                        primary={true}
                        style={style.button}
                    >
                    </RaisedButton>
                </Link>
            </Paper>
        )
    }
}

export default QuestionnaireView