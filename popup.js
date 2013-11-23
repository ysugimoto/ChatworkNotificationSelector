var roomList = document.getElementById('roomList');
var save     = document.getElementById('save');

chrome.tabs.executeScript(null, {
	"file": "inject.js"
}, function(list) {
	console.log(list);
	var fragment = document.createDocumentFragment(),
		items    = list[0].list,
		saved    = JSON.parse(list[0].saved),
		li,
		input;


	items.forEach(function(item) {
		if ( item ) {
			li = document.createElement('li');
			input = document.createElement('input');
			input.type = 'checkbox';
			input.name = "enable_thread";
			input.value = item;
			li.textContent = item;
			li.appendChild(input);
			fragment.appendChild(li);

			if ( saved.threads.indexOf(item) !== -1 ) {
				li.classList.add('active');
				input.checked = true;
			}
		}
	});

	roomList.appendChild(fragment);
});

roomList.addEventListener('click', function(evt) {
	if ( evt.target.tagName !== "LI" ) {
		return;
	}

	var chk = evt.target.querySelector('input');

	chk.checked = !chk.checked;
	evt.target.classList.toggle('active');

}, false);

save.addEventListener('click', function(evt) {
	var chks = roomList.getElementsByTagName('input'),
		dat  = {threads: []},
		btn  = this;

	[].forEach.call(chks, function(c) {
		if ( c.checked === true ) {
			dat.threads.push(c.value);
		}
	});

	console.log(JSON.stringify(dat));

	chrome.tabs.executeScript(null, {
		"code": "localStorage.setItem('CWEXTENSION_DESKTOP_NOTIFICATIONS_LIST', '" + JSON.stringify(dat) + "');"
	}, function() {
		btn.textContent = 'saved!!';
		setTimeout(function() {
			btn.textContent = 'save';
		}, 3000);
	});
});

