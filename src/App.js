import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import MyBooks from './MyBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

   /**
   * Moves book from one shelf to another.
   */
  moveBook = (event, book) =>{
    // Get shelf to move book to.
    let newShelf = event.options[event.selectedIndex].value;

    // Update DB and state w/ new location.
    return (BooksAPI.update(book, newShelf).then(() =>{
      // Check if book already exists in books array.
      let bookToUpdate = this.state.books.find((b) => b.id === book.id);

      if(bookToUpdate){
        if(newShelf !== "none"){
          bookToUpdate["shelf"] = newShelf;
          this.setState({books: this.state.books})
        }
        else{
          bookToUpdate["shelf"] = newShelf;
          this.setState({books: this.state.books.filter((b) => b.id !== bookToUpdate.id)})
        }
      }
      else{
        book["shelf"] = newShelf;
        this.setState({books: this.state.books.concat([book])})
      }
    }));
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books: books});
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <BookSearch books={this.state.books} onMoveTo={this.moveBook}/>
        )}/>
        <Route exact path="/" render={() => (
          <MyBooks books={this.state.books} onMoveTo={this.moveBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp