import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class MyBooks extends React.Component{
    /**
     * Declare property types.
     */
    static propTypes ={
        books: PropTypes.array.isRequired,
    }

    /**
     * Moves book from one shelf to another.
     */
    moveBook = (event, book) =>{
        // Get shelf to move book to.
        let newShelf = event.options[event.selectedIndex].value;

        // Update DB and state w/ new location.
        BooksAPI.update(book, newShelf).then(() =>{
          // Get the book to update.
          let bookToUpdate = this.props.books.find((b) => b.id === book.id);
          bookToUpdate.shelf = newShelf;

          // Force a re-render.
          this.setState({books: this.props.books})
        })
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
                    <ListBooks bookShelfName="Currently Reading" books={this.props.books} onMoveTo={this.moveBook}/>
                    <ListBooks bookShelfName="Want to Read" books={this.props.books} onMoveTo={this.moveBook}/>
                    <ListBooks bookShelfName="Read" books={this.props.books} onMoveTo={this.moveBook}/>
                </div>
                <Link to="/search" className="open-search"></Link>
            </div>
        );
    }
}

export default MyBooks