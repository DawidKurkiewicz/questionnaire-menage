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
            value: 0,
            chosenCategoryFilter: 0,
            isFormFilledCorrectly: false,
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
    onTextQuestionInputChangeHandler = (event) => {
        this.setState({
            newQuestion: {
                ...this.state.newQuestion,
                question: event.target.value
            }
        })
    }

    onSaveButtonClickHandler = (event) => {
        if (this.state.newQuestion.category !== '' &&
            this.state.newQuestion.question !== '') {
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
                <br />
                <TextField
                    floatingLabelText="Question"
                    fullWidth={true}
                    onChange={this.onTextQuestionInputChangeHandler}
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