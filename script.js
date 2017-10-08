$(document).ready(function() {
	
	var field;

	var counter = 0;

	new_game();
	
	var container = document.getElementById("container");

	function render(field) {
		container.innerHTML = "";
		for (var i = 0; i < field.length; i++) {
			if (!(i % difficult) && i > 0) {
				br = document.createElement('br');
				container.appendChild(br);
			}
		elementAdd(i);
		}

		var br = document.createElement('br');
		container.appendChild(br);

		container.style.width = difficult * 30 + "px";
	}

	var elementAdd = function(i) {
		el = document.createElement('div');
		el.className = "cube";
		el.style.position = "absolute";
		el.style.top  = Math.floor(i / difficult) * 30 + "px";
		el.style.left = Math.floor(i % difficult) * 30 + "px";
		el.oncontextmenu = function(e) {
				this.innerHTML = this.innerHTML == "" ? "*" : "";
				return false;
		}
		if (field[i][0] == "*") { el.dataset.mine = true; }
		else { el.dataset.neighboors = field[i][1]; }
		el.addEventListener('click', function(e) {
			this.classList.add("clicked");
			counter += 1;
			if (this.dataset.mine) { 
				this.innerHTML = "*"; 
				gameover();
				return;
			}
			if (counter == (difficult * (difficult - 1))) gameover();
			else { if (this.dataset.neighboors == 0) { 
					this.innerHTML = "";
				} 
				else { this.innerHTML = this.dataset.neighboors; }
			}
			if (this.dataset.neighboors == 0 && (i % difficult) > 0) {
				var event = new Event("click");
				var left = document.getElementsByClassName("cube")[i - 1];
				if (!left.classList.contains("clicked")) left.dispatchEvent(event);
			}
			
			if (this.dataset.neighboors == 0 && i > difficult) {
				var event = new Event("click");
				var top = document.getElementsByClassName("cube")[i - difficult];
				if (!top.classList.contains("clicked")) top.dispatchEvent(event);
			}

			if (this.dataset.neighboors == 0 && (i % difficult) < difficult - 1) {
				var event = new Event("click");
				var right = document.getElementsByClassName("cube")[i + 1];
				if (!right.classList.contains("clicked")) right.dispatchEvent(event);
			}
			
			if (this.dataset.neighboors == 0 && i < (difficult * (difficult - 1))) {
				var event = new Event("click");
				var bottom = document.getElementsByClassName("cube")[i + difficult];
				if (!bottom.classList.contains("clicked")) bottom.dispatchEvent(event);
			}
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
		counter = 0;
		difficult = parseInt(prompt("Сложность", 10), 10);
		if (difficult > 20) {
			alert("Остановись, маньяк!");
			difficult = 20;
		}
		mines_count = Math.floor(Math.pow(difficult - 5, 1.23 + (difficult / 42.5)));
		count.innerHTML = mines_count;

		var mines = [];
		for (var i = 0; i < difficult * difficult; i++) {
			field[i] = ["", 0];
		}
		for (var i = 0; i < difficult * difficult; i++) {
			var j = Math.floor(Math.random() * difficult * difficult);
			if (mines.indexOf(j) < 0) {
				mines[i] = j;
				field[j][0] = "*";
				if (j % difficult > 0) field[j - 1][1] += 1;
				if (j % difficult < difficult - 1) field[j + 1][1] += 1;
				if (j >= difficult) {
					field[j - difficult][1] += 1;
					if ((j - difficult) % difficult > 0) field[j - difficult - 1][1] += 1;
					if ((j - difficult) % difficult < difficult - 1) field[j - difficult + 1][1] += 1;
				}
				if (j <= difficult * (difficult - 1)) {
					field[j + difficult][1] += 1;
					if ((j + difficult) % difficult > 0) field[j + difficult - 1][1] += 1;
					if ((j + difficult) % difficult < difficult - 1) field[j + difficult + 1][1] += 1;
				}
			}
			if (mines.length >= mines_count) break;
		}
	}

	var gameover = function() {	
		var header = document.createElement('h1');
		header.id = "gameover";
		header.style.height = difficult * 30 + "px";		
		header.style.lineHeight = difficult * 15 + "px";
		header.innerHTML = counter == (difficult * difficult - mines_count) ? "You<br>win" : "Game<br>over!";
		container.appendChild(header);
	}
	
});