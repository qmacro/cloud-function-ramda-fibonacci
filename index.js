/**
 * Cloud Function
 *
 * Project Euler
 * 2 - Even Fibonacci numbers
 *
 */

const

	// NPM module requires
	R = require('ramda'),

	// Higher-order function that will return a function that
	// returns all fibonacci numbers up to a certain number x
	fibGen = x => {
		return function fib(a=0, b=1) {
			if (a > x) { return []; }
			return [a].concat(fib(b, a + b));
		};
	},

	// Helper predicate function
	isEven = R.pipe(R.modulo(R.__, 2), R.not),

	// This is the core, does the work
	solve = (n=100) => R.sum(R.filter(isEven, fibGen(n)())),

	// Main cloud function entrypoint, takes request and response
	// objects. Expects a number to be supplied as a query parameter
	// 'limit'.
	evenFibonacciSumUnder = (req,res) => {
		res.status(200).send(solve(req.query.limit).toString());
	};


// We're exporting 'solve' also to be able to use it in test.js
exports.solve = solve;
exports.evenFibonacciSumUnder = evenFibonacciSumUnder;

