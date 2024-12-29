// JavaScript for Code Folding
$(document).ready(function () {
    // Initialize code folding behavior based on user preference or default state
    initializeCodeFolding();
  
    // Add the button to show/hide code blocks
    $('.code-folding-btn').click(function () {
      var codeBlock = $(this).closest('.code-block');
      codeBlock.toggleClass('folded');
    });
  
    // Define a function to initialize code folding
    function initializeCodeFolding() {
      $('.sourceCode').each(function () {
        if ($(this).hasClass('folded')) {
          $(this).hide();  // Fold the code block initially
        } else {
          $(this).show();  // Unfold the code block initially
        }
      });
    }
  });
  
  // JavaScript for Table of Contents (TOC) functionality
  $(document).ready(function () {
    // Smooth scrolling for TOC links
    $('.tocify li a').click(function (event) {
      event.preventDefault();
      var targetId = $(this).attr('href');
      var targetElement = $(targetId);
  
      if (targetElement.length) {
        window.scrollTo({
          top: targetElement.offset().top - 100, // Adjust top offset for header
          behavior: "smooth"
        });
      }
    });
  
    // Optional: If you want to add active class to the currently viewed section in the TOC
    $(window).on('scroll', function () {
      var scrollPos = $(document).scrollTop();
      $('.tocify li').each(function () {
        var section = $(this).find('a').attr('href');
        var sectionOffset = $(section).offset().top;
  
        if (sectionOffset <= scrollPos && sectionOffset + $(section).height() > scrollPos) {
          $('.tocify li').removeClass('active');
          $(this).addClass('active');
        }
      });
    });
});

// TOC padding

$(document).ready(function() {
    $items = $('div#TOC li');
    $items.each(function(idx) {
        num_ul = $(this).parentsUntil('#TOC').length;
        $(this).css({'text-indent': num_ul * 10, 'padding-left': 0});
    });
});