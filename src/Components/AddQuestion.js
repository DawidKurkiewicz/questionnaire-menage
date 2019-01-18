import React from 'react'

import Paper from "material-ui/Paper"
import SelectField from "material-ui/SelectField"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import MenuItem from "material-ui/MenuItem"
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
    item: {
        float: "center"
    },
    snackbar:{
        width:'100%',
        maxWidth:'100%',
    }
}

class AddQuestionView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            value: 0,
            chosenCategoryFilter: 0,
            isFormFilledCorrectly: false,
            categoryFilters: ['1', "2", "3", "4", "5", "6"],
            chosenLevel: 0,
            levelFilters: ['type1', 'type2', 'type3'],
            newQuestion: {
                category: '1',
                correct_answer: '',
                type: 'Easy',
                incorrect_answers: {
                },
                question: '',
            }
        }
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleCategoryChange = (event, index, value) => {
        this.setState({
            chosenCategoryFilter: value,
            newQuestion: {
                ...this.state.newQuestion,
                category: this.state.categoryFilters[value]
            }
        })
    }
    handleLevelChange = (event, index, value) => {
        this.setState({
            chosenLevel: value,
            newQuestion: {
                ...this.state.newQuestion,
                type: this.state.levelFilters[value]
            }
        })
    }

    makeOnTextInputChangeHandler = (index) => (event) => {
        const newIncorrectAnswer = {
            ...this.state.newQuestion.incorrect_answers,
            [index]: event.target.value
        }
        console.log(newIncorrectAnswer)
        this.setState({
            newQuestion: {
                ...this.state.newQuestion,
                incorrect_answers: newIncorrectAnswer
            }
        })
    }
    onTextQuestionInputChangeHandler = (event) => {
        this.setState({
            newQuestion: {
                ...this.state.newQuestion,
                question: event.target.value
            }
        })
    }

    onTextCorrectAnswerChangeHandler = (event) => {
        this.setState({
            newQuestion: {
                ...this.state.newQuestion,
                correct_answer: event.target.value
            }
        })
    }


    onSaveButtonClickHandler = (event) => {
        if (this.state.newQuestion.category !== '' &&
            this.state.newQuestion.correct_answer !== '' &&
            this.state.newQuestion.question !==''&&
            Object.values(this.state.newQuestion.incorrect_answers).map(answer=>answer!==0) ) {
            
            this.setState({ isFormFilledCorrectly: true })
            database.ref('/questions').push(this.state.newQuestion)
            this.setState({ open: true })
        } else {
            this.setState({ open: true })
        }
    }


    render() {
        return (
            <Paper
                style={style.paper}>
                <h2>
                    Add question
                        </h2>
                <SelectField
                    floatingLabelText="Choose category"
                    value={this.state.chosenCategoryFilter}
                    onChange={this.handleCategoryChange}
                >
                    {this.state.categoryFilters.map((category, index) => (
                        <MenuItem
                            key={index}
                            value={index}
                            primaryText={category}
                        />
                    ))}
                </SelectField>
                <br />
                <SelectField
                    floatingLabelText="type"
                    value={this.state.chosenLevel}
                    onChange={this.handleLevelChange}
                >
                    {this.state.levelFilters.map((level, index) => (
                        <MenuItem
                            key={index}
                            value={index}
                            primaryText={level}
                        />
                    ))}
                </SelectField>
                <TextField
                    floatingLabelText="Question"
                    fullWidth={true}
                    onChange={this.onTextQuestionInputChangeHandler}
                />

                <TextField
                    floatingLabelText="Incorrect answer"
                    fullWidth={true}
                    onChange={this.makeOnTextInputChangeHandler(0)}
                />
                <TextField
                    floatingLabelText="Incorrect answer"
                    fullWidth={true}
                    onChange={this.makeOnTextInputChangeHandler(1)}
                />
                <TextField
                    floatingLabelText="Incorrect answer"
                    fullWidth={true}
                    onChange={this.makeOnTextInputChangeHandler(2)}
                />
                <TextField
                    floatingLabelText="Correct answer"
                    fullWidth={true}
                    onChange={this.onTextCorrectAnswerChangeHandler}
                />
                <RaisedButton
                    label="Save question"
                    primary={true}
                    fullWidth={true}
                    style={style.button}
                    onClick={this.onSaveButtonClickHandler}
                />
                <Snackbar
                    open={this.state.open}
                    style={style.snackbar}
                    bodyStyle={style.snackbar}
                    message={this.state.isFormFilledCorrectly ?
                        "Your question has been added to our database" :
                        "Your new question form has not been filled correctly"
                    }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}

                />
            </Paper>
        )
    }
}
export default AddQuestionView