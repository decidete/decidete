var LOREM_IPSUM = 'Google Analytics es una herramienta sencilla y fácil de usar que ayuda a los propietarios de sitios web a medir cómo interactúan los usuarios con el contenido del sitio.';

// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
    current_lang: 'es',
    autoclear_cookies: false,                    // default: false
    cookie_name: 'cc_cookie',                   // default: 'cc_cookie'
    cookie_expiration: 365,                     // default: 182
    page_scripts: true,                         // default: false
    force_consent: true,                        // default: false

    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: '/',                        // default: root
    // cookie_same_site: 'Lax',
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'cloud',                    // box,cloud,bar
            position: 'bottom center',          // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'bar',                      // box,bar
            position: 'left',                   // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){},

    onAccept: function (cookie) {
        if (cookie && cookie.categories.length > 0 && cookie.categories[0] === "analytics") {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-FGP4V69MCX');
        }
    },

    onChange: function (cookie, changed_preferences) {
        // If analytics category is disabled => disable google analytics
        if (!cc.allowedCategory('analytics')) {
            typeof gtag === 'function' && gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    },

    languages: {
        'es': {
            consent_modal: {
                title: '¡Hola!',
                description: 'Nuestro sitio web utiliza cookies esenciales para garantizar su correcto funcionamiento y cookies de seguimiento para comprender cómo interactúa usted con él.',
                primary_btn: {
                    text: 'Aceptar todo',
                    role: 'accept_all'      //'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Preferencias',
                    role: 'settings'       //'settings' or 'accept_necessary'
                },
                revision_message: '<br><br> Querido usuario, las condiciones han cambiado.'
            },
            settings_modal: {
                title: 'Configuración Cookies',
                save_settings_btn: 'Guardar',
                accept_all_btn: 'Aceptar todas',
                reject_all_btn: 'Rechazar todas',
                close_btn_label: 'Cerrar',
                cookie_table_headers: [
                    {col1: 'Nombre'},
                    {col2: 'Dominio'},
                ],
                blocks: [
                    /*{
                        title: 'Cookie usage',
                        description: LOREM_IPSUM + ' <a href="#" class="cc-link">Privacy Policy</a>.'
                    }, {
                        title: 'Strictly necessary cookies',
                        description: LOREM_IPSUM + LOREM_IPSUM + "<br><br>" + LOREM_IPSUM + LOREM_IPSUM,
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true  //cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, */{
                        title: 'Estadísticas de Google',
                        description: LOREM_IPSUM,
                        toggle: {
                            value: 'analytics',
                            enabled: true,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: '^_ga',
                                col2: 'decidete.es',
                                is_regex: true
                            },
                        ]
                    }
                ]
            }
        }
    }
});
