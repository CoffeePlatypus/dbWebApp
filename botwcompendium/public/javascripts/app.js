
function getItems() {
     $.ajax({
       url : '/items',
       method : 'GET',
       success : function (response) {
           console.log(response);
       }
   });
}
