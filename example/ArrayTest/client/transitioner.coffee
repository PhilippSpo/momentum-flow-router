# Creates the actual strings inside the object
CreateTransitions = (Transitions, LastPage, Page) ->
  console.log 'From: ' + LastPage + ' to ' + Page

  # Create object for direction of motion
  ForwardPageKey = LastPage + '->' + Page
  Transitions[ForwardPageKey] = 'right-to-left'
  # Then create the same concept in reverse
  ReversePageKey = Page + '->' + LastPage
  Transitions[ReversePageKey] = 'left-to-right'
  Transitions

# Creates an object matching the desired output
TransitionOrder = (Pages) ->
  # init vars
  Transitions = {}
  LastPage = ''
  NumPages = Pages.length
  PageIndex = 0

  # Loop through string function and update Transitions object
  while PageIndex < Pages.length
    LastIndex = 0
    while LastIndex < PageIndex
      # unless LastIndex is -1
      Transitions = CreateTransitions(Transitions, Pages[LastIndex], Pages[PageIndex])
      LastIndex++
    PageIndex++

  # Set default value to fade
  Transitions['default'] = 'fade'
  console.log Transitions
  # Return transitions to Transitioner.setTransitions
  Transitions

# Desired Output:
# window.Transitions = {
#   '1->2': 'right-to-left'
#   '2->1': 'left-to-right'
#   'default': 'fade'
# }

# Order of pages from left to right
Transitioner.setTransitions TransitionOrder [ '1', '2', '3', '4']