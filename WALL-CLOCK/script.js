var time = {
	/* all the properties, then the methods */
	col: [ 'wCirR', 'wCirO', 'wCirY', 'wCirG', 'wCirB', 'wCirP' ],
	dat: undefined,
	glow: undefined,
	glowC: [ 'glowyR', 'glowyO', 'glowyY', 'glowyG', 'glowyB', 'glowyP' ],
	hex: undefined,
	middle: undefined,
	midC: [ 'midlR', 'midlO', 'midlY', 'midlG', 'midlB', 'midlP' ],
	outer: undefined,
	outC: [ 'outrR', 'outrO', 'outrY', 'outrG', 'outrB', 'outrP' ],
	tris: undefined,
	wCir: undefined,
	getTime: function() {
		this.dat = new Date(); /* gets current date */
		/* rotation calculations */
		var hours = (this.dat.getHours() - 3 + this.dat.getMinutes() / 60) * 30;
		var minute = (this.dat.getMinutes() - 15 + this.dat.getSeconds() / 60) * 6;
		var sec = (this.dat.getSeconds() - 15) * 6;
		/* setting initial rotation of clock hands, and adding CSS animation which handle rotating hands */
		document.getElementById('hourBar').style.transform = 'rotate(' + hours + 'deg)';
		document.getElementById('houBarIn').classList.add('hourRot');
		document.getElementById('minuteBar').style.transform = 'rotate(' + minute + 'deg)';
		document.getElementById('minBarIn').classList.add('minRot');
		document.getElementById('secondBar').style.transform = 'rotate(' + sec + 'deg)';
		document.getElementById('secBarIn').classList.add('secRot');
		/* sets interval to be called every second after starting animation finishes*/
		setTimeout(function() {
			setInterval(time.triRot, 1000);
		}, 3000);
	},
	/* removes classes matching an expression from classList */
	prune: function(list, tExp) {
		for (p = 0; p < list.length; p++) {
			if (tExp.test(list[p])) {
				list.remove(list[p]);
				p--;
			}
		}
	},

	triRot: function() {
		time.dat = new Date(); /* updates date every second */
		var secs = time.dat.getSeconds();
		setTimeout(function() {
			time.tris[secs].classList.remove('rot', 'rot2');
		}, 820);
		/* changes colors every 10 seconds depending on current time */
		if (secs % 10 == 0) {
			var num = Math.floor(secs / 10);
			time.prune(time.wCir.classList, /^wCir/);
			time.wCir.classList.add(time.col[num]);
			time.prune(time.hex.classList, /^wCir/);
			time.hex.classList.add(time.col[num]);
			time.prune(time.glow.classList, /^glowy/);
			time.glow.classList.add(time.glowC[num]);
			time.prune(time.middle.classList, /^midl/);
			time.middle.classList.add(time.midC[num]);
			time.prune(time.outer.classList, /^outr/);
			time.outer.classList.add(time.outC[num]);
		}
		/* slicing off last digit of secs variable */
		var getSec = parseInt(secs.toString().slice(-1), 10);
		/* figuring out which rotate class to add based on current digit */
		if (getSec == 4) {
			for (i = secs - 4; i < secs + 1; i++) {
				if (i % 2) {
					time.tris[i].classList.add('rot2');
				} else {
					time.tris[i].classList.add('rot');
				}
			}
			setTimeout(function() {
				for (i = secs - 4; i < secs + 2; i++) {
					time.tris[i].classList.remove('rot', 'rot2');
				}
			}, 820);
		} else if (getSec == 9) {
			for (i = secs - 4; i < secs + 1; i++) {
				if (i % 2) {
					time.tris[i].classList.add('rot');
				} else {
					time.tris[i].classList.add('rot2');
				}
			}
			setTimeout(function() {
				for (i = secs - 4; i < secs + 2; i++) {
					time.tris[i].classList.remove('rot', 'rot2');
				}
			}, 820);
		} else if (getSec >= 5 && getSec <= 8) {
			if (secs % 2) {
				time.tris[secs].classList.add('rot');
			} else {
				time.tris[secs].classList.add('rot2');
			}
		} else if (getSec >= 0 && getSec <= 3) {
			if (secs % 2) {
				time.tris[secs].classList.add('rot2');
			} else {
				time.tris[secs].classList.add('rot');
			}
		}
	}
};

function init() {
	/* grabbing elements for time object */
	time.tris = document.getElementsByClassName('tri1');
	time.wCir = document.getElementById('whiteCircle');
	time.glow = document.getElementById('glow');
	time.middle = document.getElementById('middleRing');
	time.outer = document.getElementById('outerRing');
	time.hex = document.getElementById('hex3');
	/* sets starting function */
	time.getTime();
}

window.onload = init;
