jQuery(document).ready(function() {
  jQuery('#zip1').keydown(function(event) {
      if (event.key === 'Enter' || event.which === 13) {
          jQuery('#zipbtn1').trigger('click');
      }
  });
	jQuery('#zip1').keyup(function(event) {
        zip1 = document.getElementById("zip1").value;
        if (zip1.length==0) {
			jQuery("#zip1").css( "border", "1px solid #666" );
		}
  });
  //Middle Ad form
  jQuery('#zip2').keydown(function(event) {
    if (event.key === 'Enter' || event.which === 13) {
        jQuery('#zipbtn2').trigger('click');
    }
  });
  jQuery('#zip2').keyup(function(event) {
        zip2 = document.getElementById("zip2").value;
        if (zip2.length==0) {
      jQuery("#zip2").css( "border", "1px solid #666" );
    }
  });
  //Home Talk to an Advisor form
  jQuery('#zip3').keydown(function(event) {
    if (event.key === 'Enter' || event.which === 13) {
        jQuery('#zipbtn3').trigger('click');
    }
  });
  jQuery('#zip3').keyup(function(event) {
        zip3 = document.getElementById("zip3").value;
        if (zip3.length==0) {
      jQuery("#zip3").css( "border", "1px solid #666" );
    }
  });
  //Footer Form
  jQuery('#zip4').keydown(function(event) {
    if (event.key === 'Enter' || event.which === 13) {
        jQuery('#zipbtnfooter').trigger('click');
    }
  });
  jQuery('#zip4').keyup(function(event) {
        zip4 = document.getElementById("zip4").value;
        if (zip4.length==0) {
      jQuery("#zip4").css( "border", "1px solid #666" );
    }
  });
});

function multistepvalidateForm(i,cta){
  zip1 = document.getElementById("zip" + i).value;
  kwd = document.getElementById("kwd" + i).value;
	if (zip1==null || zip1=='' || zip1.length<=4 || !/^\d+$/.test(zip1))
      {
        jQuery('#zip' + i).tooltip('dispose');
        //alert("empty");
        jQuery('#zip' + i).focus();
        jQuery( '#zip' + i ).css( "border", "1px solid #ee0000" );
        jQuery('#zip' + i).attr('title', 'Please enter a valid zip code.').tooltip('show');
        return false;
      }
      else(!(zip1==null || zip1=='' || zip1.length>=4))
        {
        // Clear previous tooltip
        jQuery('#zip' + i).tooltip('dispose');
        //jQuery('#zip' + i).removeAttr('title').tooltip('destroy');
        jQuery.ajax({url: "https://www.wiseradvisor.com/wiseradvisor/directory/getcitystate.jsp?zip="+zip1, cache: false, async:false ,success: function(result){
            if(result.trim() == 'false') {
              //alert("enter fail");
              jQuery('#zip' + i).focus();
              jQuery( '#zip' + i ).css( "border", "1px solid #ee0000" );
             jQuery('#zip' + i).attr('title', 'Provided zip code is invalid.').tooltip('show');
            } else {
              //alert("enter pass");
              jQuery('#zip' + i).removeAttr('title').tooltip('dispose');
              nextstep(zip1,cta,kwd);
            }
          }});        
}
}
function nextstep(zip1,cta,kwd)
{
   var url= "https://www.wiseradvisor.com/match_advisors.asp?kwd="+kwd+"&g=" +zip1+"&cta="+cta;
    window.location = url;
}

jQuery(function () {
  jQuery('[id^="zip"]').on('input blur', function () {
    const $field = jQuery(this);
    if ($field.val().trim() === '') {
      $field
        .tooltip('hide')
        .tooltip('dispose')
        .removeAttr('title')
        .css('border', '');
    }
  });
});

$(document).ready(function () {
  $('[data-bs-toggle="tooltip"]').each(function () {
    new bootstrap.Tooltip(this);
  });
});