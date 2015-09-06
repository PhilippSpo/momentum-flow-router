/* global Momentum: true */
/* global Transitioner: true */

function CreateTransitions(Transitions, LastPage, Page) {
  var ForwardPageKey, ReversePageKey;
  console.log('From: ' + LastPage + ' to ' + Page);
  ForwardPageKey = LastPage + '->' + Page;
  Transitions[ForwardPageKey] = 'right-to-left';
  ReversePageKey = Page + '->' + LastPage;
  Transitions[ReversePageKey] = 'left-to-right';
  return Transitions;
};

// function TransitionOrder(Pages) {
//   console.log('Running TransitionOrder from Package');
//   var LastIndex, LastPage, NumPages, PageIndex, Transitions;
//   Transitions = {};
//   LastPage = '';
//   NumPages = Pages.length;
//   PageIndex = 0;
//   while (PageIndex < Pages.length) {
//     LastIndex = 0;
//     while (LastIndex < PageIndex) {
//       Transitions = CreateTransitions(Transitions, Pages[LastIndex], Pages[PageIndex]);
//       LastIndex++;
//     }
//     PageIndex++;
//   }
//   Transitions['default'] = 'fade';
//   console.log(Transitions);
//   return Transitions;
// };

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
      console.log('Running TransitionOrder from Package');
      var LastIndex, LastPage, NumPages, PageIndex, Transitions;
      Transitions = {};
      LastPage = '';
      NumPages = Pages.length;
      PageIndex = 0;
      while (PageIndex < Pages.length) {
        LastIndex = 0;
        while (LastIndex < PageIndex) {
          Transitions = CreateTransitions(Transitions, Pages[LastIndex], Pages[PageIndex]);
          LastIndex++;
        }
        PageIndex++;
      }
      Transitions['default'] = 'fade';
      console.log(Transitions);
      // return Transitions;
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
