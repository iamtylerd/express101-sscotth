'use strict';

const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')

module.exports.new = (req,res, err) =>
		Promise
			.all([
				Size.find().sort({ inches: 1 }),
				Topping.find().sort({name: 1})
			])
			.then(([sizes, toppings]) => res.render('order', {page: 'Order', sizes, toppings}))
			.catch(err)

module.exports.create = (req, res, error) => {
		Order
			.create(req.body)
			.then(() => res.redirect('/'))
			.catch((error) => {
				const msg = Object.keys(error.errors).map(key => error.errors[key].message);
				 return Promise
					.all([
						Size.find().sort({ inches: 1 }),
						Topping.find().sort({name: 1})
			])
			.then(([sizes,toppings]) =>	{
				res.render('order', {page :'order', sizes, toppings, msg})
			});
		});
	}
