( function ( $ )
{
	$.fn.multiemail = function ( )
	{
		var w = this.width ( );
		var h = this.height ( );
		var $this = this;
		this.attr ( 'type', 'hidden' ).wrap ( $ ( '<div>' ).addClass ( 'multiemail' ) )
			.after (
				$ ( '<div>' ).addClass ( 'multiemail-add' ).html ( 'Attach another email address &#187;' ).click ( function ( )
				{
					$ ( this ).hide ( ).after ( $ ( '<input>' ).attr ( {
						type: 'text'
						, autocomplete: 'off'
						, placeholder: 'name@domain.ntl'
						, val: ''
					} ).keypress ( function ( e )
					{
						if ( e.which == 13 )
						{
							e.preventDefault ( );
							this.blur ( );
						}
					} ).blur ( function ( )
					{
						if ( $.validate ( $ ( this ).val ( ) ) )
						{
							$this.parent ( ).find ( 'ul' ).append ( $ ( '<li>' ).append ( $ ( this ).val ( ) ).append ( $ ( '<span>' ).text ( 'x' ) ).click ( function ( e )
							{
								this.remove ( );
								$.update ( $this );
							} ) );
						}
						$.update ( $this );
						$this.parent ( ).find ( '.multiemail-add' ).show ( );
						this.remove ( );
					} ).focus ( ) );
				} )
			)
			.after (
				$ ( '<div>' ).addClass ( 'multiemail-clearfix' ).append ( $.explode ( this.val ( ) ) )
			)
			.parent ( ).find ( 'li' ).click ( function ( e )
			{
				this.remove ( );
				$.update ( $this );
			} );
		return this;
	};
	$.explode = function ( str )
	{
		str = str.split ( ',' );
		return '<ul><li>' + str.join ( '<span>x</span></li><li>' ) + '<span>x</span></li></ul>';
	};
	$.validate = function ( email )
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test ( email );
	};
	$.update = function ( $this )
	{
		var list = new Array;
		$this.parent ( ).find ( 'li' ).each ( function ( i, v )
		{
			list.push ( v.innerHTML.replace ( '<span>x</span>', '' ) );
		} );
		$this.val ( list.join ( ',' ) );
	};
} ) ( jQuery );