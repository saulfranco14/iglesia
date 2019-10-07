
function previsualizar()
{
    var imagen_archivo = document.getElementById('show_img').files;


    var navegador = window.URL || window.webkitURL;
    var objeto = navegador.createObjectURL(imagen_archivo[0]);
    $("#show_cover").attr("src", objeto);


}
/*si vas a copiar exactamente lo  mismo del html en cada pagina que valla a necesitar la imagen, solo debes de 
 * mover las lineas que voy a notariar*/
function loadImg()
{
    var archivo = document.getElementById('show_img').files;
    if (archivo[0].type == "image/jpeg" || archivo[0].type == "image/jpg" || archivo[0].type == "image/png" || archivo[0].type == "image/bmp") {
        var oReq = new XMLHttpRequest();
        var formdata = new FormData();
        oReq.onload = function (oEvent)
        {
            if (oReq.status == 200) {
                var respuesta = oReq.responseText.split(':');
                if (respuesta[2] == "1}]") {
                    mostrarVentanaModal("Exito al subir la imagen ");
                } else {
                    mostrarVentanaModal("Hubo un problema al cargar la imagen.<br />Por favor intentalo mas tarde.");
                }
            } else {
                mostrarVentanaModal(oReq.responseText);
            }
            mostrarListado();
        };
        /*dependiendo de los datos que vallas a enviar tendras que enviar datos caracteristicos y si se puede unicos de cada registro*/
        formdata.append('archivo', archivo[0]);
        //dependiendo de donde cargues la imagen la etiqueta idCliente tendra que cambiar por la que corresponda
        formdata.append('id', objetoColor.a);
        //aqui debes de poner a que usuario pertenece la subira: cliente, empleado o zootecnico
        formdata.append('usuario', 'color');
        //debes de mandar tambien el nombre anterior de la imagen, no debes de cambiar la tag **nueva linea agregada **
        formdata.append('anterior', objetoColor.g);
        //este dato es unico para cliente, para las demas vistas tendras que asignar una etiqueta y un dato unico si es posible y tambn
        //y tambn debes de usar el objeto que corresponda "objetoColor" solo pertenece a cliente
        formdata.append('nombre', objetoColor.d);
        //esta linea no la debes de modificar 
        formdata.append('submit', 'submit');
        oReq.open("post", "../zend_gateway/servicios/registro.php", true);
        oReq.send(formdata);
    } else {
        mostrarVentanaModal(archivo[0].name + ", No es un archivo de imagen valido.<br />Solo: jpeg, jpg, png, bmp");
    }
}
