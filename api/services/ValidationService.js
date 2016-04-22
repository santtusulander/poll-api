'use strict'

const _    = require('lodash')
const uuid =require('uuid')

module.exports = {

		validateCreationData(requestData) {
		return new Promise((resolve, reject) => {
			let choices = []
			if(requestData.choices && _.isArray(requestData.choices)) {
				requestData.choices.forEach(item => {
					if(_.isString(item) || _.isInteger(item))
						choices.push({
							label: item,
							id: uuid.v1()
						})
				})
				if(choices.length !== requestData.choices.length)
					return reject(new Error('Choices must be string or integer values'))
			}
			else if(!requestData.choices || !_.isArray(requestData.choices))
				return reject(new Error('Request must contain a choices array'))
			if(!requestData.title || !_.isString(requestData.title))
				return reject(new Error('Request must contain string title'))
			return resolve({ choices: choices, title: requestData.title })
		})
	},

	validateVotingData(requestData) {
		return new Promise((resolve, reject) => {
			return requestData.choice_id && _.isString(requestData.choice_id)
				? resolve()
				: reject(new Error('Request must contain a choice ID string'))
		})
	}

}