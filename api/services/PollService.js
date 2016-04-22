'use strict'

module.exports = {

	createPoll(data, res) {
		let votes = data.choices.map(item => {
			return {
				id: item.id,
				count: 0
			}
		})
		Poll.create({
				choices: data.choices,
				title: data.title,
				votes: votes
			})
			.exec((err, poll) => {
				if(err)
					return res.serverError(err)
				return res.json(200, poll)
			})
	},

	voteOnPoll(req, res) {
		Poll.findOne({ id: req.params.poll_id })
			.exec((err, poll) => {
				if(err)
					return res.serverError(err)
				if(!poll)
					return res.notFound(new Error('Poll not found'))
				poll.votes = poll.votes.map(vote => {
					if(req.body.choice_id === vote.id) {
						return {
							id: vote.id,
							count: vote.count + 1
						}
					}
					return vote
				})
				poll.save((err) => {
					if(err)
						return res.serverError(err)
					return res.json(200, poll)
				})
			})
	},

	getPoll(req, res) {
		Poll.findOne({
				select: ['choices', 'title', 'id'],
				id: req.params.poll_id
			})
			.exec((err, poll) => {
				if(err)
					return res.serverError(err)
				if(!poll)
					return res.notFound(new Error('Poll not found'))
				return res.json(200, poll)
			})
	},

	getPollWithResults(req, res) {
		Poll.findOne({ id: req.params.poll_id })
			.exec((err, poll) => {
				if(err)
					return res.serverError(err)
				if(!poll)
					return res.notFound(new Error('Poll not found'))
				return res.json(200, poll)
			})
	}

}