(function($) {

    $.fn.extend({ 

        liveFeedEditor: function(feedName) {
     
            var element = this;
                  	
            createLiveFeed();   
			resize();
			
            $(window).bind("resize", function() {
                resize();
				window.location = '#livefeed';                 
            });
            
            function createLiveFeed() {            
				var title = "Lorem ipsum dolor sit amet";
				var byline = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt....";
				var description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
				
               	$(element).html('<a name="livefeed"></a>'
               				   +'<div class=""></div>'
                               +'');
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
                	"height" : ($(window).height() - 200) + 'px'                	
                });
                               
            }
            
        }
        
    });
        

})(jQuery);
