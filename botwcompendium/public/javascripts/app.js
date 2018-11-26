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
          data : {query : ""},
          success : function (response) {
             console.log(response);
             showItems(response);
          }
     });
}

function searchItems(){
     query = {  ItemName : $('#ItemName').val(),
               ItemClass : $('#ItemClass').val(),
               SellPrice : $('#SellPrice').val(),
               ItemEffect : $('#ItemEffect').val(),
               DyeColor : $('#DyeColor').val(),
               hp : $('#hp').val()};
     console.log(query);
     query = JSON.stringify(query);
     console.log(query)
     $.ajax({
          url : '/items',
          method : 'GET',
          data : {  query : query },
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

function getCreatures() {
     $.ajax({
          url: '/creatures',
          method : 'GET',
          success : function(response) {
               console.log(response);
               showCreatures(response);
          }
     });
}

function getCreature(cid, cb) {
     $.ajax({
       url : '/creatures/'+cid,
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

function getGoals() {
     $.ajax({
          url: '/goals/'+ userID,
          method : 'GET',
          success : function(response) {
               console.log(response);
               showGoals(response);
          }
     });
}

function createGoal(itemID) {
     console.log("creating goal");
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
          '<th><button class="btn btn-success" onclick="searchItems()"><i class="material-icons">search</i></button></th>'+
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
          '<th><button class="btn btn-success" onclick="searchInventory()"><i class="material-icons">search</i></button></span></th>'+
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

function showCreatures(res) {
     console.log("displaying creatues");
     $('#displayTable').empty();
     $('<tr>'+
          '<th><button class="btn btn-success" onclick="searchCreatures()><i class="material-icons">search</i></button></th>'+
          '<th><input class="form-control" type="text" placeholder="Creature" id="CreatureName"></th></tr>').appendTo('#displayTable');
     res.forEach( creature => {
          console.log(creature);
          $('<tr onclick=showCreature('+creature.CreatureID+')><td>'+creature.CreatureID+'</td><td>'+creature.CreatureName+'</td></tr>').appendTo('#displayTable');
     });
}

function showCreature(id) {
     getCreature(id, function(creature){
          console.log("got creature");
          console.log(creature);
          changeView("modalview");
          $('#modal').empty();
          $('<tr><th>Number</th><td>' + creature.CreatureID + '</td></tr>').appendTo('#modal');
          $('<tr><th>Creature</th><td>' + creature.CreatureName + '</td></tr>').appendTo('#modal');
          $('<tr><th>Description</th><td>' + creature.CreatureDescription +'</td></tr>').appendTo('#modal');
          if(creature.Drops.length != 0 ) {
               $('<tr><th>Drops</th><td></td></tr>').appendTo('#modal');
               creature.Drops.forEach(x=>{
                    $('<tr><th></th><td>'+x+'</td></tr>').appendTo('#modal');
               });
          }else{
               $('<tr><th>Drops</th><td>Nothing</td></tr>').appendTo('#modal');
          }
          if(creature.Locations.length != 0) {
               $('<tr><th>Locations</th><td></td></tr>').appendTo('#modal');
               creature.Locations.forEach(x=>{
                    $('<tr><th></th><td>'+x+'</td></tr>').appendTo('#modal');
               });
          }else{
               $('<tr><th>Locations</th><td>Somewhere in Hyrule</td></tr>').appendTo('#modal');
          }
     });
}

function showGoals(res) {
     console.log("displaying inentory");
     $('#displayTable').empty();
     $('<tr>'+
          '<th><button class="btn btn-success" onclick="searchGoals()><i class="material-icons">search</i></button></th>'+
          '<th><input class="form-control" type="text" placeholder="Item" id="ItemName"></th>'+
          '<th>Target Amount</th>'+
          '<th>Status</th></tr>').appendTo('#displayTable');
     res.forEach( item => {
          console.log(item);
          $('<tr onclick=showItem('+item.ItemID+')><td>'+item.ItemID+'</td><td>'+item.ItemName+'</td><td>'+item.TargetAmount+'</td><td>'+item.Status+'</td></tr>').appendTo('#displayTable');
     });
}

function showItem(itemID) {
     console.log(itemID);
     getItem(itemID, function (item) {
          console.log(item);
          changeView("modalview");
          $('#modal').empty();
          $('<tr><th>Number</th><td>' + item[0].ItemID + '</td></tr>').appendTo('#modal');
          $('<tr><th>Item</th><td>' + item[0].ItemName + '</td></tr>').appendTo('#modal');
          $('<tr><th>Description</th><td>' + item[0].ItemDescription +'</td></tr>').appendTo('#modal');
          $('<tr><th>Classification</th><td>' + item[0].ItemClass + '</td></tr>').appendTo('#modal');
          $('<tr><th>Rupee Value</th><td>' + item[0].SellPrice + '</td></tr>').appendTo('#modal');
          $('<tr><th>Cooking Effect</th><td>' + item[0].ItemEffect + '</td></tr>').appendTo('#modal');
          $('<tr><th>HP</th><td>' + item[0].hp + '</td></tr>').appendTo('#modal');
          $('<tr><th>Dye</th><td>' + item[0].DyeColor + '</td></tr>').appendTo('#modal');
          $('<tr><th>Drops From</th><td></td></tr>').appendTo('#modal');
          item.forEach(x=>{
               $('<tr><th></th><td>'+x.CreatureName+'</td></tr>').appendTo('#modal');
          });
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
