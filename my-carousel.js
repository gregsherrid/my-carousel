/*
 * Greg Sherrid, 4-20-2014
 * Copyright 2014, Gregory Sherrid
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

function setupCarousels() {
	$(".my-carousel").each( function() {
		var $this = $(this);
		var $items = $this.find(".my-carousel-item");
		var width = $this.width();

		var animateTime = $this.data("slide-time") || 400;
		var newSlideTime = $this.data("new-slide-time") || 4000;

		var $slider = $("<div class='my-carousel-slider'></div>");
		$this.append( $slider.append( $items ) );

		var timer = setTimeout( tick, newSlideTime );

		var $indicator = $("<div class='my-carousel-indicator'></div>");
		$items.each( function( index ) {
			var $item = $(this);
			var $op = $("<a href='#' class='op'></a>");
			$op.data( "item", $item );
			$item.data( "op", $op );

			if ( index == 0 ) {
				$op.addClass("active");
			}
			$indicator.append( $op );
		});
		$indicator.find(".op").click( function() {
			var $op = $(this);
			var $item = $op.data("item");
			var i = 0;

			while ( $items.first()[0] != $item[0] && i < $items.length ) {
				$items.last().after( $items.first() );
				$items = $this.find(".my-carousel-item");
				i++;
			}
			caroselReset( $item );
			return false;
		});

		function moveCarousel( left ) {
			var $target = null;
			if ( left ) {
				$target = $items.last();
				$items.first().before( $items.last() );

				$slider.css("left", -width );
				$slider.animate({
					"left" : 0
				}, animateTime );
				$items = $this.find(".my-carousel-item");

			} else {
				$target = $items.eq(1);

				$slider.css("left", 0 );
				$slider.animate({
					"left" : -width
				}, animateTime, function() {
					$items.last().after( $items.first() );
					$slider.css("left", 0 );
					$items = $this.find(".my-carousel-item");
				});
			}
			caroselReset( $target );
		}
		function caroselReset( $target ) {
			$indicator.find(".op").removeClass("active");
			$target.data("op").addClass("active");

			clearInterval( timer );
			timer = setTimeout( tick, newSlideTime );
		}

		function tick() {
			moveCarousel( false );
		}

		var $arrowLeft = $("<div class='arrow left'></div>");
		var $arrowRight = $("<div class='arrow right'></div>");
		$arrowLeft.click( function() {
			moveCarousel( true );
		});
		$arrowRight.click( function() {
			moveCarousel( false );
		});

		$this.append( $arrowLeft ).append( $arrowRight ).append( $indicator );
	});
}