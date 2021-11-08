
$(document).ready(function() {

    $('input[name=searchterm]').on("keyup",function (e) {
            e.preventDefault();
            $("#suggestion").empty();
            var search_term = $(this).val();
            $.ajax(
                {
                    type: 'POST',
                    url: 'http://127.0.0.1:5000/search/fuzzy_search',
                    data: JSON.stringify(search_term),
                    contentType: "application/json; charset=utf-8",
                    traditional: true,
                    success: function (response) {

                        var tmp = response['movie_title']
                        if(tmp){
                            setTimeout(function() {
                                $("#suggestion ").append($("<li>").text(tmp)).show();  
                            }, 100);
                        }                           
                    }
                });
            
        });


    $(document).mouseup(function(e) 
    {
        var container = $('#suggestion');
        var container2 = $('input[name=searchterm]')
    
        if (!container.is(e.target) && container.has(e.target).length === 0 && !container2.is(e.target)) 
        {
            container.hide();
            container.empty();
        }
    });    

    $('#suggestion').focusout(function() { 
        $('#suggestion *').hide();
        $('#suggestion').empty();

    });

    $('input[name=searchterm]').click(function() { 
        $('#suggestion').show();

    });


    $('#suggestion').on("click",'li',function(){
        var mytext = $(this).text();
        $('input[name=searchterm]').val(mytext)
        $('#suggestion *').hide();
        $('#suggestion').empty();
    });

});