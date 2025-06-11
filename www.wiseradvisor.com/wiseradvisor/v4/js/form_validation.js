function validateForm(myform, i) {
	var error = "Provided zip code is invalid.";
	if ( myform.name == "form" + i )
	{
		var x = myform.g.value;
		if (x == "" || x.length != 5 || isNaN(x)) {
	    	$("#errorzip" + i).html(error);
	    	return false;
		} else {
			if(validateZip(x)) {
				dataLayer.push({
				'event' : 'ZipCode'
				});
				$('#zip' + i).tooltip('hide');
				return true;
			} else {
				/*$("#errorzip"+ i).html(error);
				$("#errorzip"+ i).hide();*/
				$( '#zip' + i ).css( "border", "1px solid #ee0000" );
				$( '#zip' + i ).tooltip({
            		trigger: 'manual',
            		title: error,
            		 template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            	}).on({
                	focus: function() {
                    	$(this).tooltip('hide');
                	}
        		});
        		/*blur: function() {
                    	$(this).tooltip('show');
                	},*/
                	$('#zip' + i).tooltip('show');
			}
		}
		return false;
	} 
	else if ( myform.name == "zip-ad" + i)
	{
		var x = myform.g.value;
		if (x == "" || x.length != 5 || isNaN(x)) {
	    	$("#errorzip-ad" + i).html(error);
	    	return false;
		} else {
			if(validateZip(x)) {
				dataLayer.push({
				'event' : 'ZipCode'
				});
				$('#ad-zip' + i).tooltip('hide');
				return true;
			} else {
				/*$("#errorzip-ad" + i).html('Provided zip code is invalid.');
				$("#errorzip-ad" + i).hide();*/
				$( '#ad-zip' + i ).css( "border", "1px solid #ee0000" );
				$( '#ad-zip' + i ).tooltip({
            		trigger: 'manual',
            		title: error,
            		template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            	}).on({
                	focus: function() {
                    	$(this).tooltip('hide');
                	}
        		});
        		
        		$('#ad-zip' + i).tooltip('show');
			}
		}
		return false;
	}
	else if ( myform.name == "talk-advisor" +i)
	{
		var x = myform.g.value;
		if (x == "" || x.length != 5 || isNaN(x)) {
	    	$("#talk-advisor" + i).html(error);
	    	return false;
		} else {
			if(validateZip(x)) {
				dataLayer.push({
				'event' : 'ZipCode'
				});
				$( '#talk-zip' + i ).tooltip('hide');
				return true;
			} else {
				//$("#talk-advisor" + i).html(error);
				$( '#talk-zip' + i ).css( "border", "1px solid #ee0000" );
				$( '#talk-zip' + i ).tooltip({
            		trigger: 'manual',
            		title: error,
            		template: '<div class="tooltip custom-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
            	}).on({
                	focus: function() {
                    	$(this).tooltip('hide');
                	}
        		});
        		$( '#talk-zip' + i ).tooltip('show');
			}
		}
		return false;
	}	
}

function validateZip(zip1) { 
	var valid = true;
	$.ajax({url: "https://www.wiseradvisor.com/wiseradvisor/directory/getcitystate.jsp?zip="+zip1, cache: false, async:false ,success: function(result){
			   if (result.trim() == 'true') {
				 valid = true;
			} else { 
				valid = false;
			}
	}});
	return valid;
}
		