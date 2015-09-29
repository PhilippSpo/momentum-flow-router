# Well I hoped this would work, but not sure why it doesn't?
# # Create routes
# # Note on converting to strings: http://stackoverflow.com/questions/19983666/how-to-convert-a-number-to-string-in-coffeescript
# NamedRoutes = [ '0', '1', '2', '3', '4', '5', '6']
# sel = 3
# while sel <= 6
#   if sel is 0
#     path = '/'
#   else
#     path = '/' + sel
#   FlowRouter.route path,
#     name: NamedRoutes[sel],
#     action: ->
#       BlazeLayout.render 'Universal_Layout', {
#         body: NamedRoutes[sel]
#       }
#   sel++

# Actual Routes
FlowRouter.route '/',
  name: '0',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '0'
    }

FlowRouter.route '/1',
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

FlowRouter.route '/5',
  name: '5',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '5'
    }

FlowRouter.route '/6',
  name: '6',
  action: ->
    BlazeLayout.render 'Universal_Layout', {
      body: '6'
    }