# momentum-flow-router

Transitions for [Flow Router](https://github.com/meteorhacks/flow-router) using  [Momentum](https://github.com/percolatestudio/meteor-momentum).

### Live Demo
Live Demo [here](http://flow-router-transitions.meteor.com/)  

Live Demo Code [here](https://github.com/PhilippSpo/flow-router-transitions-demo)

## Getting started:

### Setup routes (with names)
Make sure that every route that you want to perform a transition from or to needs to have a name. This is crucial for defining the transitions between routes later.
```javascript
FlowRouter.route('/main', {
	name: 'main',
	action: function () {
		FlowLayout.render('layout', {
			top: 'mainToolbar',
			main: 'main'
		});
	}
});
```
### Setup markup
In your flow-layout you wrap the momentum helper around your template region.
```html
{{#momentum plugin='flow-router'}}
  {{> Template region='main'}}
{{/momentum}}
```
In order to get clean transitions without a scrollbar showing up you should also wrap each of your templates inside a fixed div. The package comes with a predefined css-class `.frt-fixed-content-wrapper`, which basically is a fixed div with `top: 0; right: 0; left: 0; right: 0` that you need to adapt to fit your content. Normally it is enough to just adjust the `top` and `bottom` values, but sometimes you might also need to redefine the width of the fixed div, which can be a bit tricky. The trick here is to set the `left` and `right` to `0` and then adjust the `margin-left`/`margin-right` (without having a fixed width or width 100%).  
So this should get you started with a fixed div, which you can then adjust to your needs:
```html
<template name="contentWrapper">
  <div class="frt-fixed-content-wrapper">
    {{> UI.contentBlock}}
  </div>
</template>
```
And now you can wrap your templates inside the `contentWrapper` like so:
```html
<template name="main">
  {{#contentWrapper}}
    <div>
      <a href="/left" class="btn">left</a>
    </div>
    <div>
      <a href="/right" class="btn">right</a>
    </div>
  {{/contentWrapper}}
</template>
```
### Define transitions
Call the `Transitioner.setTransitions` method and give it your transition configuration. The pattern for the key is `fromRouteName->toRouteName` and the value is a momentum transition (see the [momentum](https://github.com/percolatestudio/meteor-momentum) package for more options for predefined transitions)
```javascript
Transitioner.setTransitions({
  'main->left': 'left-to-right',
  'left->main': 'right-to-left',

  'main->right': 'right-to-left',
  'right->main': 'left-to-right',

  'default': 'fade'
});
```
## License

MIT. (c) maintained by Philipp Sporrer (@philippspo).
## Credits

Percolate Studio, Tom Coleman (@tmeasday).
