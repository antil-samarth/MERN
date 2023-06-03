const Group = require('../models/groups');
const mongoose = require('mongoose');

//get all groups
const getAllGroups = async (req, res) => {
    const user_id = req.user._id;

    const groups = await Group.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json({ groups });
};

//get specific group
const getGroup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const group = await Group.findById(id);

    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ group });
};

//create a group
const createGroup = async (req, res) => {
    const { groupId,groupName } = req.body;

    let emptyFields = [];
    if (!groupId) emptyFields.push('groupId');
    if (!groupName) emptyFields.push('groupName');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `The following fields are empty: ${emptyFields.join(', ')}` });
    }

    try {
        const user_id = req.user._id;
        const group = await Group.create({groupId,groupName, user_id});
        res.status(200).json({ group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a group
const deleteGroup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Group not found' });
    }
    
    const group = await Group.findByIdAndDelete(id);

    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ group });
};

//update a group
const updateGroup = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Group not found' });
    }

    const group = await Group.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!group) {
        return res.status(404).json({ error: 'Group not found' });
    }

    res.status(200).json({ group });
};


module.exports = {
    createGroup,
    getAllGroups,
    getGroup, 
    deleteGroup,
    updateGroup
};