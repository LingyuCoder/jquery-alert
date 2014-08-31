jQuery(function() {
	var defaultConfig = {
		content: '',
		modal: false,
		fixed: false,
		css: {
			panel: 'wd-ui-pn',
			content: 'wd-ui-ctn',
			footer: 'wd-ui-ft',
			close: 'wd-ui-close'
		},
		close: function(){},
		closeText: 'close',
		width: 300,
		open: function() {}
	};
	var defaultConfirmConfig = {
		okText: 'ok',
		css: {
			ok: 'wd-ui-ok',
		},
		ok: function() {},
	};
	var defaultPromptConfig = {
		defaultValue: '',
		remind: '',
		css: {
			input: 'wd-ui-ipt',
		},
	};
	var $ = jQuery;

	function initConfirm($widget, config){
		var css = config.css;
		var $ft = $widget.find('.wd-ft');
		var $ok = $('<button class="wd-ok">' + config.okText + '</button>');
		$ok.addClass(css.ok).on('click', function(){
			config.ok.call($widget);
		});
		$ft.append($ok);
	}

	function initPrompt($widget, config) {
		var css = config.css;
		var $ctn = $widget.find('.wd-ctn');
		var $ipt = $('<div class="wd-ipt"><input placeholder="' + config.remind + '" value="' + config.defaultValue + '"></input></div>');
		var $ok = $widget.find('.wd-ok');

		$ipt.addClass(css.input).find('input').on('keypress', function(event){
			if(event.which === 13) {
				$ok.click();
			}
		});

		$ctn.append($ipt);

	}

	function bindEvent(config, name, prompt){
		var old = config[name];
		config[name] = function(){
			
			this.hide();
			if(prompt && name === 'ok') {
				old.call(this, this.find('.wd-ipt').val());
			} else {
				old.call(this);
			}
			
			this.destroy();
		};
	}

	$.alert = function(config) {
		config = $.extend(true, {}, defaultConfig, config, {
			closeable: true,
			autoOpen: true,
			footer: '',
			title: false,
			dragable: false,
			align: {
				fixed: config.fixed
			}
		});
		bindEvent(config, 'close');
		return $.widget(config);
	};
	$.confirm = function(config) {
		config = $.extend(true, {}, defaultConfig, defaultConfirmConfig, config, {
			closeable: true,
			autoOpen: true,
			footer: '',
			title: false,
			dragable: false,
			align: {
				fixed: config.fixed
			}
		});
		bindEvent(config, 'close');
		bindEvent(config, 'ok');
		var $widget = $.widget(config);
		initConfirm($widget, config);
		return $widget;
	};
	$.prompt = function(config) {
		config = $.extend(true, {}, defaultConfig, defaultConfirmConfig, defaultPromptConfig, config, {
			closeable: true,
			autoOpen: true,
			footer: '',
			title: false,
			dragable: false,
			align: {
				fixed: config.fixed
			}
		});
		bindEvent(config, 'close');
		bindEvent(config, 'ok', true);
		var $widget = $.widget(config);
		initConfirm($widget, config);
		initPrompt($widget, config);
		return $widget;
	};
});