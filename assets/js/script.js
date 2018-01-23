var start = document.getElementById('start');

start.addEventListener('submit', init);

var linesState = {
  	lines: [
	    {id: 0, name: 'Start', disks: [], level: 20, coord: {x: 100, y: 400, w: 200, h: 200}},
	    {id: 1, name: 'End', disks: [], level: 20, coord: {x: 300, y: 400, w: 200, h: 200}},
	    {id: 2, name: 'Aux', disks: [], level: 20, coord: {x: 500, y: 400, w: 200, h: 200}}
  	]
}

function drawLines() {
	ctx.fillStyle = '#d1e0ff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.lineWidth = 8;
	linesState.lines.forEach(line => {
		ctx.moveTo(line.coord.x, line.coord.y);
	    ctx.lineTo(line.coord.x + line.coord.w, line.coord.y);
	    ctx.moveTo(line.coord.x + 100, line.coord.y);
	    ctx.lineTo(line.coord.x + 100, line.coord.y - line.coord.h);

	    ctx.fillStyle = 'black';
	    ctx.font = '20px Helvetica, Arial, sans-serif';
	    ctx.textAlign = 'center';
	    ctx.fillText(line.name, line.coord.x + 100, line.coord.y + 40);
	});

	ctx.stroke();
}

function Disk(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

Disk.prototype.draw = function() {
	ctx.fillStyle = this.color;
  	ctx.lineWidth = 1;
  	ctx.fillRect(this.x, this.y, this.width, this.height);
  	ctx.strokeRect(this.x, this.y, this.width, this.height);
};

function initDisks(n) {
	var line = linesState.lines[0].coord;
 	var colors = ['#aa1414', '#ce1414', '#f74545', '#f7a145', '#c5e56b', '#5bff0a', '#28ede9', '#84c5ff', '#2295f9', '#5f22f9'];
  	var width = 20 * n;
  	
  	for(var i = n; i > 0; i--) {
    	let disk = new Disk((line.w / 2 + (line.w - width) / 2), line.y - linesState.lines[0].level, width, line.h / 10, colors[i - 1]);
    	linesState.lines[0].disks.push(disk);
    	linesState.lines[0].level += line.h / 10;
    	width -= 20;
  	}
}

function drawDisks(state) {
	state.lines.forEach(function(line) {
    	line.disks.forEach(function(disk) {
        	disk.draw();
    	});
  	});
}

var delay = 1;

function moveDisk(from, to) {
	setTimeout(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
      	var movingDisk = from.disks.pop();
      	movingDisk.x += (to.id - from.id) * 200;
      	movingDisk.y = 400 - to.level;
      	to.disks.push(movingDisk);
      	from.level -= 20;
      	to.level += 20;
      	drawLines();
      	drawDisks(linesState);
    }, 1000 * delay);
    
    delay++;
}

function hanoi(n, from, to, aux) {
	if (n >= 1) {
		hanoi(n - 1, from, aux, to);
		moveDisk(from, to);
		hanoi(n - 1, aux, to, from);
	}
}

function init(e) {
	e.preventDefault();
	var num = 3;
	menu.style.display = 'none';
	canvas.style.display = 'block';
	canvas = document.getElementById('canvas');
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
	ctx = canvas.getContext('2d');
	initDisks(num);
	hanoi(num, ...linesState.lines);
}