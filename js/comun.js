// -------------------------------------------------------------------------------
// Variables globales
var vista_actual = '';
var recaptcha_variable = '6LdgZiYaAAAAALIrnhKncWmbZNDp8A0imQYJ45lm';
var g_establecimiento_abierto = false;

// -------------------------------------------------------------------------------
// Funciones globales
function minsal_verificar_apertura(callback) {
    var return_callback = callback;
    minsal_get('establecimiento/estado', (msg) => {
        estado = msg['datos']['abierto'] || false;
        return_callback(estado);
    }, callback);
}

function minsal_ui_cargar_vista(nombre_vista, preservar = true) {
    if (preservar) {
        vista_actual = nombre_vista;
    }

    $('#contenedorprincipal').load(nombre_vista + '.html', () => {
        if (preservar) {
            window.location.hash = '#' + vista_actual;
        }
    });
}

function minsal_modal(titulo, mensaje) {
    $('<div class="modal" tabindex="-1" role="dialog" style="display: none;"> \
        <div class="modal-dialog" role="document"> \
            <div class="modal-content"> \
                <div class="modal-header"> \
                    <h5 class="modal-title">'+titulo+'</h5> \
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                        <span aria-hidden="true">&times;</span> \
                    </button> \
                </div> \
                <div class="modal-body"> \
                    <p>'+mensaje+'</p> \
                </div> \
                <div class="modal-footer"> \
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Entendido</button> \
                </div> \
            </div> \
        </div> \
    </div>').modal();
}


// -------------------------------------------------------------------------------
// Metodos REST

function minsal_put(endpoint, callback_success, callback_error, data_raw = null) {
    minsal_request(endpoint, 'PUT', callback_success, callback_error, data_raw)
}

function minsal_post(endpoint, callback_success, callback_error, data_raw = null) {
    minsal_request(endpoint, 'POST', callback_success, callback_error, data_raw)
}

function minsal_delete(endpoint, callback_success, callback_error, data_raw = null) {
    minsal_request(endpoint, 'DELETE', callback_success, callback_error, data_raw)
}

function minsal_get(endpoint, callback_success, callback_error, data_raw = null) {
    minsal_request(endpoint, 'GET', callback_success, callback_error, data_raw)
}

function minsal_request(endpoint, method, callback_success, callback_error, data_raw) {
    let options = {
        url: api_url + endpoint,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': getCookie('token') || ''
        },
        success: function (msg) {
            callback_success(msg);
        },
        error: function (jqXHR, status, err) {
            callback_error(jqXHR, status, err);
        },
    }

    if (data_raw) {
        options['data'] = JSON.stringify(data_raw);
    }

    $.ajax(options);
}