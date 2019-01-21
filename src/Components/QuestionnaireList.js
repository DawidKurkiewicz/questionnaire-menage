import React from 'react'
import { List, ListItem } from 'material-ui/List'
import { database } from '../firebase'
import Paper from "material-ui/Paper"
import { Link } from 'react-router-dom'





const style = {
    paper: {
        margin: 20,
        padding: 20,
        textAlign: "center"
    },
    button: {
        marginTop: 20
    },
    snackbar: {
        width: '100%',
        maxWidth: '100%',
    }
}

class QuestionnaireList extends React.Component {
    state = {
        questionnaires: null,
    }
    loadData = () => {
        database.ref(`/questionnaires`).on(
            'value',
            snapshot => {
                if (!snapshot.val()) {
                    this.setState({ questionnaires: [] })
                    return
                }
                const questionnairesArray = Object.entries(snapshot.val())
                const questionnairesList = questionnairesArray.map(([id, values]) => {
                    values.id = id
                    return values
                })
                this.setState({ questionnaires: questionnairesList })
            }
        )
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillUnmount() {
        database.ref(`/questionnaires`).off()
    }
    render() {
        return (
            <div>
                <Paper
                    style={style.paper}>
                    <List>
                        {
                            this.state.questionnaires &&
                            this.state.questionnaires.map &&
                            this.state.questionnaires
                                .map(questionnaire => (
                                    <Link
                                        to={`/questionnaire/${questionnaire.id}`}
                                        style={{ textDecoration: 'none' }}
                                        key={questionnaire.id}
                                    >
                                        <ListItem
                                            key={questionnaire.id}
                                            primaryText={questionnaire.description}
                                        />
                                    </Link>
                                ))
                        }
                    </List >

                </Paper>
            </div>
        )
    }
}
export default QuestionnaireList