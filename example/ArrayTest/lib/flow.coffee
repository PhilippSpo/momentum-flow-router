# Quick Dev Route
FlowRouter.route '/',
  name: '1',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '1'
    }

FlowRouter.route '/2',
  name: '2',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '2'
    }

FlowRouter.route '/3',
  name: '3',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '3'
    }

FlowRouter.route '/4',
  name: '4',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '4'
    }