import React from 'react';
import Paper from "material-ui/Paper";
import SelectField from "material-ui/SelectField";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/MenuItem";
import Snackbar from 'material-ui/Snackbar';
import { database } from '../firebase';

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

class AddQuestionView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            value: "",
            chosenCategoryFilter: 0,
            categoryFilters: ['Any', "type1", "type2", "type3", "type4", "type5"],
            chosenLevel: 0,
            newQuestion: {
                category: 'Any',
                question: '',
            }
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    handleCategoryChange = (event, index, value) => {
        this.setState({
            chosenCategoryFilter: value,
            newQuestion: {
                ...this.state.newQuestion,
                category: this.state.categoryFilters[value]
            }
        })
    }

    onTextQuestionInputChangeHandler = (event) => {
        this.setState({
            value: event.target.value,
            newQuestion: {
                ...this.state.newQuestion,
                question: event.target.value
            }
        })
    }

    onSaveButtonClickHandler = (event) => {
        if (
            this.state.newQuestion.question !== '') {
            database.ref('/questions').push(this.state.newQuestion)
            this.setState({
                open: true,
                value: "",
                chosenCategoryFilter: 0,
                newQuestion: {
                    category: 'Any',
                    question: '',
                }
            })
        } else {
            this.setState({ open: false })
            alert("Please check if you are added your question")
        }
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                    <h2>Add question</h2>
                    <SelectField
                        floatingLabelText="Choose type"
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
                    <TextField
                        floatingLabelText="Question"
                        fullWidth={true}
                        onChange={this.onTextQuestionInputChangeHandler}
                        value={this.state.value}
                    />
                    <RaisedButton
                        label="Save"
                        primary={true}
                        fullWidth={true}
                        style={style.button}
                        onClick={this.onSaveButtonClickHandler}
                    />
                    <Snackbar
                        open={this.state.open}
                        style={style.snackbar}
                        bodyStyle={style.snackbar}
                        message={
                            "Your question has been added to our database"
                        }
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
            </Paper>
        )
    }
}

export default AddQuestionView