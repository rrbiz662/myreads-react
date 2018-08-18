# myreads-react
This project consists of a web-based application built using `React` that allows users to organize their books. In the main web page the user is provided three categories (`"Currently Reading", "Want To Read", and "Read"`) that can be used to organize their books. There is also a search page that allows the user to search for books that they may want to add to their current reads. The search functionality is limited to only being able provide results when one of the search terms listed in the `Important` section is used.

The project demonstrates various key `React` concepts to include: `routing`, `lifecycle events`, `state management`, and `composition`. Routing is provided via `react-router-dom` module and allows us to navigate from the main page to the search page and vice versa displaying the correct content each time. Lifecycle events are used to get data from the database via the `BooksAPI` at the correct time; in this case, via the `componentDidMount` function which is called after the `BooksApp` component is added to the DOM. State management is used to ensure that the most up to date data is being reflected on the page; when we move a book from one category to another, the change is reflected by displaying the book in the new category. Using composition, the application was able to be split up into separate smaller components that display more specialized data. The `MyBooks` component is used to display the user's current books while the `BookSearch` component is used to display the results from the search; both of these components use the `ListBooks` component to display their list of books accordingly.

## Getting Started
These instructions will get you a copy of the project on your local machine for development and/or testing purposes.

### Prerequisites
To view the webpage properly the user will require a working `Internet Connection`.

To get the dependencies and run the server the user will require `npm` JavaScript package manager.

### Installing
To get a copy of the project to work on locally, the user can either `download the zip` or `clone the repository`.

## Run the Project
In order to run the project after downloading it:
1) Navigate to the directory where project exists.
2) Open command line interface in the directory.
3) Install dependencies via command: `npm install`.
4) Run development server via command: `npm start`.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms. Search terms include:

`
'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
`

## Built with
* `HTML5`
* `CSS3`
* `JavaScript`
* `React`

## Authors
* Ricardo Rivera

## Acknowledgments
* `Udacity` - For the starter source code.