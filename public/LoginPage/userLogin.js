$(document).ready(function () {
 
    $('#btnsubmit').on('click', function () {
        debugger;
        var username, password;
        if ($("#password").val() == "" || $("#loginId").val() == "") {
            $('#lblErrorText').text("");
            $('#lblErrorText').text("Please Enter User name/Password.")
        }

        ServerCall({
            paras: {
                loginId: $("#loginId").val(),
                password:$("#password").val()
            },
            apiCall: '/abc',
            successFunc: (data) => {
                if (data[0][0].status == "done") {
                    window.location='/mapView';
                }
                else {
                    $('#lblErrorText').text("");
                    $('#lblErrorText').text("Wrong User name/Password.");
                }
                
            }
        })
    })
})
