import React,{Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder , deleteReminder,clearReminders } from '../actions';
import moment from 'moment';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      text:"",
      dueDate: ""
    }
  }

  alertOptions = {
   offset: 14,
   position: 'bottom left',
   theme: 'dark',
   time: 5000,
   transition: 'scale'
 }

 showAlert = () => {
   this.msg.show('Some text or component', {
     time: 2000,
     type: 'success'
   })
 }

 alertRemind = (reminder) => {
   var date = new Date().toLocaleString();
   console.log("date : ",date);
   console.log("reminder due : ",reminder.dueDate);
   if(reminder.dueDate < date){
     this.showAlert();
   }
 }

  addReminder(){
    console.log("Due Date: ",this.state.dueDate);
    this.props.addReminder(this.state.text,this.state.dueDate);
  }

  clearReminders(){
    this.props.clearReminders();
  }

  deleteReminder(id){
    console.log("deleting in application ",id);
    console.log("this.props",this.props);
    this.props.deleteReminder(id);
  }



  renderReminders(){
    const { reminders } = this.props;
    return(
      <ul className="list-group col-sm-4">
      {
        reminders.map(reminder => {
          return(
            <li key={ reminder.id}  className="list-group-item" >
              <div className="list-item">
                <div> {reminder.text} </div>
                { this.alertRemind(reminder) }
                <div><em>{ moment(new Date(reminder.dueDate)).fromNow() }</em></div>
             </div>
              <div className="list-item delete-button" onClick = {() => this.deleteReminder(reminder.id)} >
                &#x2715;
              </div>
            </li>
          )
        })
      }
      </ul>
    )
  }

  render(){
    return(
      <div className="App">
        <div className="title">ReminderPro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input className="form-control"
              placeholder="I have to ..."
              onChange = {event => this.setState({text: event.target.value })}
              />
            <input className="form-control"
              type="datetime-local"
              onChange= {event => this.setState({dueDate: event.target.value})}
            />
          </div>
          
          <button type="button"
              className="btn btn-success"
              onClick = {() => this.addReminder()}
              >Add Reminder
          </button>
      </div>
      {
        this.renderReminders()
      }
      <div className="btn btn-danger"
        onClick={ () => this.clearReminders() }
      >
      Clear Reminder List
      </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({addReminder , deleteReminder,clearReminders },dispatch);
}

function mapStateToProps(state){
  return {
    reminders: state
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
