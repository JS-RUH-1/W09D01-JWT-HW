## W08D03 HW
### Library with mongoose
* Install mongoose 
* Create app.js file and make the connection with mongoose
* Create models folder that contain schema for author and book
    * author schema:
        1. name ==> type: string, required with message: "Author name should be provided"
        2. age ==> type: Number
        3. nationality ==> type: String, required with message: "Author nationality should be provided"
        4. image ==> type: string, required with message: "Author image should be provided"
        5. gender  ==> type: string
        6. books ==> array of bookSchema 

    * book schema:
        1. title ==> type: string, required with message: "Book title should be provided"
        2. pages ==> type: Number, required with message: "Book pages should be provided"
        3. price: ==> type: Number, default: 0
        4. image ==> type: string, required with message: "Book image should be provided"

* Add the author and book data we gave you in book_seed, author_seed:
    *  Write a command and run it ONCE for each model in app.js for example if we want to insert books from seed file: 

    ```
    const Book = require("./models/bookAndAuthor").Book;
    const seedBook = require("./book_seed");
    Book.insertMany(seedBook, (err, books) => {
      if (err){ console.log(err)}
        console.log("added provided books data", books)
        mongoose.connection.close();
      });
    ```
do the same for Author with author_seed data

* Querying
    * Add at least 2 new author and book
    * Select:

    ```
    Author.find({}, (err, authors) => {
    console.log(authors);
    mongoose.connection.close();
    }); 
    ```

    1. Find all male authors
    2. Find all authors that age grater than 44
    3. Find all authors in Kuwait country
    4. Find all the books that start with L or l
    5. Find all the books that have pages more than 250
     
    * Select with OR, AND 
        1. Find all authors that in Kuwait or Saudi Arabia
        2. Find all authors that have 3 books or more and their age grater than 35
    * Select by exists or does not exist
        1. Author do not have a key of age
    * Negative Selection
        1. Author are not from Saudi Arabia
    * Update 
        1. Update Osama Al Muslim age to be 45
    * Remove
        1. Remove all book that have price less than 50