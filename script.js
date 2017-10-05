$(document).ready(function() {
	
	var field;
	
	new_game();
	
	var container = document.getElementById("container");

	function render(field) {
		container.innerHTML = "";
		for (var i = 0; i < field.length; i++) {
			if (!(i % 10) && i > 0) {
				br = document.createElement('br');
				container.appendChild(br);
			}
		elementAdd(i);
	  }
	}

	var gameover = function() {
	}

	var elementAdd = function(i) {
		el = document.createElement('div');
		el.innerHTML = "<span id='span" + i + "'>" + field[i][0] + "</span>";
		el.dataset.mines = field[i][1];
		el.className = "cube";
		el.style.position = "absolute";
		el.style.top  = Math.floor(i / 10) * 30 + "px";
		el.style.left = Math.floor(i % 10) * 30 + "px";
		if(!(gameover(field)))
		el.addEventListener('click', function(e) {
			this.style.backgroundColor = "#ffcc55";
			this.style.background = "linear-gradient(to top right, #157, #49b)";
			this.innerHTML = field[i][1];
		});
		container.appendChild(el);
		$('#cube' + i).on('click', function(){
			$('#span' + i).effect('shake', {times: 2}, 500);
		});
	}

	container.onclick = render(field);
	
	newgame.onclick = function(e) {
		new_game();
		render(field);
	}
	
	function new_game() { 
		field = [];
		var mines = [];
		for (var i = 0; i < 100; i++) {
			field[i] = ["", 0];
		}
		for (var i = 0; i < 100; i++) {
			var j = Math.floor(Math.random() * 100);
			if (mines.indexOf(j) < 0) {
				mines[i] = j;
				field[j][0] = "*";
				
				// Добавление соседей - доработать и вынести в функцию
				field[j - 1][1] += 1;
				field[j + 1][1] += 1;
			}
			if (mines.length >= 10) break;
		}
	}
	
});