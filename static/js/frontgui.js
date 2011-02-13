(function($) {
   $.fn.extend({
      startGUI : function () {
         var element = this;
         
         function createlivenow() {  
            $(element).addClass('livenow');
            $(element).html('<a name="livenow"></a>'
                        +'<div class="feed">Feed</div>'
                           +'<div class="comment"><textarea name="comment" /></textarea><button type="button">Send</button></div>');                
            resize();
         }

         function resize() {       
            $(element).css({
            "height" : ($(window).height() - 100) + 'px'                   
            });
                           
            $('.comment textarea', element).css({
            "width" : ($('.comment', element).width() - 10) + 'px'                  
            });
                           
            $('.feed', element).css({
            "height" : ($(window).height() - 250) + 'px'                   
            });
         }

         createlivenow();   
         $(window).bind("resize", function() {
            resize();
            window.location = '#livenow';                 
         });

         // Actions, buttons, ...
         $(".comment button", element).click(function () { 
            $(document).trigger("send",
               ["push",
               "#GSxSW_Editor",
               { 'message' : $(".comment textarea",
                  element).val(),
                  'important' : false,
                  'repost' : false } ]
                              )
         });
      }
   });
})(jQuery);