view = "loginview";
previousView = "";
user = "";

function init() {
     $('#tableview').hide();
     $('#modalview').hide();
     view = "loginview";
}

function changeView(newView) {
     console.log("change view")
     $('#'+view).hide();
     $('#'+newView).show();
     previousView = view;
     view = newView;
}

function closeModal() {
     console.log("close");
     changeView(previousView);
}

////////// AJAX ////////////
function getItems() {
     $.ajax({
       url : '/items',
       method : 'GET',
       success : function (response) {
           console.log(response);
           showItems(response);
       }
   });
}

function getItem(itemID,cb) {
     $.ajax({
       url : '/items/'+itemID,
       method : 'GET',
       success : function (response) {
           console.log(response);
           cb(response);
       }
   });
}

function login() {
     $.ajax({
          url : '/login',
          method : 'POST',
          data : {Username : $('#Username').val(), Password : $('#Password').val()},
          success : function(user) {
               console.log(user);
               user = user.Username;
               changeView('tableview');
          }
     });
}

////////// DOM /////////////

function showItems(res) {
     console.log("displaying items")
     $('#displayTable').empty();
     // $('<tr><th colspan=6></th><th><span class="glyphicon glyphicon-search"></span></th>').appendTo('#displayTable');
     $('<tr>'+
          '<th>#</th>'+
          '<th><input class="form-control" type="text" placeholder="Item" id="ItemName"></th>'+
          '<th><input class="form-control" type="text" placeholder="Class" id="ItemClass"></th>'+
          '<th><input class="form-control" type="number" min="0" max="1000" placeholder="Rupees" id="SellPrice"></th>'+
          '<th><input class="form-control" type="text" placeholder="Effect" id="ItemEffect"></th>'+
          '<th><input class="form-control" type="number" min="0" max="20" step ="0.25" placeholder="HP" id="hp"></th>'+
          '<th><input class="form-control" type="text" placeholder="Dye" id="DyeColor"></th></tr>').appendTo('#displayTable');
     // $('<tr><th>Number</th><th>Item</th><th>Classification</th><th>Rupees</th><th>Effect</th><th>HP</th><th>Dye</th></tr>').appendTo('#displayTable');
     res.forEach( item => {
          console.log(item);
          console.log(JSON.stringify(item));
          $('<tr onclick=showItem('+item.ItemID+')><td>'+item.ItemID+'</td><td>'+item.ItemName+'</td><td>'+item.ItemClass+'</td><td>'+item.SellPrice+'</td><td>'+item.ItemEffect+'</td><td>'+item.hp+'</td><td>'+item.DyeColor+'</td></tr>').appendTo('#displayTable');
     });
}

function showItem(itemID) {
     console.log(itemID);
     getItem(itemID, function (item) {
          changeView("modalview");
          $('#modal').empty();
          $('<tr><th>Number</th><td>' + item.ItemID + '</td></tr>').appendTo('#modal');
          $('<tr><th>Item</th><td>' + item.ItemName + '</td></tr>').appendTo('#modal');
          $('<tr><th>Description</th><td>' + item.ItemDescription +'</td></tr>').appendTo('#modal');
          $('<tr><th>Classification</th><td>' + item.ItemClass + '</td></tr>').appendTo('#modal');
          $('<tr><th>Rupee Value</th><td>' + item.SellPrice + '</td></tr>').appendTo('#modal');
          $('<tr><th>Cooking Effect</th><td>' + item.ItemEffect + '</td></tr>').appendTo('#modal');
          $('<tr><th>HP</th><td>' + item.hp + '</td></tr>').appendTo('#modal');
          $('<tr><th>Dye</th><td>' + item.DyeColor + '</td></tr>').appendTo('#modal');
     });
}
