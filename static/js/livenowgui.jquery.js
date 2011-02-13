
// FIXME! Very 'un-jQuery' :-( Hackeh!
jQuery(document).ready(function() {  
    var $doc = jQuery(document);           
    $doc.bind("connected", function () {
       $doc.trigger("send", ["register", "#GSxSW"]);
       $doc.trigger("send", ["register", "#GSxSW_unedited"]);
       $doc.trigger("send", ["pull", "#GSxSW", 20]);           
       setTimeout('scrollToBottom()',5000);
    });
    
    $doc.bind("message", function (e, data) {  
        console.log("data.." + data);
       if (data[0] == "display") {
          var channelName = data[1], message = data[2].message;
    
            var msgClass = "message";
            var iconSrc = "images/anonUser.gif";
            
            var html = '<div class="' + msgClass + '">'
                      +'<img class="icon" src="' + iconSrc + '" alt="Icon" height="50" width="50" />'
                      +'<div class="messageText">' + message + '</div>'
                      +'</div>';
                  
            $(html).appendTo(".livenow .messages").hide().append('').fadeIn('slow');
            
            setTimeout('scrollToBottom()',1000);    
       }
    });   
});

// FIXME: Don't want global here :(
function scrollToBottom() {
    // FIXME: path to div should be generic
    $('.livenow .messages').animate({ scrollTop: $('.livenow .messages').attr("scrollHeight") }, 3000);                           
}  

function resize() {       
    $('.livenow .messages').css({
        "height" : ($(window).height() - 80) + 'px'                   
    });
}

    
(function($) {
   $.fn.extend({
      livenowgui : function () {
  
        var element = this;
           

        createlivenow();   
         function createlivenow() {  
            $(element).addClass('livenow');
            $(element).html('<a name="livenow"></a>'
                             +'<div class="messages"></div>'
                             +'<div class="comment"><textarea name="comment" /></textarea><button type="button">Send</button></div>');                
            resize();
         }

         $(window).bind("resize", function() {
            resize();
            window.location = '#livenow';                 
         });

         // Actions, buttons, ...
         $(".comment button", element).click(function () { 
            $(document).trigger("send",
               ["push",
               //"#GSxSW_unedited",
               "#GSxSW",
               { 'message' : $(".comment textarea",
                  element).val(),
                  'important' : false,
                  'repost' : false } ]
                              )
         });
      }
   });
})(jQuery);
