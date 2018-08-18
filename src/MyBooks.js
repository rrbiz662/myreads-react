import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class MyBooks extends React.Component{
    /**
     * Declare property types.
     */
    static propTypes ={
        books: PropTypes.array.isRequired,
        onMoveTo: PropTypes.func.isRequired
    }

    /**
     * Builds and displays bookcase w/ book shelves.
     */
    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <ListBooks bookShelfName="Currently Reading" books={this.props.books} onMoveTo={this.props.onMoveTo}/>
                    <ListBooks bookShelfName="Want to Read" books={this.props.books} onMoveTo={this.props.onMoveTo}/>
                    <ListBooks bookShelfName="Read" books={this.props.books} onMoveTo={this.props.onMoveTo}/>
                </div>
                <Link to="/search" className="open-search"></Link>
            </div>
        );
    }
}

export default MyBooks