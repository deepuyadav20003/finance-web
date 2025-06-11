var zip1 = $("#geoid").val();
var count = 0;
var services = [];
var liCount = $("#progressbar li").length;
var finalForm = false;
var emailValidated = false;
var pattern = /[^\.\s\w_-]+/;
var showAlertOneTime = true;
var showPopupOnlyOneTime = true;
var showPopupOneTime = true;

const PHONE_API_CONFIG = {
	PHONE_API_URL: '/rest/phoneverify',
	ENDPOINTS: {
		MATCH: '/phoneverify'
	}
};

setTimeout(() => {
	document.addEventListener('mouseout', mouseEvent);
}, 10_000);

const mouseEvent = e => {
	const src = document.getElementById("src").value;
	const shouldShowExitIntent =
		!e.toElement &&
		!e.relatedTarget &&
		e.clientY < 10;
	if (shouldShowExitIntent) {
		var path = document.getElementById("path").value;
		//document.removeEventListener('mouseout', mouseEvent);
		if (path === 'wa' || path === 'fa') {
			// Get the ID of the newly visible fieldset
			var visibleFieldsetId = $('.current').attr('id');
			// Log or use the ID
			if (visibleFieldsetId === 'field16') {
				document.getElementById('ouibounce-modal2').style.display = 'block';
				document.removeEventListener('mouseout', mouseEvent);
			} else {
				if (showPopupOnlyOneTime && visibleFieldsetId !== 'field14') {
					document.getElementById('ouibounce-modal').style.display = 'block';
					showPopupOnlyOneTime = false;
				} else if (showPopupOneTime && visibleFieldsetId == 'field14' && src === '200240239') {
					document.getElementById('ouibounce-modal_new').style.display = 'block';
					showPopupOneTime = false;
				}
			}
		}
	}
};

$("#progressbar li").width(((100 / liCount) - 0.8) + '%');
$('.previous').click(function() {
	count--;
	var currentStep = $('fieldset:visible');
	const src = document.getElementById("src").value;
	// Switch logic based on the current step
	switch (currentStep.attr('id')) {
		case 'field13':
			// Validation for first step
			if (!(src === '200240000' || src === '20024016')) {
				if (src != '200240195') {
					hideButtons();
					skipHaveAdvisorReasonOnPreviousClick();
				} else {
					skipservice();
				}
			} else {
				changeMsg(5);
			}
			break;
		case 'field10':
			// Validation for first step
			if (src === '200240000' || src === '20024016') {
				skipHaveAdvisorReasonOnPreviousClick();
			}
			break;
		case 'field2':
			if (src === '200240195') {
				skipHaveAdvisorReasonOnPreviousClick();
				hideButtons();
			}
			break;
		case 'field11':
			$('#service-heading').show();
			break;
		default:
			console.log('Unknown step');
	}
	$('.current').removeClass('current').hide().prev().show().addClass('current');
	$('#progressbar li.active').removeClass('active').prev().addClass('active');
	scrollToTop();
	if (count == 0) {
		$(".one-time-heading").show();
		showButtons(false, true);
	}
});


$('.multi-field-wrapper').each(function() {
	var $wrapper = $('.multi-fields', this);
	$(".add-field", $(this)).click(function(e) {
		$('.multi-field:first-child', $wrapper).clone(true).appendTo($wrapper).find('input').val('').focus();
	});
	$('.multi-field .remove-field', $wrapper).click(function() {
		if ($('.multi-field', $wrapper).length > 1)
			$(this).parent('.multi-field').remove();
	});
});

function nextStep() {
	count++;
	$('.current').removeClass('current').hide().next().show().addClass('current');
	$('#progressbar li.active').next().addClass('active');
	scrollToTop();
}

function isNumberKeyForMultiRevised(evt, zip) {
	var x = zip.value;
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	else {
		if (x.length >= 4) {
			$('#zip').css("border", "2px solid #d4d4d4");
		} else {
			$('#zip').css("border", "2px solid #EE0000");
		}
		return true;
	}
}

function multistepvalidateForm() {
	zip1 = document.getElementById("zip").value;
	const src = document.getElementById("src").value;
	if (zip1 == null || zip1 == '' || zip1.length <= 4) {
		$('#zip').focus();
		$('#zip').css("border", "2px solid #ee0000");
		$("#errorzip").html('Please provide a valid zip code.');
		return false;
	} else if (!(zip1 == null || zip1 == '' || zip1.length <= 4)) {
		$.ajax({
			url: "https://www.wiseradvisor.com/wiseradvisor/directory/getcitystate.jsp?zip=" + zip1, cache: false, async: false, success: function(result) {
				$("#loading").hide();
				if (result.trim() == 'false') {
					$("#errorzip").html('Provided zip code is invalid.');
				} else {
					$("#errorzip").html('');
					nextStep();
					clickEvent("zip provided", zip1);
					if (!(src === '200240000' || src === '20024016')) {
						changeMsg("5");
					}
					hideButtons();
					/*showButtons(true, false);*/
				}
			}
		});
	}
}

function clickEvent(eventName, value) {
	if (count == 1) {
		$(".one-time-heading").hide();
	}
	var kwd = document.getElementById("kwd").value;
	var cta = document.getElementById("cta").value;
	if (window.ga && ga.loaded) {
		ga('create', 'UA-2647866-4', 'auto')
		ga('send', 'event', 'MSF-' + count, kwd, 'Form', count)
	}
	dataLayer.push({
		'event': eventName,
		'gtm': {
			'selection': value
		}
	});
}

function changeMsg(msgId) {
	$('.targetDiv').hide();
	$('#msg' + msgId).show();
}

function f1(val, id) {
	if (services.length == 0) {
		$('#' + id).addClass("icon-active");
		services.push(val);
	} else {
		var filtered = services.filter(function(value, index, services) {
			return value === val;
		});
		if (filtered.length > 0) {
			$('#' + id).removeClass("icon-active");
			services = services.filter(function(ele) {
				return ele != val;
			});
		} else {
			$('#' + id).addClass("icon-active");
			services.push(val);
		}
	}
}

