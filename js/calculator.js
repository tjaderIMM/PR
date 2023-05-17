(function () {
	const bootonMenu = '<br><div class="d-flex justify-content-between remove-js" ><button class="btn btn-secondary btn-lg active" id="remove">Wyczyść<img src="./img/x.png" alt="" class="img-fluid"></button><button class="btn btn-secondary btn-lg active copy" id="copy">Skopiuj<img src="./img/copy-icon.png" alt="" class="img-fluid"></button></div>'
	const k1524 = 1788347; // 22 r. 1870700 
	const m1524 = 1870519; // 22 r. 1960700

	const k2539 = 3973005; // 22 r. 4266800
	const m2539 = 4093272; // 22 r. 4390700

	const k4054 = 4119140; // 22 r. 3939000
	const m4054 = 4141270; // 22 r. 3960600

	const k55 = 6812597; // 22 r. 6873800
	const m55 = 5166554; // 22 r. 5232500

	const allAgeInput = $('#all-age');
	const fInput = $('#1524_age');
	const sInput = $('#2539_age');
	const tInput = $('#4054_age');
	const lInput = $('#55_age');

	const allSexInput = $('#all-sex');
	const womenInput = $('#women');
	const menInput = $('#men');

	function updateAgeMainCheckbox() {
		var fchecked = fInput.prop('checked');
		var schecked = sInput.prop('checked');
		var tchecked = tInput.prop('checked');
		var lchecked = lInput.prop('checked');

		if (fchecked && schecked && tchecked && lchecked) {
			allAgeInput.prop('checked', true);
		} else {
			allAgeInput.prop('checked', false);
		};
	};





	function updateSexMainCheckbox() {
		var wchecked = womenInput.prop('checked');
		var mchecked = menInput.prop('checked');

		if (wchecked && mchecked) {
			allSexInput.prop('checked', true);
		} else {
			allSexInput.prop('checked', false);
		};
	};

	fInput.change(function () {
		updateAgeMainCheckbox();
	});

	sInput.change(function () {
		updateAgeMainCheckbox();
	});

	tInput.change(function () {
		updateAgeMainCheckbox();
	});

	lInput.change(function () {
		updateAgeMainCheckbox();
	});

	womenInput.change(function () {
		updateSexMainCheckbox();
	});

	menInput.change(function () {
		updateSexMainCheckbox();
	});

	function getNumberOfPeople() {
		var result = 0;

		var all = allSexInput.prop('checked');
		var women = womenInput.prop('checked');
		var men = menInput.prop('checked');

		var allAge = allAgeInput.prop('checked')

		if (fInput.prop('checked') || allAge) {
			if (women) {
				result += k1524;
			};
			if (men) {
				result += m1524;
			};
			if (all) {
				result += k1524;
				result += m1524;
			};
		};

		if (sInput.prop('checked') || allAge) {
			if (women) {
				result += k2539;
			};
			if (men) {
				result += m2539;
			};
			if (all) {
				result += k2539;
				result += m2539;
			};
		};

		if (tInput.prop('checked') || allAge) {
			if (women) {
				result += k4054;
			};
			if (men) {
				result += m4054;
			};
			if (all) {
				result += k4054;
				result += m4054;
			};
		};

		if (lInput.prop('checked') || allAge) {
			if (women) {
				result += k55;
			};
			if (men) {
				result += m55;
			};
			if (all) {
				result += k55;
				result += m55;
			};
		};

		return result;
	};

	function getAgeText() {
		if (allAgeInput.prop('checked')) {
			return ' od 15 roku życia ';
		} else if (fInput.prop('checked')) {
			return ' od 15 do 24 lat ';
		} else if (sInput.prop('checked')) {
			return ' od 25 do 39 lat ';
		} else if (tInput.prop('checked')) {
			return ' od 40 do 54 lat ';
		} else if (lInput.prop('checked')) {
			return ' od 55 roku życia ';
		};
	};

	$('#calculator-btn').click(function () {
		var messageCtn = $('#calculator-msg #msg');

		var achecked = allAgeInput.prop('checked');
		var fchecked = fInput.prop('checked');
		var schecked = sInput.prop('checked');
		var tchecked = tInput.prop('checked');
		var lchecked = lInput.prop('checked');

		if (!achecked && !fchecked && !schecked && !tchecked && !lchecked) {
			$('#calculator-msg').addClass('error');
			messageCtn.hide().html('Nie wybrano wieku.').fadeIn('slow');
			return;
		};

		var aschecked = allSexInput.prop('checked');
		var wchecked = womenInput.prop('checked');
		var mchecked = menInput.prop('checked');

		if (!aschecked && !wchecked && !mchecked) {
			$('#calculator-msg').addClass('error');
			messageCtn.hide().html('Nie wybrano płci.').fadeIn('slow');
			return;
		};

		// remove white spaces and non breaking spaces
		var val = $('#calculator-input').val().replace(/ /g, '').replace(/\s/g, '');
		var regex = /^(\s*[0-9]+\s*)+$/;

		var valid = regex.test(val);

		//var messageResult = $('#calculator-msg #result');

		if (!valid) {
			$('#calculator-msg').addClass('error');
			//messageResult.hide().text('').fadeIn('slow');
			messageCtn.hide().html('Wprowadzona wartość jest nieprawidłowa.').fadeIn('slow');
		} else {
			$('#calculator-msg').removeClass('error');

			var count = getNumberOfPeople();

			var result = (val / count);
			//messageResult.hide().text("Wynik: " + result.toFixed(2)).fadeIn('slow');

			var text = '';
			var person_i18n = aschecked ? 'osoba' : (mchecked ? 'mężczyzna' : 'kobieta');

			if (Math.round(result) < 1) {
				text = (mchecked ? ' Statystyczny ' : ' Statystyczna ') + person_i18n + ' w wieku' + getAgeText() + 'w badanym okresie<br>' + (mchecked ? ' mógł ' : ' mogła ') + 'mieć kontakt z informacją o kampanii.' + '<br><b>średnio ' + parseInt(Math.round(count / val)) + ' raz[y]</b><br>w okresie, którego dotyczy podany zasięg. ' + bootonMenu;
			} else {
				text = (mchecked ? 'Statystyczny ' : 'Statystyczna ') + person_i18n + ' w wieku' + getAgeText() + 'w badanym okresie<br>' + (mchecked ? ' mógł ' : ' mogła ') + 'mieć kontakt z informacją o kampanii <b>średnio' + Math.round(result) + '</b> raz[y]<br>w okresie, którego dotyczy podany zasięg. ' + bootonMenu;
			};

			messageCtn.hide().html(text).fadeIn('slow');
		};
		document.querySelector('#copy').onclick = function () {

			let text = document.getElementById('msg').innerHTML.slice(0,document.getElementById('msg').innerHTML.search('zasięg.')+7) ;
			text =text.replace(/(<([^>]+)>)/gi, "");
			navigator.clipboard.writeText(text);
					
		}

		document.querySelector('#remove').onclick = function () {
			var copyText = document.getElementById("calculator-input");
			copyText.value = '';
		};


	});

	$('#calculator-input').on('paste', function () {
		var element = this;
		setTimeout(function () {
			var text = $(element).val();

			$(element).val(text.replace(/\s/g, ' '));
		}, 10);
	});
}());