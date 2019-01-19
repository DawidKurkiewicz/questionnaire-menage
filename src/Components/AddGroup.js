import React from 'react'
import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
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
    snackbar: {
        width: '100%',
        maxWidth: '100%',
    }
}

class AddGroupView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUserId: "quest",
            students: [],
            open: false,
            isFormFilledCorrectly: false,
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
    onClickSaveHandler = (event) => {
        if (this.state.createdGroup.description !== '' &&
            Object.keys(this.state.createdGroup.students).length !== 0) {
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
        database.ref(`/users/${this.state.currentUserId}/groups`).push(this.state.createdGroup)
    }

    onTextInputChangeHandler = (event) => {
        this.setState({
            createdGroup: {
                ...this.state.createdGroup,
                description: event.target.value
            }
        })
    }
    onCheckBoxSelectionHandler = (id) => {
        const newStudents = {
            ...this.state.createdGroup.students,
        };
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
                />
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
                                    leftCheckbox={<Checkbox
                                        onClick={() => this.onCheckBoxSelectionHandler(student.id)} />}
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
                        "Your group has been added to the database" :
                        "Your group has not been filled correctly !"
                    }
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </Paper>
        )
    }
}
export default AddGroupView