var advisorOtherService="";
function fNext1() {
   		var src = document.getElementById("src").value;
		if(src == '200240195') {
					$('#service-heading').hide();
		}
		services = [];
		$('input[name="Q200503"]:checked').each(function() {
			   services.push(this.value);
			});
   		if(services.length >0 ) {
   			$("#services_error").html("");
   			var filtered = services.filter(function(value, index, services){ 
   	   	        return value === '70677';
   	   	    });
   	   		if(filtered.length > 0 ) {
   	   			//console.log("SHOW OTHER");
   	   		} else {
   	   			changeMsg(7);
   	   			nextStep();
   	   		}
   	   		nextStep();
   	   		var advisorServiceValue = "";
	   	   for( var i = 0; i < services.length; i++){
	   		   switch(services[i]) {
	   			   case '19400' :  advisorServiceValue = advisorServiceValue + "Portfolio Management, ";
	   			   break;
	   			   case '70675' :  advisorServiceValue = advisorServiceValue + "Retirement Planning, ";
	   			   break;
	   			   case '70676' :  advisorServiceValue = advisorServiceValue + "Estate Planning, ";
	   			   break;
	   			   case '76773' :  advisorServiceValue = advisorServiceValue + "Education Planning,";
	   			   break;
	   			   case '76774' :  advisorServiceValue = advisorServiceValue + "401K Rollover, ";
	   			   break;
	   			   case '70677' : { advisorOtherService = document.getElementById("other_services").value;
	   				   				advisorServiceValue = advisorServiceValue + "Other, ";
	   			   					break;
	   			   }
	   			}   
	   	   }
   			clickEvent("advisorservice",advisorServiceValue);
   		} else {
   			$("#services_error").html("You have not indicated the service that you may require. Without this information we will be unable to match you with the best advisors for your needs.");
   		}
   	}
   	
   	function otherService() {
		var advsiorOtherService = document.getElementById("other_services").value;
		var count =  getWordsCount(advsiorOtherService.trim())
		if(count <= 0){
			$("#other_services_error").html("You have not indicated the service that you may require. Without this information we will be unable to match you with the best advisors for your needs");
		} else {
			if(count > 50) {
				$("#other_services_error").html("Maximum 50 words are allowed.");
			} else {
				changeMsg(7);
				$("#other_services_error").html("&nbsp;");
				nextStep();
			}
		}
   	}
	
	function skipservice() {
	    	var src = document.getElementById("src").value;
	    	if(src == '200240195') {
		    	changeMsg(8);
		 		var filtered = services.filter(function(value, index, services){ 
		    	     return value === '70677';
		    	});
		    	if(filtered.length > 0 ) {
		    	} else {
		    		$('#service-heading').show();
		    		count--;
		    	    $('.current').removeClass('current').hide().prev().show().addClass('current');
		    	    $('#progressbar li.active').removeClass('active').prev().addClass('active');
		    	}
	    	} else {
	    		changeMsg(5);
	    	}
	    }
	

function f2(val, id, value) {
	changeMsg(2);
	$('.field3 ').find("*").removeClass("icon-active");
	$('#houseHoldincomeHidenfld').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	clickEvent("HouseHoldIncome", value);
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth' // Smooth scrolling
	});
}

function skipHaveAdvisorReasonOnPreviousClick() {
	var src = document.getElementById("src").value;
	if (src === '200240195') {
		$('#service-heading').hide();
	}
	changeMsg(1);
	var value = $('#haveAdvisorhidenfield').val();
	if (value == '78403') {
		count--;
		$('.current').removeClass('current').hide().prev().show().addClass('current');
		$('#progressbar li.active').removeClass('active').prev().addClass('active');
	}
}

