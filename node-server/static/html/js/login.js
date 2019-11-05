$('#submit').on('click',()=>{
    let obj = {};
    obj.username = $('#inputUtente').val();
    if(obj.username && $('#inputPassword').val())
    {
        obj.crypted_password = sha512($('#inputPassword').val());
        $('#error').text('');// delete old errors
        $.ajax("./api/login",{
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify(obj)
        }).then(()=>{
            window.location=window.location;
        }).catch((error)=>{
            //console.log(error);
            if(error.status==500)
                $('#error').text('Server non disponibile al momento. Riprovare più tardi (Internal Server Error)');
            if(error.status==401)
                $('#error').text('Utente o password sbagliata');
        })
    }
})