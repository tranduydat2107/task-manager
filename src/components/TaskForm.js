import React from 'react'
 class TaskForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task
            });
        }

        if(nextProps.task === null){
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }

    // static getDerivedStateFromProps(nextProps){
    //     if(nextProps && nextProps.task){
    //         return ({
    //                 id: nextProps.task.id,
    //                 name: nextProps.task.name, 
    //                 status: nextProps.task.status
    //         });
    //     }
    //     return null;
    // }

    componentDidMount(){ 
        //console.log('test');
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseTaskForm();
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status"){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state); 
        // Sau khi thêm mới 1 task xong thì clear form và đóng task form
        
        // clear form
        this.onClear();
        // Close Task form
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',   
            name: '',
            status: false
        });
    }

     render(){

        var { id } = this.state;

         return(    
              <div className="panel panel-warning">
                  <div className="panel-heading">
                      <h3 className="panel-title">
                          {/* Task Form */}

                        {id !=='' ? 'Cập Nhật Công Việt' : 'Thêm Công Việc' }   
                        <span onClick={this.onCloseForm}>
                            <i className="fas fa-times-circle text-right"></i>
                        </span>                  
                        
                      </h3> 
                  </div>
                  <div className="panel-body">

                      <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                              <label>Tên :</label>
                              <input type="text" 
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange} />
                          </div>
                          <label>Trạng Thái :</label>
                          <select className="form-control" 
                                  required="required"
                                  name="status"
                                  value={this.state.status}
                                  onChange={this.onChange}>
                              <option value={true}>Kích Hoạt</option>
                              <option value={false}>Ẩn</option>
                          </select>
                          <br/>
                          <div className="text-center">
                              <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                          </div>
                      </form>

                      
                  </div>
              </div>
         );
     }
 }

 export default TaskForm;