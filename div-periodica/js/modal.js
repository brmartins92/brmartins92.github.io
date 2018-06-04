$(document).ready(function(){
     
    modal();
  
 
});




function modal(){
    $('.button').click(function(){
        $('#info').empty();
        $('.window').hide();
        abrir_modal();
        var elemento = $(this).val();
        //var link = 'http://localhost:8081/scrape/'+elemento;

        var link = 'https://div-periodica.herokuapp.com/props/'+elemento;
        var request = $.ajax({
            url: link,
            method: "get",
            data: { elemento : elemento },
            dataType: "json"
        });

        request.done(function( json ) {
            
            
            if(json['foundInfo'].check == true){
                $('#modal_img').show();
                $('#dialog').css('height','auto'); 
                $('#modal_img').html("<img src='"+json['img'].src+"' id='img_modal'>");
                $.each(json, function (key, data) {
                    if(key != 'img'){
                        $('#info').append("\
                            <label class='lbinfo'>\
                                <legend>"+json[key].titulo+"</legend>\
                                <input type='text' class='' id='modal_num_atomico' value="+json[key].dado+">\
                            </label>\
                        ");
                    }
                })
            }else if(json['foundInfo'].check == false){

                $('#modal_img').hide();
                var link = 'https://div-periodica.herokuapp.com/summary/'+elemento;
                var request = $.ajax({
                    url: link,
                    method: "get",
                    data: { elemento : elemento },
                    dataType: "json"
                });
                request.done(function( json ) {
                    $.each(json, function (key, data) {
                        
                            $('#info').append("\
                                <p class='lbinfo'>\
                                    "+json[key].text+"\
                                </p>\
                            ");
                       
                    })
                });

                request.fail(function( jqXHR, textStatus ) {
                    console.log( "Request failed: " + textStatus );
                });  


            }






        });

        request.fail(function( jqXHR, textStatus ) {
            console.log( "Request failed: " + textStatus );
        });  
   });

   

  $('.window .close').click(function (e) {
    e.preventDefault();
    $('.window').hide();
  });
}



function abrir_modal(){
  $('#dialog').slideDown(1000).draggable();
}

