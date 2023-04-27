const express = require('express');
const Group = require('../models/groups');

const { 
    createGroup,
    getAllGroups,
    getGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupControllers');

const router = express.Router();

router.get('/', getAllGroups);

router.get('/:id', getGroup);

router.post('/', createGroup);

router.delete('/:id', deleteGroup);

router.patch('/:id', updateGroup);

module.exports = router;