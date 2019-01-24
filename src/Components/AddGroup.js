import React from 'react';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';
import { database } from '../firebase';

const style = {
    paper: {
        margin: 20,
        padding: 20,
        wordWrap: "break-word"
    },
    button: {
        marginTop: 20
    },
    snackbar: {
        width: '100%',
        maxWidth: '100%',
    }
}

class AddGroupView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            open: false,
            value: "",
            createdGroup: {
                description: "",
                students: {},
            }
        }
    }

    loadData = () => {
        database.ref(`/students`).on(
            'value',
            snapshot => {
                if (!snapshot.val()) {
                    this.setState({ students: {} })
                    return
                }
                const studentsArray = Object.entries(snapshot.val())
                const studentsList = studentsArray.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ students: studentsList })
            }
        )
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillUnmount() {
        database.ref('/students').off()
    }

    onClickSaveHandler = () => {
        if (this.state.createdGroup.description !== '' &&
            Object.keys(this.state.createdGroup.students).length !== 0) {
            this.postToFirebase()
            this.myFormRef.reset()
            this.setState({
                open: true,
                value: "",
                createdGroup: {
                    description: "",
                    students: {},
                }
            })

        } else {
            alert("Please check if you added Title and Students  ")
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        })
    }

    postToFirebase = () => {
        database.ref(`/groups`).push(this.state.createdGroup)
    }

    onTextInputChangeHandler = (event) => {
        this.setState({
            value: event.target.value,
            createdGroup: {
                ...this.state.createdGroup,
                description: event.target.value
            }
        })
    }

    onCheckBoxSelectionHandler = (id) => {
        const newStudents = {
            ...this.state.createdGroup.students,
        }
        newStudents[id] = true
        this.setState({
            createdGroup: {
                ...this.state.createdGroup,
                students: newStudents
            }
        })
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                <h2> New group  </h2>
                <TextField
                    floatingLabelText="Name your group"
                    fullWidth={true}
                    onChange={this.onTextInputChangeHandler}
                    value={this.state.value}
                />
                <form ref={el => (this.myFormRef = el)}>
                    <List>
                        < Subheader > Available Students</Subheader>
                        {
                            this.state.students &&
                            this.state.students.map &&
                            this.state.students
                                .map(student => (
                                    <ListItem
                                        key={student.id}
                                        primaryText={student.student}
                                        leftCheckbox={<input
                                            type="checkbox"
                                            onClick={() => this.onCheckBoxSelectionHandler(student.id)} />
                                        }
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
                            "Your group has been added to the database"
                        }
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </form>
            </Paper>
        )
    }
}

export default AddGroupView