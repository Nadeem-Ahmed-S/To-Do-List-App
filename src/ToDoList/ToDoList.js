import React, { Component } from 'react'
import './ToDoList.css'

class ToDoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            task: '',
            tasks : [
                
            ],
            task_id : 0,
            task_desc : {id : 0,name: '',status:'incomplete'}
        };
        this.taskUpdate = this.taskUpdate.bind(this);
        this.taskSubmit = this.taskSubmit.bind(this);
        this.taskDelete = this.taskDelete.bind(this);
        this.statusUpdate=this.statusUpdate.bind(this);
        this.idUpdate = this.idUpdate.bind(this);
    }

    taskUpdate(event){
        this.setState({
            task : event.target.value,
            task_desc : {...this.state.task_desc, name : event.target.value,}
        });
    }

    idUpdate(){
        const tasksDescDup = {...this.state.task_desc};
        let numId = this.state.task_id;
        tasksDescDup.id = numId + 1;
        this.setState({
            task_id : numId + 1,
            task_desc : tasksDescDup
        })
    }

    taskSubmit(event){
        this.idUpdate();
        const tasksDuplicate = [...this.state.tasks];
        const joined = tasksDuplicate.concat(this.state.task_desc);
        this.setState({
            tasks : joined,
            task : ''
        });
        event.preventDefault();
    }

    taskDelete(itemId){
        const array1 = [...this.state.tasks];
        const itemReq = array1.findIndex(obj => obj.id === itemId);
        array1.splice(itemReq, 1);
        this.setState({
            tasks : array1
        })
    }

    statusUpdate(itemId){
        const tasksCopy = [...this.state.tasks];
        const indexValue = tasksCopy.find(obj => obj.id === itemId);
        indexValue.status = 'completed';
        this.setState({
            tasks : tasksCopy
        })
    }

    render(){
        const listItems = this.state.tasks.map((item) => {
            return <div className="item-div" key={item.id}>
                <li className="item">{item.name} 
                    <button className="delete-button" onClick={() =>this.taskDelete(item.id)}>Delete</button>
                    <button className={item.status === 'incomplete' ? "update-button-incomplete" : "update-button-complete"} onClick={() =>this.statusUpdate(item.id)}>{item.status}</button>
                </li> 
            </div>
        })

        return(
            <div>
                <h1>To-Do List App</h1>
                <form className="wrapper" onSubmit={this.taskSubmit}>
                    <input className="task-value" placeholder="Enter a task" value={this.state.task} onChange={this.taskUpdate}/>
                    <button disabled={this.state.task.length === 0} className="submit-button">Add</button>
                    <input className="cancel-button" type="reset" value="Cancel" />
                </form>
                {listItems}
            </div>
        );
    }

}

export default ToDoList;