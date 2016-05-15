												/*
													Framework de Loading - Nico Buzzi 15/05/16
													Responsive y con gifs.
												*/

/* Variables para inicializar el framework. */
var defaultLoading = 'images/squares.gif';
var gearsLoading = 'images/gears.svg';
var loadingModal = '';
var loading;
var initialized = false;
var thread = { defaultValue: 1000 };
var bodyAppended = false;

/*
Configuramos la variable para inicializar el div que contendra nuestro loading
Por defecto usara la imagen que esta definida, square.
Esta tambien puede ser modificada ej : makeLoading(gearsLoading)
*/
function makeLoading(imageBuffer)
{
	var image = $.extend({}, defaultLoading, imageBuffer);
	var result = '';

	$.each(image,function(index, value){
		result += value;
	});

	loadingModal = $('<div class="container"><div class="modal fade text-center loading-xs-center loading-md-center loading-lg-center loading-sm-center" id="pleaseWait" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static"><div class="modal-dialog modal-sm"><div><div class="modal-body"><img src="' + result +'"></img></div></div></div></div></div>');
	initialized = true;

	return initialized;
}

/* 
Creamos la funcion de mostrar y ocultar el loading 
Ej : loading.show() | loading.hide() - para usar via JavaScript.
*/
loading = loading || (function() {

	if ( ! initialized )
		makeLoading();

	return {
		init:false,
		initializeLoading: function()
		{
			if ( $("#pleaseWait") === undefined || $("#pleaseWait") == null )
			{
				$(document.body).append(loadingModal);
				bodyAppended = true;

				this.init = bodyAppended;
			}
		},
		show: function()
		{
			this.initializeLoading();

			$("#pleaseWait").modal('show');
		},
		hide: function()
		{
			this.initializeLoading();

			if ( $("#pleaseWait") === undefined || $("#pleaseWait") == null )
			{
				$(document.body).append(loadingModal);
				bodyAppended = true;
			}

			$("#pleaseWait").modal('hide');
		}
	};
})();

function hideLoading()
{
	loading.hide();
	if ( thread.handle === undefined || thread == null )
	{
		return;
	}

	return clearTimeout(thread.handle);
}

function showLoading(timeSet)
{
	var timeToSet = 0;

	if ( isNaN(timeSet) )
		return;

	if ( timeSet === undefined || timeSet == null || timeSet <= 0 )
	{
		timeToSet = thread.defaultValue; //1 Segundo.
	}
	else
	{
		timeToSet = timeSet;
	}

	setTimeout(loading.show(),1);
	thread.handle = setTimeout(hideLoading,timeToSet);

	return thread;
}

/*De esta manera no habra ningun problema a la hora de declarar el document ready*/
$(document).on('ready',function()
{
	/*Adjuntamos el loading al body al cargar el documento.*/
	if ( !bodyAppended )
	{
		$(document.body).append(loadingModal);
	}

	/*Bindeamos el evento de ajax a la hora de enviar y recibir datos del servidor para mostrar el loading*/
	$(document).bind("ajaxSend", function(){
		loading.show();
	}).bind("ajaxComplete", function(){
		loading.hide();
	}).bind("ajaxError", function(){
		loading.hide();
	});
});

/*$(function(){});*/