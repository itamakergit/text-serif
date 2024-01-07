//
function strtr(e, t, n) {
    var r = "",
        i = 0,
        s = 0,
        o = 0,
        u = 0,
        a = false,
        f = "",
        l = "",
        c = "";
    var h = [];
    var p = [];
    var d = "";
    var v = false;
    if (typeof t === "object") {
        for (r in t) {
            if (t.hasOwnProperty(r)) {
                h.push(r);
                p.push(t[r])
            }
        }
        t = h;
        n = p
    }
    o = e.length;
    u = t.length;
    f = typeof t === "string";
    l = typeof n === "string";
    for (i = 0; i < o; i++) {
        v = false;
        if (f) {
            c = e.charAt(i);
            for (s = 0; s < u; s++) {
                if (c == t.charAt(s)) {
                    v = true;
                    break
                }
            }
        } else {
            for (s = 0; s < u; s++) {
                if (e.substr(i, t[s].length) == t[s]) {
                    v = true;
                    i = i + t[s].length - 1;
                    break
                }
            }
        }
        if (v) {
            d += l ? n.charAt(s) : n[s]
        } else {
            d += e.charAt(i)
        }
    }
    return d
}

function cardCreate(textout, fontName) {
	var outDiv = document.createElement('div');
	outDiv.className = 'row';
	var colDiv = document.createElement('div');
	colDiv.className = 'col';
	outDiv.appendChild(colDiv);
	var cardDiv = document.createElement('div');
	cardDiv.className = 'card mb-3';
	colDiv.appendChild(cardDiv);
	var cardBodyDiv = document.createElement('div');
	cardBodyDiv.className = 'card-body';
	cardDiv.appendChild(cardBodyDiv);
	var outputDiv = document.createElement('div');
	outputDiv.className = 'output';
	outputDiv.setAttribute("contenteditable", true);
	outputDiv.setAttribute("spellcheck", false);
	var fontId = 'font-' + fontName;

	outputDiv.id = fontId;
	// 
	outputDiv.innerHTML += textout;
	cardBodyDiv.appendChild(outputDiv);
	var dflexDiv = document.createElement('div');
	dflexDiv.className = 'd-flex mt-1';
	cardBodyDiv.appendChild(dflexDiv);
	var fontDiv = document.createElement('div');
	fontDiv.className = 'text-secondary my-auto';
	dflexDiv.appendChild(fontDiv);
	// 
	fontDiv.innerHTML += "<small>"+fontName+"</small>";
	var copyDiv = document.createElement('div');
	copyDiv.className = 'ml-auto';
	dflexDiv.appendChild(copyDiv);
	var copyDiv2 = document.createElement('div');
	copyDiv2.className = 'btn btncopy btn-outline-dark';
	// 
	copyDiv2.innerHTML += "Copy";
	copyDiv2.setAttribute("data-id", fontId);

	copyDiv.appendChild(copyDiv2);
	document.getElementById('outcont').appendChild(outDiv);

	copyDiv2.addEventListener('click', function(event) {
		copyClipboard(this);
	});

}

function strtrtr(textin) {
	for (var font in fonts) {
	    var tmp = fonts[font]['id'];
	    textout = textin;
	    textout = strtr(textout, arrayReplace[tmp]);
	    fontName = fonts[font]['name']
	    cardCreate(textout, fontName)
	}
}

function fontirise(){
  document.getElementById("outcont").innerHTML = ""
  let input = document.getElementById("textIn");
  var textin = input.value;
  // console.log(textin);
  textin = strtr(textin, GreekCyrillicChars["1"]);
  strtrtr(textin.normalize('NFD'));
  // console.log(textout);
}

// Copy div content
function copyClipboard(button) {
  var detectFont = button.getAttribute('data-id');
  // console.log(detectFont);
  var elm = document.getElementById(detectFont);
  // for Internet Explorer
  if(document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(elm);
    range.select();
    document.execCommand("Copy");
  }
  else if(window.getSelection) {
    // other browsers
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
  }
  //button change text
  button.innerHTML = "✅Copied";

  setTimeout(function() {
	  button.innerHTML = "Copy";
	}, 1000);
}
