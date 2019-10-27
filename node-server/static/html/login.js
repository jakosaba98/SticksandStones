$('#submit').on('click',()=>{
    $('#error').text('');// delete old errors
    let obj = {};
    obj.username = $('#inputUtente').val();
    obj.crypted_password = sha512($('#inputPassword').val());
    $.ajax("./api/login",{
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(obj)
    }).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
        if(error.responseJSON.code==='ECONNREFUSED')
            $('#error').text('Server non disponibile al momento. Riprovare più tardi (Internal Server Error)');
    })
})