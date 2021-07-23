
var formValues = {
    formEName: "",
    formENumber: "",
    formEPhoneNumber: "",
    formEAddress: "",
    formECity: "",
    formEState: "",
    formEZip: "",
    formIsCurrEmployee: ""
}

// Update data on submission click
function updateFormValues()
{
    formValues["formEName"] = $("[name='formEName']").val();
    formValues["formENumber"] = $("[name='formENumber']").val();
    formValues["formEPhoneNumber"] = $("[name='formEPhoneNumber']").val();
    formValues["formEAddress"] = $("[name='formEAddress']").val();
    formValues["formECity"] = $("[name='formECity']").val();
    formValues["formEState"] = $("[name='formEState']").val();
    formValues["formEZip"] = $("[name='formEZip']").val();

    // Handle Check box for "Current Employee"
    if ($('#formCheck').is(":checked"))
    {
        formValues["formIsCurrEmployee"] = true;
    }
    else
    {
        formValues["formIsCurrEmployee"] = false;
    }
}

// Checks to make sure all values are filled before submission
function checkFormValues()
{
    exitStatus = 0;

    if(formValues["formEName"] == "")
    {
        exitStatus++;
        $(".formElem").eq(0).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(0).attr('hidden', false);
    }
    else
    {
        $(".formElem").eq(0).css("background-color", "white");
        $('.errorMessage').eq(0).attr('hidden', true);
    }

    if(formValues["formENumber"] == "")
    {
        exitStatus++;
        $(".formElem").eq(1).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(1).attr('hidden', false);
    }
    else
    {
        $(".formElem").eq(1).css("background-color", "white");
        $('.errorMessage').eq(1).attr('hidden', true);
    }

    if(formValues["formEPhoneNumber"].length < 10)
    {
        $(".formElem").eq(2).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(2).attr('hidden', false);
        exitStatus++;
    }
    else
    {
        $(".formElem").eq(2).css("background-color", "white");
        $('.errorMessage').eq(2).attr('hidden', true);
    }

    if(formValues["formEAddress"] == "")
    {
        $(".formElem").eq(3).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(3).attr('hidden', false);
        exitStatus++;
    }
    else
    {
        $(".formElem").eq(3).css("background-color", "white");
        $('.errorMessage').eq(3).attr('hidden', true);
    }

    if(formValues["formECity"] == "")
    {
        $(".formElem").eq(4).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(4).attr('hidden', false);
        exitStatus++;
    }
    else
    {
        $(".formElem").eq(4).css("background-color", "white");
        $('.errorMessage').eq(4).attr('hidden', true);
    }

    if(formValues["formEState"] == "Blank")
    {
        $(".formElem").eq(5).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(5).attr('hidden', false);
        exitStatus++;
    }
    else
    {
        $(".formElem").eq(5).css("background-color", "white");
        $('.errorMessage').eq(5).attr('hidden', true);
    }

    if(formValues["formEZip"] == "")
    {
        $(".formElem").eq(6).css("background-color", "#ffbdbd");
        $('.errorMessage').eq(6).attr('hidden', false);
        exitStatus++;
    }
    else
    {
        $(".formElem").eq(6).css("background-color", "white");
        $('.errorMessage').eq(6).attr('hidden', true);
    }
    

    return exitStatus;
}

$(document).ready(function() 
{
    $('#phoneNumber').keyup(function() 
    {
        function formatNumber(phone) 
        {
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
            phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            return phoneNumber;
        }

        var phoneNumber = $(this).val();
        phoneNumber = formatNumber(phoneNumber);
        $(this).val(phoneNumber);
    });

    $('#submitButton').on('click', function() 
    {
        updateFormValues();
        console.log((checkFormValues()>0) ? "Submission FAILED. Missing " + checkFormValues() + " form input(s)." : "Submission SUCCEEDED. All form inputs have been satisfied.");
        console.log(formValues);

        if(checkFormValues() == 0)
        {
            $(".submission").prop("disabled",true);
            var formDataJSON = JSON.stringify(formValues); 
            $.ajax(
            {
                type: 'POST',
                url: '/randomUrl/',
                data: formDataJSON, 
                contentType: "application/json",
                dataType: 'json',
            });
            console.log(formDataJSON);
            $(".formContainer").eq(0).fadeOut(1000);
        }
    });
});

