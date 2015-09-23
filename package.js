Package.describe({
	name: "philippspo:momentum-flow-router",
	summary: "A momentum plugin for transitioning Flow Router pages",
	version: "0.0.5",
	git: "https://github.com/philippspo/momentum-flow-router.git"
});

Package.on_use(function (api, where) {
	api.versionsFrom('METEOR@0.9.2');

	api.use(['tracker',
			'check',
			'underscore',
			'templating',
			'kadira:flow-router@2.1.1',
			'percolate:momentum@0.7.2'
		],
		'client');

	api.add_files('flow-router-transitions.js', ['client']);
	api.add_files('style.css', ['client']);

	api.export('Transitioner');
});
