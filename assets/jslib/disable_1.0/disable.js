jQuery.fn.extend( {
	disable: function ( state ) {
		return this.each( function () {
			var $this = $( this );
			if ( $this.is( 'input, button' ) ) this.disabled = state;
			else $this.toggleClass( 'disabled', state );
			if ( state === true ) {
				$( this )
					.addClass( 'disabled' );
				this.tabIndex = -1;
			} else if ( state === false ) {
				$( this )
					.removeClass( 'disabled' );
			}
		} );
	}
} );

/*  How to use

 $("#id").disable(true); to disable the #id.

 $("#id").disable(false); to make the #id active.

 */
