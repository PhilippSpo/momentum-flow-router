/* global Momentum: true */
/* global Transitioner: true */

// Additional function to support Transitioner.TransitionOrder
function CreateTransitions(Transitions, LastPage, Page) {
  // Create forward and reverse transition based on args
  // console.log('From: ' + LastPage + ' to ' + Page);
  var ForwardPageKey = LastPage + '->' + Page;
  Transitions[ForwardPageKey] = 'right-to-left';
  var ReversePageKey = Page + '->' + LastPage;
  Transitions[ReversePageKey] = 'left-to-right';
  return Transitions;
};

Transitioner = {
    transitions: [],
    current: '',
    updateRoutesTransitions: function () {
        var self = this;
        // no reactive computation anymore here
        // this function gets called once the route changes (flow router triggred)
        //  and once mometum asks for a transition type
        var route = FlowRouter.getRouteName();
        // set transition
        var from = self.current,
            to = route;

        if (from === to) {
            return;
        }

        // set new current route
        self.current = route;

        if (self.transitions.hasOwnProperty(from + '->' + to)) {
            self.transition = self.transitions[from + '->' + to];
        } else {
            self.transition = self.transitions['default'];
        }
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
    },
    TransitionOrder: function (Pages) {
      // Init Vars
      var Transitions = {};
      var LastPage = '';
      var NumPages = Pages.length;
      var PageIndex = 0;
      // Loop through array of named routes
      while (PageIndex < Pages.length) {
        var LastIndex = 0;
        while (LastIndex < PageIndex) {
          Transitions = CreateTransitions(Transitions, Pages[LastIndex], Pages[PageIndex]);
          LastIndex++;
        }
        PageIndex++;
      }
      // Set fallback transition
      Transitions['default'] = 'fade';
      // Then resume normal process
      Transitioner.setTransitions(Transitions);
    }
};
// update transitions once flow router triggers route change
Tracker.autorun(function () {
    Transitioner.updateRoutesTransitions();
});

Momentum.registerPlugin('flow-router', function (options) {
    check(options.options, Match.Optional(Function));

    var getPluginOptions = function () {
        // trigger transition update manually
        Transitioner.updateRoutesTransitions();
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
            return console.error("Can't find momentum plugin '" +
                pluginOptions
                .with +
                "'");
        }

        pluginOptions = _.extend(_.omit(options, 'options'),
            pluginOptions);
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
