@TransitionOrder = (Pages) ->
  # init vars
  Transitions = {}
  LastPage = ''
  # Loop through array of named flow routes
  _.each Pages, (Page) ->
    if LastPage != ''
      # console.log Page

      # Create object for one direction of motion
      ForwardPageKey = LastPage + '->' + Page
      Transitions[ForwardPageKey] = 'right-to-left'
      # Then create the same concept in reverse
      ReversePageKey = Page + '->' + LastPage
      Transitions[ReversePageKey] = 'left-to-right'

    # Store last page, to compare against
    LastPage = Page
    # console.log LastPage

  # Set default value to fade
  Transitions['default'] = 'fade'
  # console.log Transitions

  # Return transitions to Transitioner.setTransitions
  Transitions

# Old demo of variable
# window.Transitions = {
#   'AdminCompilation->ManageMechanicNotes_Form': 'right-to-left'
#   'ManageMechanicNotes_Form->AdminCompilation': 'left-to-right'
#   'default': 'fade'
# }

# Order from left to right and the above function will spit out necessary object
Transitioner.setTransitions TransitionOrder [
  '1'
  '2'
  '3'
  '4'
]