const express = require ('express')
const router = express.Router()
const Post = require('../models/Post.js')
const to = require('await-to-js').default



router.get('/posts', async(req, res)=>{
    let [ error, result ] = await to(Post.find())
    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(result)
})

router.get('/posts/:id', async(req,res)=>{
    let { id } = req.params
    let [ error, result ] = await to(Post.findOne({_id:id}))
    if(error){
        res.status(500).json({message:error.message})
    }
    return res.json(result)
})

router.post('/posts', async(req, res)=>{
    const { title, author, imageURL, content } = req.body
    const newPost = new Post({
        title,
        author,
        imageURL,
        content,
        createdAt: Date()
    })

    let [ error ] = await to( newPost.save())
    console.log(title, author, imageURL, content)
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('adding post')
})

router.delete('/posts/:id', async(req,res)=>{
    let { id } = req.params
    let [ error ]= await to(Post.deleteOne({_id:id}))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('deleting post')
})

router.put('/posts/:id', async(req, res)=>{
    let { id } = req.params
    let { title, imageURL, content } = req.body
    let [ error ]= await to(Post.updateOne(
        {_id:id},
        { $set:{title, imageURL, content}}
    ))
    if(error){
        res.status(400).json({message:error.message})
    }
    return res.send('updating post')


})

module.exports = router
