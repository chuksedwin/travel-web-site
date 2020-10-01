function showHideMessage(element, display) {
    // "this" is pointing to the owner object -> the calling element (input)
    // Set display='none' to hide the element. or display='' to show the element
    element.previousElementSibling.style.display = display;
}

function confirmation() {
return confirm("Do you want to submit")
}

function resetting() {
return confirm("Do you want to reset")
}


function check_password() {
    var password_length = $("#form_password").val().length;
    if (password_length < 8) {
       $("#password_error_message").html("Atleast 8 Characters");
       $("#password_error_message").show();
       $("#form_password").css("border-bottom","2px solid #F90A0A");
       error_password = true;
    } else {
       $("#password_error_message").hide();
       $("#form_password").css("border-bottom","2px solid #34F458");
    }
}

function check_retype_password() {
    var password = $("#form_password").val();
    var retype_password = $("#form_retype_password").val();
    if (password !== retype_password) {
        $("#retype_password_error_message").html("Passwords Did not Matched");
        $("#retype_password_error_message").show();
        $("#form_retype_password").css("border-bottom","2px solid #F90A0A");
        error_retype_password = true;
    } else {
        $("#retype_password_error_message").hide();
        $("#form_retype_password").css("border-bottom","2px solid #34F458");
    }
}