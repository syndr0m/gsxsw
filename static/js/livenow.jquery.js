(function($) {
   var socket;

   $.fn.extend({ 
      livenow: function(channelName) {
         // FIXME
         var host = new String(document.location).split('/')[2];
      
         // using custom events.
         socket = new io.Socket(host, { port: 80 } );
         socket.connect();
         // INPUTS
         socket.on('connect', function(){ $(document).trigger("connected"); });
         socket.on('message', function(data){
            console.log('recieved: '+data);
            $(document).trigger("message", [JSON.parse(data)]);
         });
         socket.on('disconnect', function(){ $(document).trigger("disconnected"); });

         // OUTPUTS
         $(document).bind("send", function (e) {
            var data = [];
            for (var i = 0; i < arguments.length; ++i)
               if (i > 0) { data.push(arguments[i]); }
            console.log('send: '+JSON.stringify(data));
            socket.send(JSON.stringify(data));
         });
      },
   });
})(jQuery);
