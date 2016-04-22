/**
 * Poll.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	title: {
		type: 'string',
		required: true
	},
	choices: {
		type: 'array',
		required: true
	},
	votes: {
		type: 'array',
		required: true
	}
};

