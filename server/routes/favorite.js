const express = require('express');
const router = express.Router();

const { Favorite } = require('../models/Favorite')


router.post('/favoriteNumber', (req, res) =>{
    
    //  mongoDB에서 favorite 값만 가져오기.
    Favorite.find({ "movieId": req.body.movieId})
        .exec(( err, info) => {
            if(err) return res.status(400).send(err)
            //  그런다음 프론트쪽으로 값을 보내주기.
            res.status(200).json({ success: true, favoriteNumber: info.length })
    })

})

router.post('/favorited', (req, res) => {
    

    //  내가 Favorite List에 넣었는지 DB에서 확인하기
    //  mongoDB에서 favorite 값만 가져오기.
    Favorite.find({ "movieId": req.body.movieId, "userFrom":req.body.userFrom })
        .exec(( err, info) => {
            if(err) return res.status(400).send(err)
            //  그런다음 프론트쪽으로 값을 보내주기.
            let result = false;
            
            if(info.length !== 0)   {
                result = true
            }
            
            res.status(200).json({ success: true, favoriteNumber: result })

    })

})

router.post("/addToFavorite", (req, res) => {

    console.log(req.body)

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/removeFromFavorite", (req, res) => {


    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});

router.post("/getFavoriteMovie", (req, res) => {

    const favorite = new Favorite(req.body);

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })

});

module.exports = router;

