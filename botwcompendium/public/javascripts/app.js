view = "loginview";
previousView = "";
userID = "";

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

function getInventory() {
     $.ajax({
          url: '/inventory/'+ userID,
          method : 'GET',
          success : function(response) {
               console.log(response);
               showInventory(response);
          }
     });
}

function addToInventory(itemID) {
     console.log($('#addAmount').val());
     $.ajax({
          url : '/inventory/' + userID + '/' + itemID,
          method : 'POST',
          data : {amount : $('#addAmount').val()},
          success : function(response) {
               console.log(response);

          }
     });
}

function createGoal(itemID) {
     $.ajax({
          url : '/goals/' + userID + '/' + itemID,
          method : 'POST',
          data : {amount : $('#goalAmount').val()},
          success : function(response) {
               console.log(response);

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
               userID = user.Username;
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
          '<th><span class="glyphicon glyphicon-search"></span></th>'+
          '<th><input class="form-control" type="text" placeholder="Item" id="ItemName"></th>'+
          '<th><input class="form-control" type="text" placeholder="Class" id="ItemClass"></th>'+
          '<th><input class="form-control" type="number" min="0" max="1000" placeholder="Rupees" id="SellPrice"></th>'+
          '<th><input class="form-control" type="text" placeholder="Effect" id="ItemEffect"></th>'+
          '<th><input class="form-control" type="number" min="0" max="20" step ="0.25" placeholder="HP" id="hp"></th>'+
          '<th><input class="form-control" type="text" placeholder="Dye" id="DyeColor"></th></tr>').appendTo('#displayTable');
     // $('<tr><th>Number</th><th>Item</th><th>Classification</th><th>Rupees</th><th>Effect</th><th>HP</th><th>Dye</th></tr>').appendTo('#displayTable');
     res.forEach( item => {
          console.log(item);
          $('<tr onclick=showItem('+item.ItemID+')><td>'+item.ItemID+'</td><td>'+item.ItemName+'</td><td>'+item.ItemClass+'</td><td>'+item.SellPrice+'</td><td>'+item.ItemEffect+'</td><td>'+item.hp+'</td><td>'+item.DyeColor+'</td></tr>').appendTo('#displayTable');
     });
}

function showInventory(res) {
     console.log("displaying inentory")
     $('#displayTable').empty();
     // $('<tr><th colspan=6></th><th><span class="glyphicon glyphicon-search"></span></th>').appendTo('#displayTable');
     $('<tr>'+
          '<th><span class="glyphicon glyphicon-search"></span></th>'+
          '<th><input class="form-control" type="text" placeholder="Item" id="ItemName"></th>'+
          '<th><input class="form-control" type="text" placeholder="Class" id="ItemClass"></th>'+
          '<th><input class="form-control" type="number" min="0" max="1000" placeholder="Rupees" id="SellPrice"></th>'+
          '<th>Amount</th></tr>').appendTo('#displayTable');
     // $('<tr><th>Number</th><th>Item</th><th>Classification</th><th>Rupees</th><th>Effect</th><th>HP</th><th>Dye</th></tr>').appendTo('#displayTable');
     res.forEach( item => {
          console.log(item);
          $('<tr onclick=showItem('+item.ItemID+')><td>'+item.ItemID+'</td><td>'+item.ItemName+'</td><td>'+item.ItemClass+'</td><td>'+item.SellPrice+'</td><td>'+item.Amount+'</td></tr>').appendTo('#displayTable');
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
          $('<tr><th colspan="2"><hr></th></tr>').appendTo('#modal');
          $('<tr><th colspan="2">Inventory</th></tr>').appendTo('#modal');
          $('<tr><th>Add to Inventory</th><td><input class="form-control" type="number" min="0" max="1000" placeholder="Add Amount" id="addAmount"></td></tr>').appendTo('#modal');
          $('<tr><td></td><td><button class="btn btn-success float-right" onclick="addToInventory('+item.ItemID+')">Add</button></td></tr>').appendTo('#modal');
          $('<tr><th colspan="2"><hr></th></tr>').appendTo('#modal');
          $('<tr><th colspan="2">Goal</th></tr>').appendTo('#modal');
          $('<tr><th>Goal Amount</th><td><input class="form-control" type="number" min="0" max="1000" placeholder="Goal Amount" id="goalAmount"></td></tr>').appendTo('#modal');
          $('<tr><td></td><td><button class="btn btn-success float-right" onclick="createGoal('+item.ItemID+')">Create Goal</button></td></tr>').appendTo('#modal');
     });
}
