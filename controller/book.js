const Book = require('../model/book');

exports.addBook = async(req, res) => {
    try {
        const user = req.user;
        const newBook = new Book({
          bookName: req.body.bookName,
          authorName: req.body.authorName,
          user: user._id,
        });

        const book = await newBook.save();

        return res.status(200).json({
            success:true,
            data:book,
            message:"book added successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};


exports.getAllBook = async(req, res) => {
    try {
        const books = await Book.find().populate({
            path: "user",
            model: "User",
        })

        return res.status(200).json({
            success:true,
            data:books,
            message:"All books found successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.getBookById = async(req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findById(id);

        return res.status(200).json({
            success:true,
            data:book,
            message:"Book found Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.updateBookById = async(req, res) => {
    try {
        const id = req.params.id;
        const { bookName, authorName } = req.body;

        const book = await Book.findByIdAndUpdate(id);

        book.bookName = bookName;
        book.authorName = authorName;
        
        
        return res.status(200).json({
            success:true,
            data:book,
            message:"Book updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

exports.deleteBookById = async(req, res) => {
    try {
        const id = req.params.id;

        const book = await Book.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            data:book,
            message:"book deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    };
};