
(function($) {
   $.fn.extend({
      livenowgui : function () {
  
        var element = this;
           
        $doc.bind("connected", function () {
           $doc.trigger("send", ["register", "#GSxSW"]);
           $doc.trigger("send", ["register", "#GSxSW_Editor"]);
           $doc.trigger("send", ["pull", "#GSxSW", 20]);
           setTimeout('scrollToBottom()',5000);
        });

        $doc.bind("message", function (e, data) {
           if (data[0] == "display") {
              var channelName = data[1], message = data[2].message;

                var msgClass = "message";
                var iconSrc = "images/anonUser.gif";
                
                var html = '<div class="' + msgClass + '">'
                          +'<img class="icon" src="' + iconSrc + '" alt="Icon" height="50" width="50" />'
                          + message
                          +'</div>';
                      
                $(html).appendTo(".livenow .messages").hide().append('').fadeIn('slow');
                
                setTimeout('scrollToBottom()',1000);

           }
        });    
        
        createlivenow();   
         function createlivenow() {  
            $(element).addClass('livenow');
            $(element).html('<a name="livenow"></a>'
                             +'<div class="messages"></div>'
                             +'<div class="comment"><textarea name="comment" /></textarea><button type="button">Send</button></div>');                
            resize();
         }

         function resize() {       
            $(element).css({
                "height" : ($(window).height() - 100) + 'px'                   
            });
       
            $('.feed', element).css({
                "height" : ($(window).height() - 250) + 'px'                   
            });
         }

 
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
