const presets = [
	['@babel/env', {
		targets: {
			edge: '17',
			ie: '11',
			firefox: '50',
			chrome: '64',
			safari: '11.1'
		},
		useBuiltIns: 'entry'
	}]
];


// {
// 	"presets": [
// 		["@babel/preset-env", {
// 			"targets": [
// 				"last 5 version"
// 			]
// 		}
// 		],
// 		"minify"
// 	],
// 		"comments": false
// }