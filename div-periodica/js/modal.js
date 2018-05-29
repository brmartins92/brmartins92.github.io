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

        var link = 'https://div-periodica.herokuapp.com/scrape/'+elemento;
        var request = $.ajax({
            url: link,
            method: "get",
            data: { elemento : elemento },
            dataType: "json"
        });

        request.done(function( json ) {
            $('#modal_img').html("<img src='"+json['img'].src+"' id='img_modal'>");
            $.each(json, function (key, data) {
                if(key != 'img'){
                    $('#info').append("\
                        <label class='lbinfo'>\
                            <legend>"+json[key].titulo+"</legend>\
                            <input type='text' class='lbinfo' id='modal_num_atomico' value="+json[key].dado+">\
                        </label>\
                    ");
                }
            })
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

