import React, { Component } from 'react'
import classNames from 'classnames'
import FontAwesome from 'react-fontawesome'
import './Issue.css'

class Issue extends Component {
  constructor (props) {
    super(props)
    this.state = { expanded: false }
    this.handleToggle = this.handleToggle.bind(this)
  }

  render () {
    return <div className={this.wrapperClassNames()}>
      <div className='Issue__body' onClick={this.handleToggle}>
        <div className='Issue__icon'>
          {this.hasSubtasks() && this.issueIcon()}
        </div>

        <div className='Issue__key'>
          <a href={this.props.url}>{this.props.issueKey}</a>
        </div>

        <div className='Issue__summary'>
          {this.props.summary}
        </div>

        {this.hasSubtasks() &&
          <div className='Issue__subtasks-count'>
            ({this.subtasksCount()})
          </div>
        }
      </div>

      {this.state.expanded && this.hasSubtasks() &&
        <div className='Issue__subtasks'>
          {this.props.subtasks.map(this.renderIssue)}
        </div>
      }
    </div>
  }

  renderIssue (issue, i) {
    return <Issue issueKey={issue.key} {...issue} key={i} />
  }

  wrapperClassNames () {
    return classNames('Issue', {
      'Issue--done': this.props.status === 'Done',
      'Issue--to-do': this.props.status === 'To Do',
      'Issue--in-progress': this.props.status === 'In Progress',
      'Issue--epic': this.props.type === 'Epic',
      'Issue--task': this.props.type === 'Task',
      'Issue--subtask': this.props.type === 'Sub-task'
    })
  }

  hasSubtasks () {
    return this.props.subtasks && this.props.subtasks.length > 0
  }

  issueIcon () {
    const name = this.state.expanded ? 'minus-square-o' : 'plus-square-o'
    return <FontAwesome name={name} />
  }

  handleToggle (event) {
    event.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }

  subtasksCount () {
    const total = this.props.subtasks.length
    const done = this.props.subtasks.filter((task) => (task.status === 'Done' && task)).length
    return (done > 0) ? `${done}/${total}` : `${total}`
  }
}

export default Issue
