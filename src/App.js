import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import MyBooks from './BookCase'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
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
          <BookSearch books={this.state.books}/>
        )}/>
        <Route exact path="/" render={() => (
          <MyBooks books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp