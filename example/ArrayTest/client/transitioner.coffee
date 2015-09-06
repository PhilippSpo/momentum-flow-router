# Moved these two functions to the included package
# # Creates the actual strings inside the object
# CreateTransitions = (Transitions, LastPage, Page) ->
#   console.log 'From: ' + LastPage + ' to ' + Page

#   # Create object for direction of motion
#   ForwardPageKey = LastPage + '->' + Page
#   Transitions[ForwardPageKey] = 'right-to-left'
#   # Then create the same concept in reverse
#   ReversePageKey = Page + '->' + LastPage
#   Transitions[ReversePageKey] = 'left-to-right'
#   Transitions

# # Creates an object matching the desired output
# TransitionOrder = (Pages) ->
#   # init vars
#   Transitions = {}
#   LastPage = ''
#   NumPages = Pages.length
#   PageIndex = 0

#   # Loop through string function and update Transitions object
#   while PageIndex < Pages.length
#     LastIndex = 0
#     while LastIndex < PageIndex
#       # unless LastIndex is -1
#       Transitions = CreateTransitions(Transitions, Pages[LastIndex], Pages[PageIndex])
#       LastIndex++
#     PageIndex++

#   # Set default value to fade
#   Transitions['default'] = 'fade'
#   console.log Transitions
#   # Return transitions to Transitioner.setTransitions
#   Transitions

# Desired Output:
# window.Transitions = {
#   '1->2': 'right-to-left'
#   '2->1': 'left-to-right'
#   'default': 'fade'
# }

# Order of pages from left to right
NamedRoutes = [ '0', '1', '2', '3', '4', '5', '6']
# Transitioner.setTransitions TransitionOrder NamedRoutes
Transitioner.TransitionOrder NamedRoutes

# Look at all the code this function generates and the time it saved:
# Transitioner.setTransitions {
#   "0->1": "right-to-left"
#   "0->2": "right-to-left"
#   "0->3": "right-to-left"
#   "0->4": "right-to-left"
#   "0->5": "right-to-left"
#   "0->6": "right-to-left"
#   "1->0": "left-to-right"
#   "1->2": "right-to-left"
#   "1->3": "right-to-left"
#   "1->4": "right-to-left"
#   "1->5": "right-to-left"
#   "1->6": "right-to-left"
#   "2->0": "left-to-right"
#   "2->1": "left-to-right"
#   "2->3": "right-to-left"
#   "2->4": "right-to-left"
#   "2->5": "right-to-left"
#   "2->6": "right-to-left"
#   "3->0": "left-to-right"
#   "3->1": "left-to-right"
#   "3->2": "left-to-right"
#   "3->4": "right-to-left"
#   "3->5": "right-to-left"
#   "3->6": "right-to-left"
#   "4->0": "left-to-right"
#   "4->1": "left-to-right"
#   "4->2": "left-to-right"
#   "4->3": "left-to-right"
#   "4->5": "right-to-left"
#   "4->6": "right-to-left"
#   "5->0": "left-to-right"
#   "5->1": "left-to-right"
#   "5->2": "left-to-right"
#   "5->3": "left-to-right"
#   "5->4": "left-to-right"
#   "5->6": "right-to-left"
#   "6->0": "left-to-right"
#   "6->1": "left-to-right"
#   "6->2": "left-to-right"
#   "6->3": "left-to-right"
#   "6->4": "left-to-right"
#   "6->5": "left-to-right"
#   "default": "fade"
# }