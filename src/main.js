var show = function(){
  setTimeout(function(){
    $(".load-placeholder").fadeOut(1000);
  }, 1500)
}

$(document).ready(function(){
  var closeSection = function(){
    var item = $('a.active').attr('item');
    removeAllActiveLinks();
    openSection(item);
    closeOpenSection(item);
    removeActiveSection();
  }

  var removeAllActiveLinks = function (){
    $('a[class^="display-"]').removeClass('active');
  }

  var removeActiveSection = function (){
    $('section.active').removeClass('active');
  }

  var openSection = function(item){
    $('.' + item + '-box').show("slide", { direction: "up" }, 300);
  }

  var toggleActiveSection = function (item, el){
    var activeSection = $('section.active');
    if (activeSection.length > 0) {
      $(activeSection).hide("slide", { direction: "right" }, 300, function(){
        openSection(item);
      });
    } else {
      openSection(item);
    }
  }

  var loadPosts =  function() {
    $(".blog-preview").hide();
    $(".blog-preview").each(function(index) {
      $(this).delay(100*index).fadeIn(300);
    });
  }

  var setFirstInputFocus = function(){
    setTimeout(function(){
      $('section.active input').first().focus();
    }, 0);
  }

  var hideMobileMenu = function(){
    $('.xs-menu').hide("slide", { direction: "left" }, 300);
    $('.menu-button-container').removeClass('active');
    $('.menu-button-container').find('i').attr('class', 'fa fa-bars');
  }

  var showMobileMenu = function(){
    $('.xs-menu').show("slide", { direction: "up" }, 300);
    $('.menu-button-container').addClass('active');
    $('.menu-button-container').find('i').attr('class', 'fa fa-close');
  }

  var closeOpenSection = function(item){
    $('.' + item + '-box').hide("slide", { direction: "right" }, 300);
  };

  var toggleMenuHeading = function(page){
    if (page === "archive") {
      $('.featured-toggle').hide();
      $('.archive-header').show();
    } else {
      $('.archive-header').hide();
      $('.featured-toggle').show();
    }
  }

  var month = "";
  var year = "";

  // menu bar interaction
  $('a[class^="display-"]').on("click", function(){
    var item = $(this).attr('item');
    if ($(this).hasClass('active')){
      // close the section
      closeOpenSection(item);
      //remove active class
      $(this).removeClass('active');
      //set first input focus
      setFirstInputFocus();
      // body overflow visible
      $('html, body, wrapper').css("overflow", "visible");
    } else {
      // open the section
      removeAllActiveLinks();
      //if another section is open, hide it and show the newly active one
      toggleActiveSection(item, $(this));
      // remove active class from all sections
      removeActiveSection();
      // add active class to new section and link
      $(this).addClass('active');
      $('.' + item + '-box').addClass('active');
      //set first input focus
      setFirstInputFocus();
      // hide menu for mobile device
      hideMobileMenu();
      // body overflow hidden
      $('html, body, wrapper').css("overflow", "hidden");
    }
  });

  $('.years a').click(function(){
    // set year to client selection
    year = $(this).attr('year');
    // flip card to view months
    $('.panel').addClass('flip');
  });

  $('.months a').click(function(){
    // set month to client selection
    month = $(this).attr('month');
    // remove active links
    removeAllActiveLinks();
    //hide archive section
    $('.archive-box').hide("slide", { direction: "right" }, 300, function(){
      // reset card to year
      $('.panel').removeClass('flip');
    });
    // remove current active section
    removeActiveSection();
    // display year and month
    $('.bread-crumb').html(year + " / " + month);
    toggleMenuHeading('archive');
    // reload posts
    loadPosts();
    $('html, body, wrapper').css("overflow", "visible");
  });

  $('.featured div').click(function(){
    $('.featured div').removeClass("active");
    $(this).addClass("active");
    loadPosts();
  });

  $('.close-section, div[class$="-icon"]').on("click", function(){
    closeSection();
    $('html, body, wrapper').css("overflow", "visible");
  });

  $('input').keyup(function(event){
    if(event.keyCode == 13){
        closeSection();
    }
  });

  $('.menu-button-container').on("click", function(){
    // check to see if open section
    if ($('section.active').length == 0) {
      // hide or show menu accordingly
      if ($(this).hasClass('active')){
        hideMobileMenu();
      } else {
        showMobileMenu();
      }
    }
  });

  $('.logo').on("click", function(){
    toggleMenuHeading('home')
    loadPosts();
  });

  $('.return-top').click(function(){
    $("html, body, wrapper").animate({ scrollTop: 0 }, 500);
  });

  loadPosts();
  $('footer').show();
});

$(window).load(function() {
  // show body
  show();
});

setTimeout(show, 3000);
