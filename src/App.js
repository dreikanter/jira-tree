import React, { Component } from 'react'
import 'whatwg-fetch'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import Issue from './Issue'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      issues: undefined,
      error: undefined,
      progress: undefined
    }
  }

  componentDidMount () {
    this.loadIssues()
  }

  loadIssues () {
    this.setState({ progress: 'Loading issues data...' })

    window.fetch('/tmp/issues.json').then((response) => {
      this.setState({ progress: 'Processing data...' })
      return response.json()
    }).then((json) => {
      this.setState({ progress: `Epics: ${json.length}` })
      this.setState({ issues: json })
    }).catch((ex) => {
      this.setState({ progress: 'Error processing data' })
      console.log('Parsing failed', ex)
    })
  }

  render () {
    return <Grid className='App'>
      <Row>
        <Col lg={12}>
          {this.state.progress && <Alert>{this.state.progress}</Alert>}
          {this.state.issues && this.state.issues.map((issue, i) =>
            <Issue issueKey={issue.key} {...issue} key={i} />)}
        </Col>
      </Row>
    </Grid>
  }
}

export default App
