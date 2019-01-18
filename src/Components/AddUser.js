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

class AddStudentView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            value: 0,
            chosenGroupFilter: 0,
            isFormFilledCorrectly: false,
            groupFilters: ['group1', "group2", "group3", "group4"],
            newStudent: {
                group: 'group1',
                student: '',
            }
        }
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleGroupChange = (event, index, value) => {
        this.setState({
            chosenGroupFilter: value,
            newStudent: {
                ...this.state.newStudent,
                group: this.state.groupFilters[value]
            }
        })
    }
    onTextStudentInputChangeHandler = (event) => {
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                student: event.target.value
            }
        })
    }
    onSaveButtonClickHandler = (event) => {
        if (this.state.newStudent.group !== '' &&
            this.state.newStudent.student !=='') {
            this.setState({ isFormFilledCorrectly: true })
            database.ref('/students').push(this.state.newStudent)
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
                    Add user
                        </h2>
                <SelectField
                    floatingLabelText="Choose group"
                    value={this.state.chosenGroupFilter}
                    onChange={this.handleGroupChange}
                >
                    {this.state.groupFilters.map((group, index) => (
                        <MenuItem
                            key={index}
                            value={index}
                            primaryText={group}
                        />
                    ))}
                </SelectField>
                <br />
                <TextField
                    floatingLabelText="Student"
                    fullWidth={true}
                    onChange={this.onTextStudentInputChangeHandler}
                />
                <RaisedButton
                    label="Save student"
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
                        "Student added" :
                        "Your new student form has not been filled correctly"
                    }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}

                />
            </Paper>
        )
    }
}
export default AddStudentView