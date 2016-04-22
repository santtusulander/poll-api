'use strict';

/**
 * PollController
 *
 * @description :: Server-side logic for managing polls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * Maybe its not necessary to respond with created and edited objects
 * since the client will already have that data.
 */

module.exports = {

	create(req, res) {
		ValidationService.validateCreationData(req.body).then(data => {
			PollService.createPoll(data, res)
		}, error => {
			res.badRequest(error)
		})
	},

	vote(req, res) {
		ValidationService.validateVotingData(req.body)
			.then(() => PollService.voteOnPoll(req, res),
				error => badRequest(error)
			)
	},

	get(req, res) {
		PollService.getPoll(req, res)
	},

	getWithResults(req, res) {
		PollService.getPollWithResults(req, res)
	}

};

