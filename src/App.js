import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
             tasks: [],
             isDisplayForm: false,
             taskEditing: null,
             filter: {
                 filterName: '',
                 filterStatus: -1
             }, 
             keyword: '',
             sortBy: 'name',  //   mặc định là sort theo tên và tăng dần từ A-Z
             sortValue: 1
        }
    }

    s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + "-" + this.s4() + "-" + this.s4();
    } 

    componentDidMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log('Reload page');
            this.setState({
                tasks: tasks
            });
        }
    }

    onToggleForm = () => {
        //nếu form đang mở và có tồn tại 1 task thì không đóng form đồng thời clear nội dung form
        if(this.state.isDisplayForm && this.state.taskEditing !== null){   
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        }else{   
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }
        
    }

    onDisplayForm = () => {
        if(!this.state.isDisplayForm){
            this.setState({
                isDisplayForm: true
            });
        }
    }

    onCloseForm = () => {
        if(this.state.isDisplayForm){
            this.setState({
                isDisplayForm: false,
            });
        }
        
    }

    onSubmit = (data) => {  // khi bấm nút Thêm thì TaskForm sẽ trả ra cho App 1 object
        var { tasks } = this.state; 

        if(data.id === ''){   // nếu id là rỗng thì thêm sản phẩm
            data.id = this.generateID(); // data là 1 cái task
            tasks.push(data); // push 1 task mới vô trong 
        }else{    //ko rỗng thì là update
            var index = this.findIndexById(data.id);  
            tasks[index] = data;
        }
        
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        //console.log(id); 
        var { tasks } = this.state;
        var index = this.findIndexById(id);
        if(index !== -1){
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDeleteTask = (id) => {
        var tasks  = this.state.tasks;
        var index = this.findIndexById(id);
        if(index !== -1){
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.setState({
            isDisplayForm: false
        });
    }


    findIndexById = (id) => {
        var { tasks } = this.state;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }

    onUpdateTask = (id) =>{
        var { tasks } = this.state;
        //open taskform 
        this.setState({
            isDisplayForm: true
        });
        var index = this.findIndexById(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        //console.log(taskEditing);
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                filterName: filterName,
                filterStatus: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        });
    }

    onSort = (sortBy, sortValue) =>{
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

  render() {

    var { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state;  // var tasks = this.state.tasks; var isDisplayForm = this.state.isDisplayForm
    
    if(filter){
        
        if(filter.filterName){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.filterName.toLowerCase()) !== -1;
            });
        }

        tasks = tasks.filter((task) => {
        if(filter.filterStatus === -1){
            return tasks;
        }else{
            return task.status === (filter.filterStatus === 1 ? true : false );
        }            
        });

        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }

    }
    
    if(sortBy === 'name'){
        if(sortValue === 1){
            tasks.sort( (task1, task2) => {
                if(task1.name.toLowerCase() > task2.name.toLowerCase()){
                    return 1;
                }else if(task1.name.toLowerCase() < task2.name.toLowerCase()){
                    return -1;
                }else{
                    return 0;
                }
            });
        }else{
            tasks.sort( (task1, task2) => {
                if(task1.name.toLowerCase() > task2.name.toLowerCase()){
                    return -1;
                }else if(task1.name.toLowerCase() < task2.name.toLowerCase()){
                    return 1;
                }else{
                    return 0;
                }
            });
        }
    }else{
        if(sortValue === 1){
            tasks.sort((task1, task2) => {
                if(task1.status < task2.status ){
                    return 1;
                }else if( task1.status > task2.status){
                    return -1;
                }else{
                    return 0;
                }
            });
        }else{
            tasks.sort((task1, task2) => {
                if(task1.status > task2.status ){
                    return 1;
                }else if( task1.status < task2.status){
                    return -1;
                }else{
                    return 0;
                }
            });
        }
    }  
        

    var eleTaskForm = (isDisplayForm ? <TaskForm onCloseTaskForm = {this.onCloseForm} // if isDisplayForm thì set component là <TaskForm /> ko thì set là rỗng để ko hiển thị
                                                 onSubmit = {this.onSubmit}
                                                 task={taskEditing}/> : '');

    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
            <div className="row">
                <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4":"col-xs-0 col-sm-0 col-md-0 col-lg-0" }>

                    {/* Hiển thị task form */}
                    { eleTaskForm }
                </div>
                <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}>
                        <span className="fa fa-plus mr-5"></span> Thêm Công Việc
                    </button>
                    {/* Search - Sort */}
                    <Control onSearch={ this.onSearch }
                            onSort={ this.onSort }
                            onSortBy = { sortBy }
                            onSortValue = { sortValue } 
                    /> <br />
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            {/* Table List */}
                            <TaskList tasks ={ tasks }
                                        onUpdateStatus = { this.onUpdateStatus }
                                        onDeleteTask = { this.onDeleteTask }
                                        onUpdateTask = { this.onUpdateTask }
                                        onFilter = { this.onFilter } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;

