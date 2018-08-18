import React from "react"
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import * as BooksAPI from "./BooksAPI"
import ListBooks from "./ListBooks";

class BookSearch extends React.Component{
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: "",
    matchingBooks: []
  }

  searchBooks = (event) => {
    let inputText = event.target.value;

    if(inputText !== ""){
      BooksAPI.search(inputText).then((books) => {
        let relevantBooks = books;

        // Search returns error when no entry is found.
        if(books.error)
          relevantBooks = [];
        console.log(relevantBooks[0]);
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
            <ListBooks bookShelfName="Search Results" books={this.state.matchingBooks}/>
        </div>
      );
  }
}

export default BookSearch