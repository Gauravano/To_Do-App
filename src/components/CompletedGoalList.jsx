import React,{ Component } from 'react';
import { completeGoalRef } from '../firebase';
import { connect } from 'react-redux';
import { setCompletedGoals } from '../actions';

class CompletedGoalList extends Component{

  componentDidMount(){
      completeGoalRef.on('value',snap => {
        let completeGoals = [];
        snap.forEach(completeGoal => {
          const {email,title} = completeGoal.val();
          completeGoals.push({email,title});
        })
        this.props.setCompletedGoals(completeGoals);
        console.log("completedGoals",completeGoals);
      })
  }

  clearCompleted(){
      completeGoalRef.set([]);
  }

  render(){
    return(
      <div>
        {
          this.props.completedGoals.map((completedGoal,index) => {
            const {title,email} = completedGoal;
            return(
                <div key={index} style={{margin:"5px"}}>
                  <strong>{title}</strong> completed by <em>{email}</em>
                </div>
            )
          })
        }
        <button className="btn btn-primary"
          onClick={() => this.clearCompleted()}
        >
          Clear All
        </button>
      </div>
    )
  }
}

  function mapStateToProps(state){
    const { completedGoals } = state;
    return{
      completedGoals
    }
  }

export default connect(mapStateToProps,{setCompletedGoals})(CompletedGoalList);
