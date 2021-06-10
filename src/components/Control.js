import React from 'react'
import Search from './Search';
import Sort from './Sort';

export class Control extends React.Component {
  
  render() {
    return (
        <div className="row mt-15">

            {/* Search */}
            <Search onInputSearch = { this.props.onSearch } />

            {/* Sort */}
            <Sort onInputSort = { this.props.onSort }
                  onAppSortBy = { this.props.onSortBy }
                  onAppSortValue = {this.props.onSortValue} />
            
        </div>
    );
  }
}

export default Control;

