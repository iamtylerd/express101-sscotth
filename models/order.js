'use strict';
const mongoose = require('mongoose')

const HTML_EMAIL_VAL= /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Schema
module.exports = mongoose.model('Order', {
	name: { type: String, required: [true, 'Please enter your name']},
	email: { type: String, required: true, lowercase: true, match: HTML_EMAIL_VAL },
	phone: { type: String, required: [true, 'Please enter your phone number'] },
	size: { type: Number, required: [true, 'Please enter a size'] },
	toppings: [String]
});
