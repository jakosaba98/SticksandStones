$('#submit').on('click',()=>{
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
        $('#error').text(error.responseJSON.code+" - "+error.responseJSON.error);
    })
})