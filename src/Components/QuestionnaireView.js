import React from 'react';
import Paper from 'material-ui/Paper';
import { database } from '../firebase';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const style = {
    paper: {
        margin: 20,
        padding: 20,
        height: "100%",
        textAlign: 'center',
        wordWrap: "break-word"
    },
    button: {
        marginTop: 20
    },
}

class QuestionnaireView extends React.Component {
    constructor(props) {
        super(props)
        this.state.id = props.match.params.id
    }

    state = {
        id: "",
        questionnaire: {},
        questionnaireArray: [],
        numOfTests: 0,
        numOfGroups: 0
    }

    loadData = () => {
        database.ref(`/questionnaires/${this.state.id}`).on(
            'value',
            snapshot => {
                this.setState({ questionnaire: snapshot.val() })
                this.setState({ questionnaireArray: Object.values(this.state.questionnaire) })
                this.setState({ numOfTests: Object.values(this.state.questionnaireArray[2]).length })
                this.setState({ numOfGroups: Object.values(this.state.questionnaireArray[1]).length })
            }
        )
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillUnmount() {
        database.ref(`/questionnaires/${this.state.id}`).off()
    }

    render() {
        return (
            <Paper
                style={style.paper}>
                <h1>Title: {this.state.questionnaire.description}</h1>
                <h3 style={style.text}>{`Number of Tests: ${this.state.numOfTests}`}</h3>
                {/* <h3 style={style.text}> {`Tests included: ${this.state.questionnaireArray[2]}`}</h3> */}
                <h3 style={style.text}>{`Number of Groups: ${this.state.numOfGroups}`}</h3>
                {/* <h3 style={style.text}> {`Groups included: ${this.state.questionnaireArray[1]}`}</h3> */}
                <Link
                    to='/List'
                    style={style.links}
                >
                    <RaisedButton
                        label={"Back to Questionnaire list"}
                        primary={true}
                        style={style.button}
                    >
                    </RaisedButton>
                </Link>
            </Paper>
        )
    }
}

export default QuestionnaireView