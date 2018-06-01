var me = {};
me.avatar ="images/rsz_1ttl-logo.png"
//me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
 you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";
	


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            


function buttonclick(){
	var textvalue=document.getElementById("iptext").value;
	if(textvalue!=""){
	console.log(textvalue);
	insertChat("you", textvalue, 0); 
	document.getElementById("iptext").value='';
	makeCorsRequest(textvalue);
	}
}

function createCORSRequest(method, url) {
                var xhr = new XMLHttpRequest();
				
                if ("withCredentials" in xhr) {
                    // XHR for Chrome/Firefox/Opera/Safari.
                    xhr.open(method, url, true);
					xhr.setRequestHeader('authorization', 'Bearer 56c7b8cffe8c44f3a063d2d4abcbbde1');
                } else if (typeof XDomainRequest != "undefined") {
                    // XDomainRequest for IE.
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
					xhr.setRequestHeader('authorization', 'Bearer 56c7b8cffe8c44f3a063d2d4abcbbde1');
                } else {
                    // CORS not supported.
                    xhr = null;
                }
                return xhr;
            }


            // Make the actual CORS request.
            function makeCorsRequest(requestText) {
                // All HTML5 Rocks properties support CORS.
                var url = 'https://api.dialogflow.com/v1/query?v=20150910&lang=en&query='+requestText+'&sessionId=12345&timezone=Asia%2FCalcutta';

                var xhr = createCORSRequest('get', url);
                if (!xhr) {
                    alert('CORS not supported');
                    return;
                }

                // Response handlers.
                xhr.onload = function () {
                    var text = xhr.responseText;
                //    console.log(text);
					var json_parsed = JSON.parse(text);
				//	console.log(json_parsed);
				//	console.log(json_parsed.result.fulfillment.speech);
					var response_final_output=json_parsed.result.fulfillment.speech;
					console.log(response_final_output);
                    //alert('Response from CORS request to ' + url + ': ' );
					insertChat("me", response_final_output, 0); 
                };

                xhr.onerror = function () {
                    //alert('Woops, there was an error making the request.');
                };

                xhr.send();
            }
            



//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);
    
}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            mytext
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

//-- Clear Chat
resetChat();

//-- Print Messages
/* insertChat("me", "Hello Tom...", 0);  
insertChat("you", "Hi, Pablo", 1500);
insertChat("me", "What would you like to talk about today?", 3500);
insertChat("you", "Tell me a joke",7000);
insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
insertChat("you", "LOL", 12000); */


//-- NOTE: No use time on insertChat.