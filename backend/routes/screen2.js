const express=require('express');
const router=express.Router();
const Details = require('../model/User2');
const authMiddleware=require('../middleware/auth');

router.post('/details',authMiddleware ,async (req, res) => {
    const { username, number, email, address } = req.body;

    let oldDetails = await Details.findOne({email: email});
    if(oldDetails) {
        res.status(409).json({message: "Details already recorded", details: oldDetails});
    } else {
        const details = await Details.create({
            username: username,
            number: number,
            email: email,
            address: address
        })
        res.status(200).json({message: "User added successfully"});
    }
})

router.get('/get_details',authMiddleware ,async (req, res) => {
    const details = await Details.find({});
    res.status(200).send({details: details});
})

router.delete('/delete_user/:id',authMiddleware , (req, res) => {
    Details.findByIdAndRemove(req.params.id, (err, response) => {
        if(err) {
            res.json({error: err})
        } else {
            res.status(200).send({message: "User deleted successfully"});
        }
    })
})

module.exports=router;