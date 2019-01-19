import React from 'react'
import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import MenuItem from "material-ui/MenuItem"
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'
import { unifyString } from './utils'


import { database } from '../firebase'

const style = {
    paper: {
        margin: 20,
        padding: 20
    },
    button: {
        marginTop: 20
    },
    item: {
        float: "center"
    },
    snackbar: {
        width: '100%',
        maxWidth: '100%',
    }
}

class AddTestView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUserId: "guest",
            value: "",
            questions: [],
            open: false,
            chosenCategoryFilter:0,
            isFormFilledCorrectly: false,
            categoryFilters: ['Any', "set1", "set2", "set3", "set4", "set5"],
            createdTest: {}
        }
    }

    loadData = () => {
        database.ref(`/questions`).on(
            'value',
            snapshot => {
                if (!snapshot.val()) {
                    this.setState({ questions: {} })
                    return
                }
                const questionsArray = Object.entries(snapshot.val())
                const questionsList = questionsArray.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ questions: questionsList })
            }
        )
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillUnmount() {
        database.ref('/questions').off()
    }

    onSearchSelectFieldValueChangeHandler = (event, index, value) => {
        this.setState({
            chosenCategoryFilter: value,
            createdTest: {
                ...this.state.createdTest,
                category: this.state.categoryFilters[value]
            }
        })
    }


    onClickSaveHandler = (event) => {
        if (this.state.createdTest.category !== '' &&
            this.state.createdTest.description !== '' &&
            Object.keys(this.state.createdTest.questions).length !== 0) {
            this.setState({ isFormFilledCorrectly: true })
            this.postToFirebase()
            this.setState({
                open: true
            })
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    postToFirebase = () => {
        database.ref(`/users/${this.state.currentUserId}/tests`).push(this.state.createdTest)
    }

    onTextInputChangeHandler = (event) => {
        this.setState({
            createdTest: {
                ...this.state.createdTest,
                description: event.target.value
            }
        })
    }
    onCheckBoxSelectionHandler = (id) => {
        const newQuestions = {
            ...this.state.createdTest.questions,
        };
        newQuestions[id] = true
        this.setState({
            createdTest: {
                ...this.state.createdTest,
                questions: newQuestions
            }
        })
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                <h2> New test  </h2>
                <TextField
                    floatingLabelText="Name your test"
                    fullWidth={true}
                    onChange={this.onTextInputChangeHandler}
                />

                <SelectField
                    floatingLabelText="Sets"
                    value={this.state.chosenCategoryFilter}
                    onChange={this.onSearchSelectFieldValueChangeHandler}
                >
                    {this.state.categoryFilters.map((filter, index) => (
                        <MenuItem
                            key={index}
                            value={index}
                            primaryText={filter}
                        />
                    ))}
                </SelectField>
                <List>
                    < Subheader > Available Questions</Subheader>
                    {
                        this.state.questions &&
                        this.state.questions.map &&
                        this.state.questions
                            .filter((question) => (
                                (this.state.chosenCategoryFilter === 0)
                                    ?
                                    true :
                                    unifyString(question.category) === unifyString(this.state.categoryFilters[this.state.chosenCategoryFilter])
                            ))
                            .map(question => (
                                <ListItem
                                    key={question.id}
                                    primaryText={question.question}
                                    leftCheckbox={<Checkbox
                                        onClick={() => this.onCheckBoxSelectionHandler(question.id)} />}
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
                    message={this.state.isFormFilledCorrectly ?
                        "Your test has been added to the database" :
                        "Your test has not been filled correctly !"
                    }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper>
        )
    }
}
export default AddTestView