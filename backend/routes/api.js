const express = require('express');
const Group = require('../models/groups');

const { 
    createGroup,
    getAllGroups,
    getGroup,
    deleteGroup,
    updateGroup
} = require('../controllers/groupControllers');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getAllGroups);

router.get('/:id', getGroup);

router.post('/', createGroup);

router.delete('/:id', deleteGroup);

router.patch('/:id', updateGroup);

module.exports = router;