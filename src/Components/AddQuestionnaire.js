import React from 'react'
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Snackbar from 'material-ui/Snackbar'


import { database } from '../firebase'

const style = {
    paper: {
        margin: 20,
        padding: 20
    },
    button: {
        marginTop: 20
    },
    snackbar: {
        width: '100%',
        maxWidth: '100%',
    }
}

class AddQuestionnaireView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questionnaires: [],
            open: false,
            createdQuestionnaire: {
                description: "",
                groups: {},
                tests: {},

            }
        }
    }

    loadGroupsData = () => {
        database.ref(`/groups`).on(
            'value',
            snapshot => {
                if (!snapshot.val()) {
                    this.setState({ groups: {} })
                    return

                }
                const groupsArray = Object.entries(snapshot.val())
                const groupsList = groupsArray.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ groups: groupsList })
            }
        )
    }
    loadTestData = () => {
        database.ref(`/tests`).on(
            'value',
            snapshot => {
                if (!snapshot.val()) {
                    this.setState({ tests: {} })
                    return

                }
                const testsArray = Object.entries(snapshot.val())
                const testsList = testsArray.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ tests: testsList })
            }
        )
    }

    componentDidMount() {
        this.loadGroupsData()
        this.loadTestData()

    }

    componentWillUnmount() {
        database.ref('/groups').off()
        database.ref('/tests').off()

    }

    onClickSaveHandler = () => {
        if (this.state.createdQuestionnaire.description !== '' &&
            Object.keys(this.state.createdQuestionnaire.tests).length !== 0
            && Object.keys(this.state.createdQuestionnaire.groups).length !== 0 ) {
            this.postToFirebase()
            this.myFormRef.reset();
            this.setState({
              open: true,
              createdQuestionnaire: {
                description: "",
                groups: {},
                tests: {}
              }
            });
        } else {
            alert("Please check if you are added Title, Tests and Students")
        }
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    postToFirebase = () => {
        database.ref(`/questionnaires`).push(this.state.createdQuestionnaire)
    }

    onTextInputChangeHandler = (event) => {
        this.setState({
            createdQuestionnaire: {
                ...this.state.createdQuestionnaire,
                description: event.target.value
            }
        })
    }
    onTestCheckBoxSelectionHandler = (id) => {
        const newQuestionnaires = {
            ...this.state.createdQuestionnaire.tests,
        };
        newQuestionnaires[id] = true
        this.setState({
            createdQuestionnaire: {
                ...this.state.createdQuestionnaire,
                tests: newQuestionnaires,
            }
        })
    }
    onGroupCheckBoxSelectionHandler = (id) => {
        const newQuestionnaires = {
            ...this.state.createdQuestionnaire.groups,
        };
        newQuestionnaires[id] = true
        this.setState({
            createdQuestionnaire: {
                ...this.state.createdQuestionnaire,
                groups: newQuestionnaires,
            }
        })
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                        <form ref={el => (this.myFormRef = el)}>

                <h2> New Questionnaire  </h2>
                <TextField
                    floatingLabelText="Name your questionnaire"
                    fullWidth={true}
                    onChange={this.onTextInputChangeHandler}
                />
                <List>
                    < Subheader > Available Tests</Subheader>
                    {
                        this.state.tests &&
                        this.state.tests.map &&
                        this.state.tests
                            .map(test => (
                                <ListItem
                                    key={test.id}
                                    primaryText={test.description }
                                    leftCheckbox={<input
                                        type="checkbox"
                                        onClick={() => this.onTestCheckBoxSelectionHandler(test.id)} />}
                                />
                            ))
                    }
                </List >
                <List>
                    < Subheader > Available Groups</Subheader>
                    {
                        this.state.groups &&
                        this.state.groups.map &&
                        this.state.groups
                            .map(group => (
                                <ListItem
                                    key={group.id}
                                    primaryText={group.description }
                                    leftCheckbox={<input
                                        type="checkbox"
                                        onClick={() => this.onGroupCheckBoxSelectionHandler(group.id)} />}
                                />
                            ))
                    }
                </List >

                <RaisedButton
                    label="Save"
                    primary={true}
                    fullWidth={true}
                    style={style.button}
                    onClick={this.onClickSaveHandler}
                />

                <Snackbar
                    open={this.state.open}
                    style={style.snackbar}
                    bodyStyle={style.snackbar}
                    message={
                        "Your questionnaire has been added to the database"
                    }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                </form>
            </Paper>
        )
    }
}
export default AddQuestionnaireView