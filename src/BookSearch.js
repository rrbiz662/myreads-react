import React from "react"
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./ListBooks";

class BookSearch extends React.Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveTo: PropTypes.func.isRequired
  }

  state = {
    query: "",
    matchingBooks: []
  }

  /**
   * @description Adds shelf property to matching elements in the passed in array.
   * @param booksToShelf An array of books to add "shelf" property to.
   */
  addShelf = (booksToShelf) => {
    //  Adding shelf property to elements since they do not come w/ it from the DB.
    this.props.books.forEach(element => {
      let matchingElement = booksToShelf.find((b) => b.id === element.id);

      if(matchingElement)
        matchingElement["shelf"] = element.shelf;
    });

  }

  /**
   * @description Searches for books matching the passed in query.
   * @param event The event to get the query from.
   */
  searchBooks = (event) => {
    let inputText = event.target.value;

    if(inputText !== ""){
      BooksAPI.search(inputText).then((matchingBooks) => {
        let relevantBooks = matchingBooks;

        // Search returns error when no entry is found.
        if(matchingBooks.error)
          relevantBooks = [];

        this.addShelf(relevantBooks);

        this.setState({
          matchingBooks: relevantBooks
        });
      })

      this.setState({
        query: inputText
      });
    }
    else{
      this.setState({
        query: "",
        matchingBooks: []
      })
    }
  }

  /**
   * Renders a search results book list.
   */
  render(){
    // Add shelf property before re-rendering.
    this.addShelf(this.state.matchingBooks);

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.searchBooks}/>
          </div>
        </div>
        <ListBooks bookShelfName="Search Results" books={this.state.matchingBooks} onMoveTo={this.props.onMoveTo}/>
      </div>
    );
  }
}

export default BookSearch