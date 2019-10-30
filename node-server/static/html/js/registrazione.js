$('#submit').on('click',()=>{
    let obj = {};
    obj.username = $('#inputUtente').val();
    obj.email=$('#Email').val().toLowerCase();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if($('#inputPassword').val()!=$('#inputPassword2').val())
        $('#error').text('Le due password non coincidono!');
    else
    if(re.test(obj.email))
        $('#error').text('Mail inserita non valida!');
    else
    if(obj.username && $('#inputPassword').val())
    {
        obj.password = sha512($('#inputPassword').val());
        $('#error').text('');// delete old errors
        $.ajax("./api/register",{
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify(obj)
        }).then(()=>{}).catch((error)=>{
            if(error.status==500)
                $('#error').text('Server non disponibile al momento. Riprovare più tardi (Internal Server Error)');
            if(error.status==401)
                $('#error').text('Utente o password sbagliata');
        })
    }
})