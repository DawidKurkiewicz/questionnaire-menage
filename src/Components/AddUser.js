import React from 'react'
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
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

class AddStudentView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            desciption: "",
            open: false,
            newStudent: {
                student: '',
            }
        }
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    onTextStudentInputChangeHandler = (event) => {
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                student: event.target.value
            }
        })
    }
    onSaveButtonClickHandler = (event) => {
        if (this.state.newStudent.student !== '') {
            database.ref('/students').push(this.state.newStudent)
            this.myFormRef.reset();
            this.setState({
                open: true,
                chosenCategoryFilter: 0,
                newStudent: {
                    student: '',
                }
            })
        } else {
            this.setState({ open: false })
            alert("Please check if you are added your student name")
        }
    }


    render() {
        return (
            <Paper
                style={style.paper}>
                <form ref={el => (this.myFormRef = el)}>
                    <h2>
                        Add user
                        </h2>
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
                        message={
                            "Student added"
                        }
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </form>
            </Paper>
        )
    }
}
export default AddStudentView