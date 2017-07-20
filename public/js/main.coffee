
  ###
  # =============================================================================
  #   Navbar scroll animation
  # =============================================================================
  ###
  $(".page-header-fixed .navbar.scroll-hide").mouseover ->
    $(".page-header-fixed .navbar.scroll-hide").removeClass "closed"
    setTimeout (->
      $(".page-header-fixed .navbar.scroll-hide").css overflow: "visible"
    ), 150

  $ ->
    lastScrollTop = 0
    delta = 50
    $(window).scroll (event) ->
      st = $(this).scrollTop()
      return  if Math.abs(lastScrollTop - st) <= delta
      if st > lastScrollTop
        # downscroll code
        $('.page-header-fixed .navbar.scroll-hide').addClass "closed"
      else
        # upscroll code
        $('.page-header-fixed .navbar.scroll-hide').removeClass "closed"
      lastScrollTop = st


  ###
  # =============================================================================
  #   Mobile Nav
  # =============================================================================
  ###
  $('.navbar-toggle').click ->
    $('body, html').toggleClass "nav-open"


  ###
  # =============================================================================
  #   Style Selector
  # =============================================================================
  ###
  $(".style-selector select").each ->
    $(this).find("option:first").attr "selected", "selected"

  $(".style-toggle").bind "click", ->
    if $(this).hasClass("open")
      $(this).removeClass("open").addClass "closed"
      $(".style-selector").animate({"right": "-240px"}, 250)
    else
      $(this).removeClass("closed").addClass "open"
      $(".style-selector").show().animate({"right": 0}, 250)

  $(".style-selector select[name='layout']").change ->
    if $(".style-selector select[name='layout'] option:selected").val() is "boxed"
      $("body").addClass "layout-boxed"
      $(window).resize()
    else
      $("body").removeClass "layout-boxed"
      $(window).resize()

  $(".style-selector select[name='nav']").change ->
    if $(".style-selector select[name='nav'] option:selected").val() is "top"
      $("body").removeClass "sidebar-nav"
      $(window).resize()
    else
      $("body").addClass "sidebar-nav"
      $(window).resize()

  $(".color-options a").bind "click", ->
    $(".color-options a").removeClass "active"
    $(this).addClass "active"

  $(".pattern-options a").bind "click", ->
    classes = $("body").attr("class").split(" ").filter((item) ->
      (if item.indexOf("bg-") is -1 then item else "")
    )
    $("body").attr "class", classes.join(" ")
    $(".pattern-options a").removeClass "active"
    $(this).addClass "active"
    $("body").addClass $(this).attr("id")


  ###
  # =============================================================================
  #   Form wizard
  # =============================================================================
  ###
  $("#wizard").bootstrapWizard
    nextSelector: ".btn-next"
    previousSelector: ".btn-previous"
    onNext: (tab, navigation, index) ->
      if index is 1

        # Make sure we entered the name
        unless $("#name").val()
          $("#name").focus()
          $("#name").addClass("has-error");
          return false
      $total = navigation.find("li").length
      $current = index + 1
      $percent = ($current / $total) * 100
      $("#wizard").find(".progress-bar").css "width", $percent + "%"


    onPrevious: (tab, navigation, index) ->
      $total = navigation.find("li").length
      $current = index + 1
      $percent = ($current / $total) * 100
      $("#wizard").find(".progress-bar").css "width", $percent + "%"

    onTabShow: (tab, navigation, index) ->
      $total = navigation.find("li").length
      $current = index + 1
      $percent = ($current / $total) * 100
      $("#wizard").find(".progress-bar").css "width", $percent + "%"


  ###
  # =============================================================================
  #   Bootstrap Tabs
  # =============================================================================
  ###
  $("#myTab a:last").tab "show"


  ###
  # =============================================================================
  #   Bootstrap Popover
  # =============================================================================
  ###
  $(".popover-trigger").popover()


  ###
  # =============================================================================
  #   Bootstrap Tooltip
  # =============================================================================
  ###
  $(".tooltip-trigger").tooltip()



  ###
  # =============================================================================
  #   Login/signup animation
  # =============================================================================
  ###
  #$(window).load ->
  #  $(".login-container").addClass "active"

  ###
  # =============================================================================
  #   Timeline animation
  # =============================================================================
  ###
  timelineAnimate = (elem) ->
    $(".timeline.animated li").each (i) ->
      bottom_of_object = $(this).position().top + $(this).outerHeight()
      bottom_of_window = $(window).scrollTop() + $(window).height()
      if bottom_of_window > bottom_of_object
        $(this).addClass "active"

  timelineAnimate()

  $(window).scroll ->
    timelineAnimate()
