import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IntlProvider, addLocaleData } from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import enLocaleData from 'react-intl/locale-data/en';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

import Session from './private/Session'
import App from './public/App'
import NotFound from './public/NotFound'

var localeLanguage = ""
var userLang = navigator.language || navigator.userLanguage;
var messagesLanguage = ""

if (userLang.substring(0, 2) === 'es') {
    addLocaleData(esLocaleData);
    localeLanguage = "es-ES";
    messagesLanguage = localeEsMessages
}
else {
    addLocaleData(enLocaleData);
    localeLanguage = "en-US";
    messagesLanguage = localeEnMessages
}

render(
    <IntlProvider locale={localeLanguage} messages={messagesLanguage}>
        <BrowserRouter>
            <Switch>
                <Route path="/session" component={Session} />
                <Route path="/" component={App} exact />
                <Route path="/:any" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </IntlProvider>, document.getElementById('app'));