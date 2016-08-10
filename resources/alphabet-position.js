'use strict';

function alphabetPosition(text) {
	let positions = [];
	text.toLowerCase().split('').forEach(function(val) {
		if (val.charCodeAt() > 1071 && val.charCodeAt() < 1104) {
			positions.push(val.charCodeAt() - 1071);
		}
	});
	return positions.join(' ');
}

module.exports = alphabetPosition;