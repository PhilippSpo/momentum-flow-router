/* global Momentum: true */
/* global Transitioner: true */

Transitioner = {
  transitions: [],
  current: '',
  updateRoutesTransitions: function () {
    var self = this;
    // tried to work around using tracker, but this seems to be the best fit
    // the reason is, that you need this function to update on the inital route
    Tracker.autorun(function () {
      var route = FlowRouter._routeName.get();
      // set transition
      var from = self.current,
        to = route;

      // set new current route
      self.current = route;

      if (self.transitions.hasOwnProperty(from + '->' + to)) {
        self.transition = self.transitions[from + '->' + to];
      } else {
        self.transition = self.transitions['default'];
      }
    });
  },
  getRouteForName: function (name) {
    return _.findWhere(FlowRouter._routes, {
      name: name
    });
  },
  getRouteForPath: function (path) {
    return _.findWhere(FlowRouter._routes, {
      path: path
    });
  },
  setTransitions: function (transitions) {
    var self = this;
    self.transitions = transitions;
  }
};
Transitioner.updateRoutesTransitions();

Momentum.registerPlugin('flow-router', function (options) {
  check(options.options, Match.Optional(Function));

  var getPluginOptions = function () {
    var type = Transitioner.transition;

    if (_.isUndefined(type)) {
      type = 'none'; // XXX: what should this be?
    }

    return type;
  };

  var getPlugin = function (node) {
    var pluginOptions = getPluginOptions(node);

    if (_.isString(pluginOptions)) {
      pluginOptions = {
        with: pluginOptions
      };
    }

    var plugin = Momentum.plugins[pluginOptions.with];
    if (!plugin) {
      return console.error("Can't find momentum plugin '" + pluginOptions
        .with +
        "'");
    }

    pluginOptions = _.extend(_.omit(options, 'options'), pluginOptions);
    return plugin(_.omit(pluginOptions, 'with'));
  };

  return {
    insertElement: function (node, next, done) {
      getPlugin(node).insertElement(node, next, done);
    },
    moveElement: function (node, next, done) {
      getPlugin(node).moveElement(node, next, done);
    },
    removeElement: function (node, done) {
      getPlugin(node).removeElement(node, done);
    },
    // force: true
  };
});
