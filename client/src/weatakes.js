import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import css from './styles/style.styl';

import App from './Components/App.js'
import Single from './Components/Single.js'
import PhotoGrid from './Components/PhotoGrid.js'

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={PhotoGrid}></IndexRoute>
            <Route path="/view/:postId" component={Single}></Route>
        </Route>
    </Router>
    </Provider>

)

render(router, document.getElementById('root'));