function f3(val, id, value) {
	changeMsg(1);
	$('.field4').find("*").removeClass("icon-active");
	$('#sizehiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	clickEvent("PortfolioClick", value);
}
function f4(val, id, value) {
	changeMsg(1);
	$('.field5').find("*").removeClass("icon-active");
	$('#ownHomeHiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	clickEvent("OwnhomeClick", value);
}
function f5(val, id, value) {
	changeMsg(1);
	$('.field6').find("*").removeClass("icon-active");
	$('#ownbuisnesshiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	clickEvent("BusinessClick", value);
}
function f6(val, id, value) {
	changeMsg(1);
	$('.field7').find("*").removeClass("icon-active");
	$('#retireHiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	clickEvent("RetirementClick", value);
}
function f7(val, id, value) {
	if (id == 'field8_id1') {
		changeMsg(1);
		$('.field8').find("*").removeClass("icon-active");
		$('#haveAdvisorhidenfield').val(val);
		$('#' + id).addClass("icon-active");
		nextStep();
	} else {
		var src = document.getElementById("src").value;
		if (!(src === '200240000' || src === '20024016')) {
			if (src === '200240195') {
				changeMsg(8);
				$('#service-heading').show();
			} else {
				changeMsg(7);
			}
		} else {
			changeMsg(5);
		}
		$('.field8').find("*").removeClass("icon-active");
		$('#haveAdvisorhidenfield').val(val);
		$('#' + id).addClass("icon-active");
		nextStep();
		nextStep();
		if (!(src === '200240000' || src === '20024016')) {
			showButtons(true, true);
		}
	}
	clickEvent("HaveAdvisorClick", value);
}
function f8(val, id, value) {
	var src = document.getElementById("src").value;
	if (!(src === '200240000' || src === '20024016')) {
		changeMsg(1);
	} else {
		changeMsg(7);
	}
	$('.field10').find("*").removeClass("icon-active");
	$('#promoxityhiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	if (src === '200240000' || src === '20024016') {
		//added above condition due to additional step in WA SEO
		showButtons(true, true);
	}
	clickEvent("CommutingDistanceClick", value);
}

function f9(val, id, value) {
	var src = document.getElementById("src").value;
	$('.field9').find("*").removeClass("icon-active");
	$('#whyLookinghiddenfield').val(val);
	$('#' + id).addClass("icon-active");
	nextStep();
	if (!(src === '200240000' || src === '20024016')) {
		//added above condition due to additional step in WA SEO
		showButtons(true, true);
		if(src === '200240195'){
			$('#service-heading').show();
			changeMsg(8);
		} else  {
			changeMsg(7);
		}
	} else {
		changeMsg(5);
	}
	clickEvent("NewAdvisorClick", value);
}
function validateEmail() {
	document.getElementById("emailBtn").disabled = true;
	var email = document.getElementById("email").value;
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var validate = true;
	if (email == "") {
		$("#rsp_email").html('Email address is a required field.');
		document.getElementById("emailBtn").disabled = false;
		validate = false;
	} else {
		if (filter.test(email)) {
			$.ajax({
				type: "GET",
				url: "https://www.wiseradvisor.com/rest/email?email=" + email,
				async: false,
				success: function(data) {
					$("#rsp_email").html('');
					nextStep();
					clickEvent("EmailVerifyClick", email);
					clickEvent("PageVisited", "T&C_View");
					document.getElementById("emailBtn").disabled = false;
					validate = true;
					emailValidated = true;
				},
				error: function(data) {
					$("#rsp_email").html('Provided email address is invalid.');
					document.getElementById("emailBtn").disabled = false;
					validate = false;
				}
			});
		} else {
			$("#rsp_email").html('Provided email address is invalid.');
			document.getElementById("emailBtn").disabled = false;
			validate = false;
		}
	}
	// AJAX call - to post amplitude event
	eventAttribute = getAmplitudeJson(validate);
	$.ajax({

	    url: "/rest/amplitude/event",
	    type: "POST",
	    contentType: "application/json",
	    data: JSON.stringify(eventAttribute),
	    success: function(response) {
	        console.log("Amplitude Event sent: " + response);
	    },
	    error: function(xhr, status, error) {
	    	console.log("Amplitude Event Failed: " + error);
	    }
	});	
	return validate;
}

function getAmplitudeJson(validEmail) {
		let data = {
						source_id: document.getElementById("src").value,
						req_request_id: "Not Available",
						source_kwd: document.getElementById("kwd").value,
						req_portfolio_size: getPortfolioSizeText(),
						req_zip_code: document.getElementById("geoid").value,
						req_city: "Not Available",
						req_state: "Not Available",
						req_proximity: document.getElementById("promoxityhiddenfield").value,
						source_name: document.getElementById("src").value,
						app_name: "wa-frontend",
						req_household_income: getHouseholdIncomeText(),
						req_has_advisor: (document.getElementById("haveAdvisorhidenfield").value == "78402" ? true : false),
						req_why_looking: getAdvisorReasonText(),
						req_retire: document.getElementById("retireHiddenfield").value,
						email: document.getElementById("email").value,
						requestEmpty: false,
					  	eventType: (validEmail ? "lead__email_verify_success" : "lead__email_verify_failure"),
					  	userID: "Anonymous User"
					};
			console.log("amplitude attributes json : ", data);  
			return data;
}


function getPortfolioSizeText() {
	   var sizeCode = document.getElementById("sizehiddenfield").value;
	   switch(sizeCode){
		   	case '76473' :  portfolioSize= 'Less than $50,000';
		   		break;
		   	case '27721' :  portfolioSize= '$50,000 - $100,000';
				break;
		   	case '27722' :  portfolioSize= '$100,000 - $250,000';
				break;
		   	case '27723' :  portfolioSize= '$250,000 - $500,000';
				break;
		   	case '27724' :  portfolioSize= '$500,000 - $1 million';
				break;
		   	case '36716' :  portfolioSize= '$1 million - $3 million';
				break;
		   	case '36717' :  portfolioSize= 'More Than $3 million';
				break;
	   }
	   return portfolioSize;
}


function getAdvisorReasonText(){
	var advisorCode = document.getElementById("haveAdvisorhidenfield").value;
   	if(advisorCode == '78402') {
		   advisorreason = document.getElementById("whyLookinghiddenfield").value;
		   switch(advisorreason){
			   case '78404' : advisorreasonValue =  "Looking for Second Opinion";
			     		break;
			   case '78405' : advisorreasonValue =  "Unhappy with Current Advisor";
			   	   		break;
			   case '78406' : advisorreasonValue =  "New Advisor For Other Reason";
			   	   		break;
			   default : advisorreasonValue =  "NA";
		   }
	} else {
		advisorreasonValue =  "NA";
	}
   	return advisorreasonValue;
}	


function getHouseholdIncomeText() {
    var houseValue = document.getElementById("houseHoldincomeHidenfld").value;
    switch(houseValue){
	    case '121112' :  householdincomecomment= 'Less than $40,000';
	    	break;
	    case '121113' :  householdincomecomment= '$40,000 - $74,999';
	    	break;
	    case '121114' :  householdincomecomment= '$75,000 - $99,999';
	    	break;
	    case '121115' :  householdincomecomment= '$100,000 - $149,999';
	    	break;
	    case '121116' :  householdincomecomment= '$150,000 - $249,999';
	    	break;
	    case '121117' :  householdincomecomment= 'More Than $250,000';
	    	break;
    }

    return householdincomecomment;
}

var linetype="";
function f10() {
	var firstnm = document.getElementById("firstnm").value;
	var lastnm = document.getElementById("lstname").value;
	var h3 = extractDigits(document.getElementById("hphone").value);
	var src = document.getElementById("src").value;
	var validate = true;
	if (firstnm == "") {
		$("#rsp_fname").html('First Name is a required field.');
		validate = false;
	} else {
		if (pattern.test(firstnm)) {
			validate = false;
			$("#rsp_fname").html('Special Character are not allowed.');
		} else {
			$("#rsp_fname").html('');
		}

	}
	if (lastnm == "") {
		$("#rsp_lname").html('Last Name is a required field.');
		validate = false;
	} else {
		if (pattern.test(lastnm)) {
			validate = false;
			$("#rsp_lname").html('Special Character are not allowed.');
		} else {
			$("#rsp_lname").html('');
		}
	}
	if (h3 == "") {
		$("#rsp_phone").html('Phone Number is a required field.');
		validate = false;
	} else {
		//$("#rsp_phone").html('');
		var filter = /^\d{10}$/;
		if (filter.test(h3)) {
			if (h3.charAt(0) == "0" || h3.charAt(0) == "1" || h3.indexOf("5551212") > -1 || h3.indexOf("0000000") > -1 || h3.indexOf("1111111") > -1
				|| h3.indexOf("2222222") > -1 || h3.indexOf("3333333") > -1 || h3.indexOf("4444444") > -1 || h3.indexOf("5555555") > -1
				|| h3.indexOf("6666666") > -1 || h3.indexOf("7777777") > -1 || h3.indexOf("8888888") > -1 || h3.indexOf("9999999") > -1
				|| h3.indexOf("123456789") > -1 || h3.indexOf("987654321") > -1) {
				$("#rsp_phone").html('Kindly provide 10 digits valid phone.');
				validate = false;
			} else {
				$.ajax({
					type: "GET",
					url: PHONE_API_CONFIG.PHONE_API_URL + "?phonenumber=" + h3,
					async: false,
					success: function(response) {
						if (response.valid) {
							$("#rsp_phone").html(''); // Clear any previous error message

							linetype = response.line_type;
							var msg = response.errorMessage;
							if (msg === null) {
								msg = "Valid";
							}
							clickEvent("PhoneVerification", msg);
						} else {
							validate = false;
							$("#rsp_phone").html('Kindly provide 10 digits valid phone.');
							clickEvent("PhoneVerification", "Invalid");
						}
					},
					error: function() {
						validate = false;
						clickEvent("PhoneVerification", "Invalid");
						$("#rsp_phone").html('Kindly provide 10 digits valid phone.');
					}
				});
			}
		} else {
			$("#rsp_phone").html('Kindly provide 10 digits valid phone.');
			validate = false;
		}
	}

	if (!$("input[name='acceptedterms']").is(':checked')) {
		clickEvent("T&C", "Submit without checked TOC");
		$("#rsp_acceptedterms")
			.html('You must accept our terms of service to continue.')
			.attr('tabindex', '-1')
			.focus();
		validate = false;
	} else {
		$("#rsp_acceptedterms").html('').removeAttr('tabindex');
	}

	if (validate) {
		// Disable the buttons
		$("#previousbtn").prop("disabled", true);
		$("#previousbtnback").prop("disabled", true);
		createRequest();
	}
	return validate;
}

function extractDigits(phoneNumber) {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // For US numbers, if there's a leading '1' country code, remove it
  // to get exactly 10 digits
  if (digitsOnly.length === 11 && digitsOnly.charAt(0) === '1') {
    return digitsOnly.substring(1);
  }
  
  // Return the digits (up to 10)
  return digitsOnly;
}


function createRequest() {
	var firstnm = document.getElementById("firstnm").value;
	var lastnm = document.getElementById("lstname").value;
	var hphone = extractDigits(document.getElementById("hphone").value);
	
	var harea = hphone.substring(0, 3);
	var h2 = hphone.substring(3, 6);
	var h3 = hphone.substring(6, 10);
	hphone = hphone.substring(3, 10);

	var size = document.getElementById("sizehiddenfield").value;
	var portfolioSize = "Portfolio Size - ";
	switch (size) {
		case '76473': portfolioSize = portfolioSize + 'Less than $50,000';
			break;
		case '27721': portfolioSize = portfolioSize + 'Less than $100 thousand';
			break;
		case '27722': portfolioSize = portfolioSize + '$100,000 - $250,000';
			break;
		case '27723': portfolioSize = portfolioSize + '$250,000 - $500,000';
			break;
		case '27724': portfolioSize = portfolioSize + '$500,000 - $1 million';
			break;
		case '36716': portfolioSize = portfolioSize + '$1 million - $3 million';
			break;
		case '36717': portfolioSize = portfolioSize + 'More Than $3 million';
			break;
	}
	var radio1 = document.getElementById("retireHiddenfield").value;
	var radio2 = document.getElementById("ownHomeHiddenfield").value;
	var radio3 = document.getElementById("ownbuisnesshiddenfield").value;
	var haveAdvisor = document.getElementById("haveAdvisorhidenfield").value;
	var haveAdvisorMsg = "";
	switch (haveAdvisor) {
		case '78402': haveAdvisorMsg = haveAdvisorMsg + 'I have Advisor';
			break;
		case '78403': haveAdvisorMsg = haveAdvisorMsg + 'I don\'t have Advisor';
			break;
	}
	var advisorreason = '78415';
	var advisorreasonValue = 'Reason - ';
	if (haveAdvisor == '78402') {
		advisorreason = document.getElementById("whyLookinghiddenfield").value;
		switch (advisorreason) {
			case '78404': advisorreasonValue = advisorreasonValue + "Looking for Second Opinion";
				break;
			case '78405': advisorreasonValue = advisorreasonValue + "Unhappy with Current Advisor";
				break;
			case '78406': advisorreasonValue = advisorreasonValue + "New Advisor For Other Reason";
				break;
			default: advisorreasonValue = advisorreasonValue + "NA";
		}
	}

	var promoxity = document.getElementById("promoxityhiddenfield").value;
	var advisorLocationPreference = "Advisor Location - ";
	switch (promoxity) {
		case 'L': advisorLocationPreference = advisorLocationPreference + "Local Advisor";
			break;
		case 'R': advisorLocationPreference = advisorLocationPreference + "Non Local Advisor";
			break;
		case 'P': advisorLocationPreference = advisorLocationPreference + "No Preference";
			break;
	}

	var houseHoldincome = document.getElementById("houseHoldincomeHidenfld").value;
	var householdincomecomment = "Household Income - ";
	switch (houseHoldincome) {
		case '121112': householdincomecomment = householdincomecomment + 'Less than $40,000';
			break;
		case '121113': householdincomecomment = householdincomecomment + '$40,000 - $74,999';
			break;
		case '121114': householdincomecomment = householdincomecomment + '$75,000 - $99,999';
			break;
		case '121115': householdincomecomment = householdincomecomment + '$100,000 - $149,999';
			break;
		case '121116': householdincomecomment = householdincomecomment + '$150,000 - $249,999';
			break;
		case '121117': householdincomecomment = householdincomecomment + 'More Than $250,000';
			break;
	}

	var retire = "Retire in ";
	switch (radio1) {
		case '78407': retire = retire + '1-5 Years';
			break;
		case '78408': retire = retire + '5-10 Years';
			break;
		case '78409': retire = retire + '10+ Years';
			break;
		case '78410': retire = 'Already Retired';
			break;
	}

	var ownHome = "";
	switch (radio2) {
		case '78411': ownHome = "Own House - Yes";
			break;
		case '78412': ownHome = "Own House - No";
			break;
	}

	var ownBusiness = "";
	switch (radio3) {
		case '78413': ownBusiness = "Own Business - Yes";
			break;
		case '78414': ownBusiness = "Own Business - No";
			break;
	}

	var email = document.getElementById("email").value;
	var src = document.getElementById("src").value;
	var kwd = document.getElementById("kwd").value;
	var cta = document.getElementById("cta").value;
	var pl = document.getElementById("pl").value;
	var path = document.getElementById("path").value;
	var advisorService = "";
	var advisorServiceValue = "Services - ";
	if (services.length == 0) {
		services.push("19400");
	}
	var tid = document.getElementById("tid").value;
	var affId = document.getElementById("affId").value;

	for( var i = 0; i < services.length; i++){
		   advisorService = advisorService + "&Q200503=" + services[i];
		   switch(services[i]) {
			   case '19400' :  advisorServiceValue = advisorServiceValue + "Portfolio Management, ";
			   break;
			   case '70675' :  advisorServiceValue = advisorServiceValue + "Retirement Planning, ";
			   break;
			   case '70676' :  advisorServiceValue = advisorServiceValue + "Estate Planning, ";
			   break;
			   case '76773' :  advisorServiceValue = advisorServiceValue + "Education Planning,";
			   break;
			   case '76774' :  advisorServiceValue = advisorServiceValue + "401K Rollover, ";
			   break;
			   case '70677' : { advisorOtherService = document.getElementById("other_services").value;
				   				advisorServiceValue = advisorServiceValue + "Other, ";
			   					break;
			   }
			}   
	   }
	   if(advisorOtherService){
		var comment = document.getElementById("additional_comment").value;
		   if(comment){
			   comment = "Text for other service: " + advisorOtherService + "; Additional Text: " + comment;
		   } else {
			   comment = "Text for other service: " + advisorOtherService;
		   }
	   }
	var acceptedterms = "";
	if ($("input[name='acceptedterms']").is(':checked')) {
		acceptedterms = "Y"
	} else {
		acceptedterms = "N";
	}

	const allValues =  getAllCheckboxValues();
	var selectAll = document.getElementById("selectAll").checked;
	//console.log(selectAll);

	var adc = retire + '; ' + ownHome + '; ' + ownBusiness + '; ' + householdincomecomment + "; " + advisorLocationPreference + "; " + portfolioSize + "; " + haveAdvisorMsg + "; " + advisorreasonValue + "; " + advisorServiceValue + "; " + email + "; " + firstnm + " " + lastnm + "; Phone- " + harea + hphone + "; Zip -" + zip1;
	adc = adc;
	var datastring = "harea=" + harea
		+ "&hphone3=" + h2
		+ "&hphone4=" + h3
		+ "&firstnm=" + firstnm
		+ "&lastnm=" + lastnm
		+ "&sendzip=" + zip1
		+ "&email=" + email
		+ "&Q1405152631=" + size
		+ advisorService + "&Q1405162363=76775&x=1&src=" + src
		+ "&bd=" + src
		+ "&kwd=" + kwd
		+ "&pl=" + pl
		+ "&proximity=" + promoxity
		+ "&Q2000006740=" + haveAdvisor
		+ "&Q1405163432=" + houseHoldincome
		+ "&Q2000006741=" + advisorreason
		+ "&cat=1720000130&header=none&customThankYou=Y&path=" + path
		+ "&acceptedterms=" + acceptedterms
		+ "&Q2000006742=" + radio1
		+ "&Q2000006743=" + radio2
		+ "&Q2000006744=" + radio3
		+ "&adc=" + adc
		+ "&tid=" + tid
		+ "&aff_id=" + affId
		+ "&show_compl_seller=" + allValues
		+ "&selectall_compl=" + selectAll
		+ "&linetype=" +linetype;
	finalForm = true;
	$("#partialSubmit").hide();
	hideButtons();
	document.getElementById("loadingimage").style.display = 'block';
	$.ajax({
		url: '/landing-pages/new-multi-step/processlead-new.jsp?' + datastring, // form action url
		type: 'GET', // form submit method get/post
		dataType: 'html', // request type html/json/xml 
		success: function(result) {
			$("#result2").html(result);
			$("#loadingimage").hide();
			// Parse the generated ID from the response HTML
			const generatedId = $("#result2").find("#responseContent").data("generated-id");
			nextStep();
			changeMsg(9);
			$('#requestId').val(generatedId);
			showButtons(false, true);
			$('.m-next').val('SUBMIT');
			clickEvent("Name&PhoneNumber Clicked", firstnm + " " + lastnm + " " + h3);
			let dataLayerMsg = portfolioSize + "; requestId - " + generatedId;
			if(src === "200240195"){
				dataLayerMsg = dataLayerMsg + "; " + advisorServiceValue;
			}
			clickEvent("FinalSubmitClick", dataLayerMsg);
		}
	});
}


var my_func = function(event) {
	event.preventDefault();
	$("#submitbtn").hide();
	var validate = true;
	var src = document.getElementById("src").value;
	const firstnm = document.getElementById("firstnm").value;
	const comment = document.getElementById("additional_comment").value;
	const requestId = document.getElementById("requestId").value;
	if (parseInt(requestId) <= 0) {
		const message = 'Alert: You placed an earlier request using the same email.\n' +
			'Contact support at wa.assistance@wiseradvisor.com.';
		alert(message);
		validate = false;
	}
	const size = document.getElementById("sizehiddenfield").value;
	let portfolioSize = "Portfolio Size - ";
	switch (size) {
		case '76473': portfolioSize = portfolioSize + 'Less than $50,000';
			break;
		case '27721': portfolioSize = portfolioSize + 'Less than $100 thousand';
			break;
		case '27722': portfolioSize = portfolioSize + '$100,000 - $250,000';
			break;
		case '27723': portfolioSize = portfolioSize + '$250,000 - $500,000';
			break;
		case '27724': portfolioSize = portfolioSize + '$500,000 - $1 million';
			break;
		case '36716': portfolioSize = portfolioSize + '$1 million - $3 million';
			break;
		case '36717': portfolioSize = portfolioSize + 'More Than $3 million';
			break;
	}
	var advisorServiceValue = "Services - ";
	for( var i = 0; i < services.length; i++) {
			   switch(services[i]) {
				   case '19400' :  advisorServiceValue = advisorServiceValue + "Portfolio Management, ";
				   break;
				   case '70675' :  advisorServiceValue = advisorServiceValue + "Retirement Planning, ";
				   break;
				   case '70676' :  advisorServiceValue = advisorServiceValue + "Estate Planning, ";
				   break;
				   case '76773' :  advisorServiceValue = advisorServiceValue + "Education Planning,";
				   break;
				   case '76774' :  advisorServiceValue = advisorServiceValue + "401K Rollover, ";
				   break;
				   case '70677' : { advisorOtherService = document.getElementById("other_services").value;
					   				advisorServiceValue = advisorServiceValue + "Other, ";
				   					break;
				   }
				}   
	}
	var count = getWordsCount(comment.trim())
	if (count > 250) {
		$("#rsp_additional").html("Maximum 250 words are allowed.");
		validate = false;
	}
	const allAdvisors = getAllCheckboxValues();
	const selectedValues = getSelectedCheckboxValues();
	// Check if no checkboxes are selected
	if (selectedValues.length === 0 && showAlertOneTime) {
		$("#rsp_final_step")
			.html("Selecting a few firms to be considered for your final match helps find your ideal advisor. Your information is only shared with the final 2 to 3 advisors.")
			.attr('tabindex', '-1')
			.focus();
		validate = false;
		showAlertOneTime = false;
	} else {
		$("#rsp_final_step")
			.html('').removeAttr('tabindex');
	}
	var selectAll = document.getElementById("selectAll").checked;
	if (validate) {
		var URL = "/rest/tcpa/1.2/request/" + requestId;
		const data = {};
		data.comment = comment;
		data.selectAll = selectAll;
		data.selectedValues = selectedValues;
		document.getElementById("loadingimage1").style.display = 'block';
		$.ajax({
			url: URL, // form action url
			type: 'PUT', // form submit method get/post
			contentType: 'application/json',
			data: JSON.stringify(data),  // Convert the data object to a JSON string
			cache: false,  // Disable cache
			success: function(result) {
				nextStep();
				$("#loadingimage1").hide();
				document.removeEventListener('mouseout', mouseEvent);
				$('#progressbar').addClass('hidden-important');
				document.getElementById("field16").style.display = 'none';
				$('.desktop-why-need-this').css('display', 'none !important');
				document.getElementById("field17").style.display = 'block';
				$(".step-heading").hide();
				$(".thanku-mess").show();
				$(".thanku-mess").html('<b>Thank you ' + firstnm + '</b> for submitting your request! <hr>');
				$('.co_brand_logo').css('display', 'inline-block');
				$('.co_brand_logo').css('max-width', '225px');
				if (path != 'wa') {
					$('.co_brand_logo').css('float', 'right');
				}
				let datalayerData = "requestId : " + requestId;
				if (allAdvisors.length > 0 || selectedValues.length > 0 || selectAll.length > 0) {
					datalayerData = datalayerData + "; ComplVisibleSeller : " + allAdvisors;
					datalayerData = datalayerData + "; ComplSelectedSeller : " + selectedValues;
					datalayerData = datalayerData + "; CompSelectAllCheckbox : " + selectAll;
				}
				if(src === "200240195") {
						datalayerData = datalayerData + "; " + advisorServiceValue;
				}
				clickEvent("ComplianceSubmitClick", portfolioSize + "; " + datalayerData);
			},
			error: function(xhr, status, error) {
				$("#submitbtn").show();
				$("#loadingimage1").hide();
			}
		});
	} else {
		$("#loadingimage1").hide();
		$("#submitbtn").show();
	}
};


var form = document.getElementById("formSubmit");
//attach event listener
form.addEventListener("submit", my_func, true);

form.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();

		// Find the currently visible fieldset
		// Get the ID of the newly visible fieldset
		var currentStep = $('fieldset:visible');
		// Switch logic based on the current step
		switch (currentStep.attr('id')) {
			case 'field1':
				// Validation for first step
				multistepvalidateForm();
				break;

			case 'field13':
				// Validation for second step
				validateEmail();
				break;
			case 'field14':
				f10();
				break;
			case 'field16':
				hideButtons();
				triggerSubmit();
				break;
			default:
				console.log('Unknown step');
		}
	}
});


//Add the event listener
document.addEventListener('visibilitychange', handleVisibilityChange);

//Define the event listener function
function handleVisibilityChange() {
	if (document.visibilityState == 'hidden') {
		// send beacon request
		var size = document.getElementById("sizehiddenfield").value;
		var portfolioSize = "Portfolio Size - ";
		switch (size) {
			case '76473': portfolioSize = portfolioSize + 'Less than $50,000';
				break;
			case '27721': portfolioSize = portfolioSize + 'Less than $100 thousand';
				break;
			case '27722': portfolioSize = portfolioSize + '$100,000 - $250,000';
				break;
			case '27723': portfolioSize = portfolioSize + '$250,000 - $500,000';
				break;
			case '27724': portfolioSize = portfolioSize + '$500,000 - $1 million';
				break;
			case '36716': portfolioSize = portfolioSize + '$1 million - $3 million';
				break;
			case '36717': portfolioSize = portfolioSize + 'More Than $3 million';
				break;
		}
		var radio1 = document.getElementById("retireHiddenfield").value;
		var radio2 = document.getElementById("ownHomeHiddenfield").value;
		var radio3 = document.getElementById("ownbuisnesshiddenfield").value;
		var haveAdvisor = document.getElementById("haveAdvisorhidenfield").value;
		var haveAdvisorMsg = "";
		switch (haveAdvisor) {
			case '78402': haveAdvisorMsg = haveAdvisorMsg + 'I have Advisor';
				break;
			case '78403': haveAdvisorMsg = haveAdvisorMsg + 'I don\'t have Advisor';
				break;
		}
		var advisorreason = '78415';
		var advisorreasonValue = 'Reason - ';
		if (haveAdvisor == '78402') {
			advisorreason = document.getElementById("whyLookinghiddenfield").value;
			switch (advisorreason) {
				case '78404': advisorreasonValue = advisorreasonValue + "Looking for Second Opinion";
					break;
				case '78405': advisorreasonValue = advisorreasonValue + "Unhappy with Current Advisor";
					break;
				case '78406': advisorreasonValue = advisorreasonValue + "New Advisor For Other Reason";
					break;
				default: advisorreasonValue = advisorreasonValue + "NA";
			}
		}

		var proximity = document.getElementById("promoxityhiddenfield").value;
		var advisorLocationPreference = "Advisor Location - ";
		switch (proximity) {
			case 'L': advisorLocationPreference = advisorLocationPreference + "Local Advisor";
				break;
			case 'R': advisorLocationPreference = advisorLocationPreference + "Non Local Advisor";
				break;
			case 'P': advisorLocationPreference = advisorLocationPreference + "No Preference";
				break;
		}

		var houseHoldincome = document.getElementById("houseHoldincomeHidenfld").value;
		var householdincomecomment = "Household Income - ";
		switch (houseHoldincome) {
			case '121112': householdincomecomment = householdincomecomment + 'Less than $40,000';
				break;
			case '121113': householdincomecomment = householdincomecomment + '$40,000 - $74,999';
				break;
			case '121114': householdincomecomment = householdincomecomment + '$75,000 - $99,999';
				break;
			case '121115': householdincomecomment = householdincomecomment + '$100,000 - $149,999';
				break;
			case '121116': householdincomecomment = householdincomecomment + '$150,000 - $249,999';
				break;
			case '121117': householdincomecomment = householdincomecomment + 'More Than $250,000';
				break;
		}

		var retire = "Retire in ";
		switch (radio1) {
			case '78407': retire = retire + '1-5 Years';
				break;
			case '78408': retire = retire + '5-10 Years';
				break;
			case '78409': retire = retire + '10+ Years';
				break;
			case '78410': retire = 'Already Retired';
				break;
		}

		var ownHome = "";
		switch (radio2) {
			case '78411': ownHome = "Own House - Yes";
				break;
			case '78412': ownHome = "Own House - No";
				break;
		}

		var ownBusiness = "";
		switch (radio3) {
			case '78413': ownBusiness = "Own Business - Yes";
				break;
			case '78414': ownBusiness = "Own Business - No";
				break;
		}

		var advisorService = "";
		var advisorServiceValue = "Services - ";
		if (services.length == 0) {
			services.push("19400");
		}
		for( var i = 0; i < services.length; i++) {
					   if(advisorService) {
						   advisorService = advisorService + "," + services[i];
					   } else {
					  	   advisorService = advisorService + services[i];
					   }
					   switch(services[i]) {
						   case '19400' :  advisorServiceValue = advisorServiceValue + "Portfolio Management, ";
						   break;
						   case '70675' :  advisorServiceValue = advisorServiceValue + "Retirement Planning, ";
						   break;
						   case '70676' :  advisorServiceValue = advisorServiceValue + "Estate Planning, ";
						   break;
						   case '76773' :  advisorServiceValue = advisorServiceValue + "Education Planning,";
						   break;
						   case '76774' :  advisorServiceValue = advisorServiceValue + "401K Rollover, ";
						   break;
						   case '70677' : { advisorOtherService = document.getElementById("other_services").value;
							   				advisorServiceValue = advisorServiceValue + "Other, ";
						   					break;
						   }
						}   
				   }

		var comment = document.getElementById("additional_comment").value;
		if (advisorOtherService) {
			if (comment) {
				comment = advisorOtherService + ", " + comment;
			} else {
				comment = advisorOtherService;
			}
		}
		var email = document.getElementById("email").value;
		var src = document.getElementById("src").value;
		var kwd = document.getElementById("kwd").value;
		var cta = document.getElementById("cta").value;
		var pl = document.getElementById("pl").value;

		var adc = retire + '; ' + ownHome + '; ' + ownBusiness + '; ' + householdincomecomment + "; " + advisorLocationPreference + "; " + portfolioSize + "; " + haveAdvisorMsg + "; " + advisorreasonValue + "; " + advisorServiceValue + "; " + email + "; " + " Zip -" + zip1;
		var URL = "/rest/requesttemp";
		var data = new FormData();
		data.append('details', adc);
		data.append('email', email);
		data.append('kwd', kwd);
		data.append('pl', pl);
		data.append('src', src);

		data.append('sendzip', zip1);
		data.append('Q1405152631', size);
		// Append each service directly to FormData
		services.forEach(function(service) {
			data.append('Q200503', service);
		});
		data.append('Q1405162363', '76775');
		data.append('proximity', proximity);
		data.append('Q2000006740', haveAdvisor);
		data.append('Q1405163432', houseHoldincome);
		data.append('Q2000006741', advisorreason);
		data.append('cat', '1720000130');
		data.append('Q2000006742', radio1);
		data.append('Q2000006743', radio2);
		data.append('Q2000006744', radio3);
		if ((!finalForm) && emailValidated) {
			// Remove the event listener using the same function reference
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (size != "" && advisorService != "") {
				navigator.sendBeacon(URL, data);
			}
		}
	}
}


// "Select All" functionality
document.getElementById('selectAll').addEventListener('change', function() {
	var checkboxes = document.querySelectorAll('input[name="advisor_compl"]');
	for (var checkbox of checkboxes) {
		checkbox.checked = this.checked;
	}
});

function getAllCheckboxValues() {
	// Get all checkboxes with the name 'option' (checked or unchecked)
	const checkboxes = document.querySelectorAll('input[name="advisor_compl"]');

	// Extract the values into an array
	const values = Array.from(checkboxes).map(checkbox => checkbox.value);

	return values.join(','); // Return the array of values if needed
}
function getSelectedCheckboxValues() {
	// Get all checkboxes with the name 'option'
	const checkboxes = document.querySelectorAll('input[name="advisor_compl"]:checked');

	// Extract the values into an array
	const values = Array.from(checkboxes).map(checkbox => checkbox.value);

	// Log the values
	//console.log(values);

	return values.join(','); // Return the array of values if needed
}


// Get the Select All checkbox and individual advisor checkboxes
var selectAllCheckbox = document.getElementById("selectAll");

// Individual checkbox handler
$('#field16').on('change', 'input[type="checkbox"][name="advisor_compl"]', function() {
	const $card = $(this).closest('.option-select');

	if (this.checked) {
		const $tokenProfile = createTokenProfile($card);
		$card.hide();
		$('.token-profile').append($tokenProfile);
	}

	// Update Select All checkbox state
	updateSelectAllCheckboxState();
});


// Function to create token profile
function createTokenProfile($card) {
	// Create and append bubble
	const $tokenProfile = $(`<div class="selected-advisor-bubble profile-advisor">
										<img src="${$card.find('img').attr('src')}">
										<span class="advisor-name">${$card.find('h1').text()}</span>
										<div class="cross-btn"><img src="/landing-pages/new-multi-step/images/x-icon.svg"></div>
									</div>
				            `);



	// Cross button handler
	$tokenProfile.find('.cross-btn').on('click', function() {
		$card.show();
		const name = $card.find('h1').text();
		clickEvent('compliance', 'Unchecked -' + name);
		$card.find('input[type="checkbox"]').prop('checked', false);
		$tokenProfile.remove();
		updateSelectAllCheckboxState();
	});

	return $tokenProfile;
}

// Handle change event for Select All checkbox
selectAllCheckbox.addEventListener('change', function() {
	const isChecked = $(this).prop('checked');

	// Check/uncheck all individual checkboxes
	$('#field16 input[type="checkbox"]:not(#selectAllCheckbox)').prop('checked', isChecked);

	// Manage token profiles based on Select All state
	if (isChecked) {
		$('.token-profile').empty();
		// Hide all cards and create token profiles
		$('.option-select').each(function() {
			const $card = $(this);
			const $tokenProfile = createTokenProfile($card);
			$card.hide();
			$('.token-profile').append($tokenProfile);
		});
	} else {
		// Show all cards and remove token profiles
		$('.option-select').show();
		$('.token-profile').empty();
	}
});

// Function to update the Select All checkbox state based on individual checkboxes
function updateSelectAllCheckboxState() {
	var advisorCheckboxes = document.querySelectorAll("#field16 input[type='checkbox'][name='advisor_compl']");
	var allChecked = Array.from(advisorCheckboxes).every(function(checkbox) {
		return checkbox.checked;
	});
	if (selectAllCheckbox.checked && !allChecked) {
		selectAllCheckbox.checked = allChecked; // Check/Uncheck Select All based on individual checkboxes
	}
}

document.addEventListener('focusout', (event) => {
	if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
		// Delay to ensure browser has time to process
		setTimeout(() => {
			// Use meta viewport tag with additional parameters
			const metaViewport = document.querySelector('meta[name="viewport"]');
			if (metaViewport) {
				metaViewport.setAttribute(
					'content',
					'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				);
			}
		}, 100);
	}
});


$(document).ready(function() {
	// Process button click handler
	getTcpaSellersDetails();
	if (window.innerWidth <= 768) { // Adjust breakpoint as needed
		// Function to collapse all accordions
		function collapseAll() {
			$('#collapseThree1').removeClass('in');
		}
		window.addEventListener('scroll', () => {

			if (window.scrollY === 0) {
				// User is scrolling down, collapse all accordions
				collapseAll();
			}

		});
		const stickySection = document.querySelector('#sticky');
		// Detect touch outside the sticky section
		document.addEventListener('touchstart', event => {
			if (!stickySection.contains(event.target)) {
				collapseAll();
			}
		});
	}

	$('#processbtn').on('click', function(e) {
		e.preventDefault();

		// Find the currently visible fieldset
		// Get the ID of the newly visible fieldset
		var currentStep = $('fieldset:visible');
		// Switch logic based on the current step
		switch (currentStep.attr('id')) {
			case 'field1':
				// Validation for first step
				multistepvalidateForm();
				break;

			case 'field13':
				// Validation for second step
				validateEmail();
				break;
			case 'field14':
				f10();
				break;
			case 'field16':
				hideButtons();
				triggerSubmit();
				break;
			case 'field2':
				fNext1();
				break;
			case 'field11':
				otherService();
				break;
			default:
				console.log('Unknown step');
		}
	});
});

// Explicitly trigger the 'submit' event programmatically
function triggerSubmit() {
	const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
	form.dispatchEvent(submitEvent);
}

// Specifically target media query styles
function showButtons(showBack, showNext) {
	if (window.innerWidth <= 768) {
		if (showBack) {
			$('.sticky-btn, .m-back').css({
				'display': 'block !important',
				'visibility': 'visible'
			});
			$('.sticky-btn,.m-back').show();

		}
		if (showNext) {
			$('.sticky-btn,.m-next').css({
				'display': 'block !important',
				'visibility': 'visible'
			});
			$('.sticky-btn,.m-next').show();
		}
	}
}

function hideButtons() {
	// Check if the screen width is less than or equal to 768px (common mobile breakpoint)
	if (window.innerWidth <= 768) {
		$('.m-back, .m-next, .sticky-btn').css({
			'display': 'none',
			'visibility': 'hidden'
		}).hide();
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const accordionToggles = document.querySelectorAll('.accordion-toggle');

	if (accordionToggles.length === 0) {
		console.error("No .accordion-toggle elements found!");
		return;
	}

	accordionToggles.forEach(toggle => {
		// Initialize the arrow rotation based on the current aria-expanded state
		updateArrowState(toggle);

		// Attach a click event to handle the toggle of each accordion
		toggle.addEventListener('click', function(event) {
			event.preventDefault(); // Prevent the default link behavior
			event.stopPropagation(); // Prevent the event from bubbling up
			toggleAccordion(toggle);
		});
	});

	// Close all accordions if clicked anywhere outside
	document.addEventListener('click', function() {
		accordionToggles.forEach(toggle => {
			if (toggle.getAttribute('aria-expanded') === 'true') {
				toggle.setAttribute('aria-expanded', 'false');
				const content = document.querySelector(toggle.getAttribute('href'));
				if (content) content.style.display = 'none'; // Hide the content
				updateArrowState(toggle);
			}
		});
	});

	// Function to toggle accordion
	function toggleAccordion(toggle) {
		const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
		const targetId = toggle.getAttribute('href');
		const content = document.querySelector(targetId);

		// Collapse all other accordions
		accordionToggles.forEach(otherToggle => {
			if (otherToggle !== toggle) {
				otherToggle.setAttribute('aria-expanded', 'false');
				const otherContent = document.querySelector(otherToggle.getAttribute('href'));
				if (otherContent) otherContent.style.display = 'none'; // Hide the other content
				updateArrowState(otherToggle);
			}
		});

		// Toggle the current accordion
		toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
		if (content) content.style.display = isExpanded ? 'none' : 'block'; // Show or hide the content
		updateArrowState(toggle);
	}

	// Function to update arrow state
	function updateArrowState(toggle) {
		const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

		if (isExpanded) {
			toggle.classList.add('rotated'); // Add rotated class when expanded
		} else {
			toggle.classList.remove('rotated'); // Remove rotated class when collapsed
		}
	}
});


/* === Retirement Planning PPC form Exit pop up JS === */
var popUp = 0;

jQuery(document).ready(function() {
	var path = document.getElementById("path").value;
	if (path === 'rp') {
		ouibounce(document.getElementById('ouibounce-modal-rp'), {
			aggressive: true,
			callback: function() {
				dataLayer.push({
					event: 'exitPopOpen'
				});
			}
		});
	}
});

setTimeout(() => {
	var path = document.getElementById("path").value;
	if (path === 'rp' && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && popUp < 1) {
		document.getElementById('ouibounce-modal-rp').style.display = 'block';
		popUp = popUp + 1;
	}
	jQuery("input[name='kwd']").val("HOME_footer_zip");
}, 10000);
function markClose() {
	document.getElementById('ouibounce-modal-rp').style.display = 'none';
}
jQuery(document).scroll(
	function() {
		var path = document.getElementById("path").value;
		if (path === 'rp') {
			var body = document.body, html = document.documentElement;
			var height = Math.max(body.scrollHeight, body.offsetHeight,
				html.clientHeight, html.scrollHeight,
				html.offsetHeight);
			var y = jQuery(this).scrollTop();
			var percentage = (y / height) * 100;
			if (percentage > 40 && popUp < 1) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					jQuery("input[name='kwd']").val("HOME_footer_zip");
					document.getElementById('ouibounce-modal-rp').style.display = 'block';
					popUp++;
				}
			}
		}
	});


