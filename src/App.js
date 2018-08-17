import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  moveBook = (event, book) =>{
    // Get shelf to move book to.
    let newShelf = event.options[event.selectedIndex].value;

    // Update DB and state w/ new location.
    BooksAPI.update(book, newShelf).then(() =>{
      // Get the book to update.
      let bookToUpdate = this.state.books.find((b) => b.id === book.id);
      bookToUpdate.shelf = newShelf;

      // Force a re-render.
      this.setState({books: this.state.books})
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books: books});
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks bookShelfName="Currently Reading" books={this.state.books} onMoveTo={this.moveBook}/>
                <ListBooks bookShelfName="Want to Read" books={this.state.books} onMoveTo={this.moveBook}/>
                <ListBooks bookShelfName="Read" books={this.state.books} onMoveTo={this.moveBook}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp