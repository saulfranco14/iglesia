$(function(){

	
	
	$('#id_prenda').change(function()
	{

		var el_modelo = $(this.modelo).val();
		console.log(el_modelo);
	
		$.post( '../zend_gateway/servicios/modelos.php', {id_modelo: el_modelo} ).done( function( respuesta )
		{
			$( '#id_modelo' ).html( respuesta );
			
		});
	});
	
	$( '#id_modelo' ).change( function()
	{
		var modelo = $(this).children('option:selected').html();
	});

})
