var LiveNowCallback = { };
LiveNowCallback.display = function (channelName, data) {
	$("#livenow .feed").append('channel name: ' + channelName + ' : ' + data.message+'<br/>');
};

(function($) {

    $.fn.extend({ 

        livenow: function(channelName) {
     
            var element = this;
                  	
            createlivenow();   
			
            $(window).bind("resize", function() {
                resize();
				window.location = '#livenow';                 
            });
			
			// FIXME
			var host = new String(document.location).split('/')[2];
		
			// using custom events.
			var socket;
			//$("input.connect").click(function () {
				socket = new io.Socket(host, { port: 80 } );
				socket.connect();
				socket.on('connect', function(){ $(document).trigger("connected"); });
				socket.on('message', function(data){ $(document).trigger("message", data); });
				socket.on('disconnect', function(){ $(document).trigger("disconnected"); });
			//});
			
			$("input.disconnect").click(function () {
				socket.disconnect();
			});
			
			$(".comment button", element).click(function () { 
				socket.send(JSON.stringify(["push", "Default", { 'message' : $(".comment textarea", element).val(), 'important' : false, 'repost' : false } ]));
			});
			
			// connection/disconnection : custom events.
			$(document).bind("disconnected", function () {
				$("input.connect").show(); $("#panel").hide();
			});
			
			$(document).bind("connected", function () {
				//$("input.connect").hide(); $("#panel").show();
				
				/*
				// registering default channel
				socket.send(JSON.stringify(["register", "Default"]));
				// pulling default channel
				socket.send(JSON.stringify(["pull", "Default", 40]));
                */
                
				// registering default channel
				socket.send(JSON.stringify(["register", channelName]));
				// pulling default channel
				socket.send(JSON.stringify(["pull", channelName, 40]));

				// registering default channel
				socket.send(JSON.stringify(["register", channelName + "_Editor"]));
				// pulling default channel
				//socket.send(JSON.stringify(["pull", channelName + "_Editor", 40]));
				
			});
			
			$(document).bind("message", function (e, data) {
				data = JSON.parse(data);
				if (data.length > 0) {
					console.log(data);
					var f = data.shift();
					LiveNowCallback[f].apply(LiveNowCallback, data);
				}
			});
            
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
            
        }
        
    });
        

})(jQuery);


