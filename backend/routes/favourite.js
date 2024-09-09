const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            return res.status(200).json({ message: "Book is already in favourites." });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid }});
        return res.status(200).json({ message: "Book Added To Favourites." });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error." });
    }
});

router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try{
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid }});
        }
        return res.status(200).json({ message: "Book Removed From Favourites." });
    }catch(error){
        res.status(500).json({ message: "Internal Server Error." });
    }
});

router.get("/get-favourite-book", authenticateToken, async (req, res) => {
    try{ 
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({ 
            status: "Succes.",
            data: favouriteBooks,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Error Occured." });
    }
});

module.exports = router;