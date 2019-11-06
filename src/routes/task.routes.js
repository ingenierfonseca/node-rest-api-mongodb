import {Router} from 'express';
import app from '../server';
const router = Router();

// Database connection
import {connect} from '../database';
import { ObjectID } from 'mongodb';

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('task').find({}).toArray();
    res.json(result);
});

router.get('/:id', async(req, res) => {
    const db = await connect();
    const { id } = req.params
    const result = await db.collection('task').findOne({
        _id: ObjectID(id)
    });
    res.json(result);
})

router.post('/', async(req, res) => {
    const db = await connect();
    const task = {
        title: req.body.title, 
        description: req.body.description
    };
    const result = await db.collection('task').insert(task);
    res.json(result.ops[0]);
})

router.put('/', async(req, res) => {
    const db = await connect();
    const { id } = req.body;
    const task = {
        title: req.body.title, 
        description: req.body.description
    };
    const result = await db.collection('task').updateOne({_id: ObjectID(id)}, {$set: task});
    res.json({
        message: "Tast update id:" + id,
        result
    });
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('task').remove({_id: ObjectID(id)});
    // Other option
    //const result = await db.collection('task').deleteOne({_id: ObjectID(id)});
    res.json({
        message: "Tast delete id:" + id,
        result
    })
})

export default router;