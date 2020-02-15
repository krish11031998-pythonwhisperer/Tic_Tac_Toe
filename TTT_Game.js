class players{

  constructor(name, choice="O"){
    this.name = name;
    this.choice = (choice === "X" || choice === "O") ? choice : this.enter_new_choice();
    this.squares =[];
  }

  input(value){
    this.squares.push(value);
  }

  enter_new_choice(){
    var input;
    input = prompt("You have to add a valid choice\nX or 0?");
    return (input === "X" || input === "O") ? input : this.enter_new_choice();
  }
}

class tic_tac_toe{

  constructor(p_1,p_2){
    this.ttt_grid = this.ttt_grid_gen();
    this.winner;
    this.cur_player = p_1;
    this.players = [p_1,p_2]; 
    this.counter = 1;
    this.condition = false;
    this.doc_el = this.grid_doc_objs();
  }



  ttt_grid_gen(){
    var row = [],counter = 1;
    var col = [];
    while (counter <= 9)
    {
      if (counter % 3 != 0)
      {
        col.push(counter);
      }
      else
      {
        col.push(counter);
        row.push(col);
        col = [];
      }
      counter++;
    }
    console.log(row);
    return row;
  }

  find_indices(grid_no){
    var x,y;
    if(grid_no%3 == 0){

      return [(grid_no/3)-1,2];

    }
    else{
      x = Math.floor(grid_no/3);
      y = (grid_no%3) -1;
      return[x,y];
    }
  }

  enter_values(value,grid_no){
    const [x,y] = this.find_indices(grid_no);
    this.ttt_grid[x][y] = value;
    this.condition = this.check_winners(x,y)
  }

  current_player(){
    this.cur_player = (this.counter%2 == 0) ? this.players[1] : this.players[0];
    console.log(`${this.cur_player.name}'s turn [${this.cur_player.choice}]`);
  }
  check_winners(x,y){
    return (this.check_col(y) || this.check_row(x) || this.check_diagonal());
  }

  check_row(index_x){
    var condition = true;
    console.log("RRRRRR ->");
    for(var y = 0; y<2; y++){
      console.log(this.ttt_grid[index_x][y],this.ttt_grid[index_x][y+1]);
      if(this.ttt_grid[index_x][y] != this.ttt_grid[index_x][y+1]){
        condition = false;
        this.winner = undefined;
        return condition;
      }
    }
    this.winner = this.ttt_grid[index_x][0];
    console.log(`Rows -> ${condition}`);
    return condition;
  }

  check_col(index_y){
    var condition = true;
    console.log("CCCCCCCCC ->");
    for(var x=0,y = index_y;x<2;x++){
      console.log(this.ttt_grid[x][y],this.ttt_grid[x+1][y])
      if(this.ttt_grid[x][y] != this.ttt_grid[x+1][y]){
        condition = false;
        this.winner = undefined;
        return condition;
      }
    }
    this.winner = this.ttt_grid[0][index_y];
    console.log(`Cols -> ${condition}`);

    return condition;
  }

  check_diagonal(){
    var condition = true;
    console.log("DDDDDD -> ");
  
    condition  =this.check_diagonal_l() || this.check_diagonal_r();
    console.log(`Diagonals -> ${condition}`);
    return condition;
  }

  check_diagonal_l(){
    var condition = true;
    for(var i=0;i<2;i++){
      if(this.ttt_grid[i][i] != this.ttt_grid[i+1][i+1]){
        condition= false;
        this.winner = undefined;
        return condition;
      }
      else{
        this.winner = this.ttt_grid[i][i];
      }
    }
    console.log(`D_L -> ${condition}`);
    return condition;

  }

  check_diagonal_r(){
    var condition = true;
    for(var j=2;j>0;j--){
      if(this.ttt_grid[2-j][j] != this.ttt_grid[2-(j-1)][j-1]){
        condition = false;
        this.winner = undefined;
        return condition;
      }
      else{
        this.winner = this.ttt_grid[2-j][j];
      }
    }
    console.log(`D_R -> ${condition}`);
    return condition;
  }


  grid_doc_objs(){
    this.grid_b = [];
    this.grid_ev_lis = [];
    this.ttt_grid.forEach(el=> {
      el.forEach(el_el =>{
        this.grid_b.push(document.querySelector('#b_'+el_el));
        this.grid_ev_lis.push(document.querySelector("#b_"+el_el).addEventListener('click',this.grid_entry(el_el,this)));
      });
    });

    this.grid_b.forEach(el => {
      console.log(el);
    });
    this.grid_ev_lis.forEach(el => {
      console.log(el);
    });
  }

  grid_entry(el_el,obj){
    return function(){
      if(!obj.condition && obj.counter<=9){
        console.log(`${obj.cur_player.name} has choosen at position ${el_el}`);
        console.log(`${obj.grid_b[el_el - 1]} and ${el_el}`);
        var box = obj.grid_b[el_el - 1]
        box.innerHTML = (box.innerHTML == "") ? obj.cur_player.choice : box.innerHTML;
        obj.enter_values(obj.cur_player.choice, el_el);
        console.log(`${obj.ttt_grid}`);
        obj.counter+=1;
        obj.current_player();
        console.log("The button was clicked");
        if(obj.condition){
          var name = (obj.players[0].choice == obj.winner) ? obj.players[0].name : obj.players[1].name;
          alert(`${name} is the winner `);
        }
        else if(obj.condition == false && counter==9){
          alert(`No winner :/`);
        }
      }
      else if(obj.condition){
        console.log("Game is over ! reset to play again");
      }
    }
  }
  
}

var main = () =>{
  var inp,inp_choice;
  inp = prompt("Enter the name of the player One!");
  inp_choice = prompt("X or O ?");
  var player_1 = new players(inp,inp_choice);
  inp = prompt("Enter the name of the player Two!");
  var player_2 = new players(inp,(inp_choice == "X")? "O" : "X");
  var ttt = new tic_tac_toe(player_1,player_2);
  console.log(`${player_1.name} will start the game !`);
}

main();
