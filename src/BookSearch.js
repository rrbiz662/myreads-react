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

  addShelf = (booksToShelf) => {
    //  Adding shelf property to elements since they do not come w/ it from the DB.
    this.props.books.forEach(element => {
      let matchingElement = booksToShelf.find((b) => b.id === element.id);

      if(matchingElement)
        matchingElement["shelf"] = element.shelf;
    });

  }

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
          query: inputText,
          matchingBooks: relevantBooks})
      })
    }
    else{
      this.setState({
        query: "",
        matchingBooks: []
      })
    }
  }

  render(){
    console.log(this.props.books.length);
      this.addShelf(this.state.matchingBooks);
      console.log(this.state.matchingBooks);


      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search"></Link>
            <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don"t worry if
              you don"t find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.searchBooks}/>
          </div>
          </div>
            <ListBooks bookShelfName="Search Results" books={this.state.matchingBooks} onMoveTo={this.props.onMoveTo}/>
        </div>
      );
  }
}

export default BookSearch