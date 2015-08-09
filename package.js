Package.describe({
	name: "philippspo:momentum-flow-router",
	summary: "A momentum plugin for transitioning Flow Router pages",
	version: "0.0.4",
	git: "https://github.com/philippspo/momentum-flow-router.git"
});

Package.on_use(function (api, where) {
	api.versionsFrom('METEOR@0.9.2');

	api.use(['tracker',
			'underscore',
			'templating',
			'kadira:flow-router',
			'kadira:blaze-layout',
			'percolate:momentum@0.7.2',
			'aldeed:template-extension@3.4.3'
		],
		'client');

	api.add_files('flow-router-transitions.js', ['client']);
	api.add_files('style.css', ['client']);

	api.export('Transitioner');
});
