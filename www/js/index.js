/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		try
		{
 
			FCMPlugin.getToken(function(token){ 
				
					// FCM 토근 등록 
					$.ajax({	
							url: "http://teebox.co.kr/plugin/fcm/fcm_register_ajax.php?test=1&token="+token,
						    type: "get",
							success:function(data){
								//alert('본 버전은 테스트 푸쉬용입니다.');
							}
							
					});
					

					setTimeout(function(){
					// 홈페이지 호출 
					window.open = cordova.InAppBrowser.open;
					var ref = cordova.InAppBrowser.open('http://teebox.co.kr', '_blank', 'location=no,toolbar=no,zoom=no');
						
						/*
						ref.addEventListener( "loadstop", function() {
							//	ref.executeScript({ code: "alert( 'hello' );" });
							});

						*/

						/*
						ref.addEventListener('loadstop', function(data, err) {
							ref.executeScript( {	
							file: "http://teebox.co.kr/js/app.js"
							//	code: 'document.getElementById("btn_winclose").addEventListener("click", function(){ alert("clicked2");ref.close();});'
							}, function(){
							alert('script injected');
							ref.close();
							console.log('script injected');
							//ref.close();
							});
						});
						*/

						ref.addEventListener('exit', function(event){  Exit(); });
						},2000); 


					//var ref = window.open(encodeURI(url), '_blank','location=no');
					 ref.addEventListener('loadstart', function(event) {
						 if (event.url.match("mobile/close")) {
							 ref.close();
						 }
					 }); 

			/*
					   ref.addEventListener('loadstop', function(data, err) {
				  ref.executeScript( {
					code: 'document.getElementsByTagName("body")[0].addEventListener("click", function(){ alert("clicked");ref.close() });'
				  }, function(){
					console.log('script injected');
				  });
				});
			*/


			});

			
		
			FCMPlugin.onNotification(function(data){
			
				if(data.wasTapped){
				  //Notification was received on device tray and tapped by the user.
				  
				  //alert( JSON.stringify(data) );
					var push =  JSON.stringify(data);
					alert(push.body+".");
				}else{
				  //Notification was received in foreground. Maybe the user needs to be notified.
			
				  //alert( JSON.stringify(data) );
				  var push =  JSON.stringify(data);
					alert(push.body+"..");
				}
			});
			


			 // app.receivedEvent('deviceready');
			 
		 

		}
		catch (e)
		{
			//alert(e.toString());
		}
      
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		*/
    }
};


function Exit(){
			  navigator.notification.confirm(
				'골프매니저 앱을 종료하시겠습니까?',  
				function(i){
					if(i==1)
					{
							setTimeout(function(){
							// 홈페이지 호출 
							window.open = cordova.InAppBrowser.open;
							var ref = cordova.InAppBrowser.open('http://teebox.co.kr', '_blank', 'location=no,toolbar=no,zoom=no');


							ref.addEventListener('exit', function(event){  Exit(); });
							},1000); 

					}

					if(i==2)
					 {
					   navigator.app.exitApp(); //This will Close the App
					 }
				},              
				'골프매니저',            
				'아니오,예'          
			  );
 }