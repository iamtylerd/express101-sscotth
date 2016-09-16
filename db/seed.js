'use strict';
//How to seed to a database
const { connect, disconnect } = require('./database')
const Size = require('../models/size')
const Toppings = require('../models/topping')

connect()
	.then(() => Size.remove({}))
	.then(() => Toppings.remove({}))
	.then(() =>
		Size.insertMany([{
			name: 'Small',
			inches: 10,
		},
		{
			name: "Medium",
			inches: 12,
		},
		{
			name: "Large",
			inches: 14,
		},
		{
			name: "America",
			inches: 1776,
		}]))
	.then(() =>
		Toppings.insertMany([{
			name: 'Pep',
		},
		{
			name: "Sausage",
		},
		{
			name: "Mushrooms",
		},
		{
			name: "Bacon",
		}]))
	.then(disconnect)
