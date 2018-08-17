import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

const CURR_READING_SHELF = "currentlyReading";
const WANT_READ_SHELF = "wantToRead";
const READ_SHELF = "read";
const NO_SHELF = "none";

class ListBooks extends React.Component{
    /**
     * Declare property types.
     */
    static propTypes ={
        bookShelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
    }

    /**
     * Get the shelf to filter by.
     */
    getShelf = () => {
        let shelfName = this.props.bookShelfName;
        switch(shelfName){
            case "Currently Reading":
                return CURR_READING_SHELF;
            case "Want to Read":
                return WANT_READ_SHELF;
            case "Read":
                return READ_SHELF;
            default:
                return NO_SHELF;
        }
    }

    /**
     * Render book list based on passed in filtering argument.
     */
    render(){
        // Get the books in the current shelf.
        let currentShelf = this.getShelf(this.props.bookShelfName);
        let currentBooks = this.props.books.filter((book) => book.shelf === currentShelf);

        currentBooks.sort(sortBy("title"));

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                {currentBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.author}</div>
                        </div>
                    </li>
                ))}
                </ol>
                </div>
            </div>
        );
    }
}

export default ListBooks