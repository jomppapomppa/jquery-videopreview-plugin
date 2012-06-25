;(function($) {
	var defaults = {
		highRes:       true,
		autoSize:      true,
		fluid:         false,
		caption:       "",
		imageSelector: ".vp-image",
		dataPrefix:    "",
		selector:      "iframe[src*='www.youtube.com']",
		template:      "button",
		templates:     {
			text:
'<div class="vp-item"> \
	<a href="javascript:void(0)"> \
		<img src="{url}" alt="" title="{caption}" class="vp-image" /> \
		<span class="vp-caption">{caption}</span> \
	</a> \
</div>',
			button:
'<div class="vp-item"> \
	<a href="javascript:void(0)"> \
		<img src="{url}" alt="" title="{caption}" class="vp-image" /> \
		<span class="vp-caption top">{caption}</span> \
		<span class="vp-button"></span> \
	</a> \
</div>',
			fluid:
'<div class="vp-item fluid"> \
	<a href="javascript:void(0)"> \
		<img src="{url}" class="vp-image" /> \
		<span class="vp-caption top">{caption}</span> \
		<span class="vp-button"></span> \
	</a> \
</div>'
		}
	};

	$.fn.videoPreview = function(opts) {
		var options = $.extend({}, defaults, opts);
		
		function attr($elem, key) {
			var dataKey = "data-" + options.dataPrefix + key.replace(/([A-Z])/g, "-$1").toLowerCase();
			var dataVal = $elem.attr(dataKey);
			if (dataVal) {
				if      (dataVal === "true")  { return true; }
				else if (dataVal === "false") { return false; }
				return dataVal;
			}
			else if (key in options) {
				return options[key];
			}
			return null;
		}

		return this.each(function() {
			var $this  = $(this),
				$elems = $this.is(options.selector) ? $this : $this.find(options.selector);
			
			$elems.each(function() {
				var
					$iframe   = $(this),
					src       = $iframe.attr("src"),
					id        = src.match(/embed\/([^\?]+)/)[1],
					highRes   = attr($iframe, "highRes"),
					imageUrl  = "http://img.youtube.com/vi/" + id + "/" + (highRes ? "0" : "2") + ".jpg",
					caption   = attr($iframe, "caption"),
					template  = attr($iframe, "template"),
					fluid     = attr($iframe, "fluid")
				;
				
				if (fluid) {
					template = "fluid";
				}
				if (template in options.templates) {
					template = options.templates[template];
				}
				template = template
					.replace(/{url}/g,     imageUrl)
					.replace(/{caption}/g, caption)
				;
				
				var $element = $(template).click(function() {
						src += (src.indexOf("?") === -1 ? "?" : "&") + "autoplay=1";
						$iframe.attr("src", src);
						$element.replaceWith($iframe);
						$this.trigger("activate");
					}),
					$image   = $element.find(attr($iframe, "imageSelector")),
					autoSize = !fluid && attr($iframe, "autoSize")
				;

				if (autoSize) {
					$element.css({
						width:  $iframe.width(),
						height: $iframe.height()
					});
					$image.css({
						width: $iframe.width()
					});
				}
				
				$iframe.replaceWith($element);
								
				$image.load(function() {
					if (fluid) {
						var ratio = $image.height() / $image.width();
						$element.css("paddingTop", (ratio * 100) + "%");
					}
					$this.trigger("load");
				});
			});
		});
	};
})(jQuery);
