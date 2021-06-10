import React, { Component } from 'react'

export default class Sort extends Component {

    onClick = (sortBy, sortValue) =>{
        this.props.onInputSort(sortBy, sortValue);        
    }

    render() {

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className=" fas fa-caret-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick = { () => this.onClick('name', 1) }>
                            <a role="button"
                                className={ (this.props.onAppSortBy === 'name' && this.props.onAppSortValue === 1) ? 'sort_selected' : '' }>
                                <span>
                                    <i className="fas fa-sort-alpha-up"></i> &nbsp; 
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li onClick = {() => this.onClick('name', -1)} >
                            <a role="button"
                                className={ (this.props.onAppSortBy === 'name' && this.props.onAppSortValue === -1) ? 'sort_selected' : '' }>
                                <span>
                                    <i className="fas fa-sort-alpha-up-alt"></i> &nbsp;
                                    Tên Z-A
                                </span>
                            </a>
                        </li>
                        
                        <li role="separator" className="divider"></li>

                        <li onClick = {() => this.onClick('status', 1)} >
                            <a role="button"
                               className={ (this.props.onAppSortBy === 'status' && this.props.onAppSortValue === 1) ? 'sort_selected' : '' }
                            >
                                <span>
                                    Trạng Thái Kích Hoạt
                                </span>
                            </a>
                        </li>

                        <li onClick = {() => this.onClick('status', -1)} >
                            <a role="button"
                                className={ (this.props.onAppSortBy === 'status' && this.props.onAppSortValue === -1) ? 'sort_selected' : '' }   
                            >
                                <span>
                                    Trạng Thái Ẩn
                                </span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        )
    }
}

