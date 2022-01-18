const checkAuth = require('../checkAuth')
const express = require('express');
const router = express.Router();
const models = require('../models')

// GET /api/v1/teams/
router.get('/', checkAuth, (req, res) => {
  models.Team.findAll({ where: { UserId: req.user.id }})
    .then(teams => {
      res.json(teams)
    })
});

// DELETE /api/v1/teams/6 
router.delete('/:id', checkAuth, (req, res) => {
  models.Team.destroy({ where: { 
    id: req.params.id,
    UserId: req.user.id
  }})
    .then(numberDeleted => {
      if (numberDeleted === 0) {
        res.status(404).json({ error: 'could not find that team' })
        return
      }

      res.json({ success: 'team deleted successfully' })
    })
})

// POST /api/v1/teams
router.post('/', checkAuth, (req, res) => {
  // check for required fields
  if (!req.body.name || !req.body.league || !req.body.sport) {
    res.status(400).json({ error: 'please include all required fields' })
    return
  }

  // create team in database
  models.Team.create({
    name: req.body.name,
    league: req.body.league,
    sport: req.body.sport,
    UserId: req.user.id
  })
    .then(team => {
      // respond to client with new team
      res.status(201).json(team)
    })
})

module.exports = router;
