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
		el.className = "cube";
		el.style.position = "absolute";
		el.style.top  = Math.floor(i / 10) * 30 + "px";
		el.style.left = Math.floor(i % 10) * 30 + "px";
		if (field[i][0] == "*") { el.dataset.mine = true; }
		else { el.dataset.neighboors = field[i][1]; }
		if(!(gameover(field)))
		el.addEventListener('click', function(e) {
			this.classList.add("clicked");
			if (this.dataset.mine) { this.innerHTML = "*"; }
			else { if (this.dataset.neighboors == 0) { 
					this.innerHTML = "";
				} 
				else { this.innerHTML = this.dataset.neighboors; }
			}
			if (this.dataset.neighboors == 0 && (i % 10) > 0) {
				var event = new Event("click");
				var left = document.getElementsByClassName("cube")[i - 1];
				if (!left.classList.contains("clicked")) left.dispatchEvent(event);
			}
			
			if (this.dataset.neighboors == 0 && i > 10) {
				var event = new Event("click");
				var top = document.getElementsByClassName("cube")[i - 10];
				if (!top.classList.contains("clicked")) top.dispatchEvent(event);
			}

			if (this.dataset.neighboors == 0 && (i % 10) < 9) {
				var event = new Event("click");
				var right = document.getElementsByClassName("cube")[i + 1];
				if (!right.classList.contains("clicked")) right.dispatchEvent(event);
			}
			
			if (this.dataset.neighboors == 0 && i < (100 - 10)) {
				var event = new Event("click");
				var bottom = document.getElementsByClassName("cube")[i + 10];
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
				if (j % 10 > 0) field[j - 1][1] += 1;
				if (j % 10 < 9) field[j + 1][1] += 1;
				if (j >= 10) {
					field[j - 10][1] += 1;
					if ((j - 10) % 10 > 0) field[j - 10 - 1][1] += 1;
					if ((j - 10) % 10 < 9) field[j - 10 + 1][1] += 1;
				}
				if (j <= 100 - 10) {
					field[j + 10][1] += 1;
					if ((j + 10) % 10 > 0) field[j + 10 - 1][1] += 1;
					if ((j + 10) % 10 < 9) field[j + 10 + 1][1] += 1;
				}
			}
			if (mines.length >= 10) break;
		}
	}
	
});


		/*var cubes = document.getElementsByClassName("cube");
		var event = new Event("click");
		for (var k = 0; k < cubes.length; k++) {
			cubes[k].addEventListener('click', function(e) {
				if (this.dataset.neighboors == "0") {
					this.nextSibling.dispatchEvent(event);
					this.previousSibling.dispatchEvent(event);
				}
			});*/
		//	var left  = document.getElementsByClassName("cube")[i - 1];
		//	var right = document.getElementsByClassName("cube")[i + 1]; 
		//	if ((i % 10) > 0)  left.dispatchEvent(event);
		//	if ((i % 10) < 9) right.dispatchEvent(event);