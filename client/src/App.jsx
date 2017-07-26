import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer  from './reducers';
import Main from './components/Main';

class App extends Component {

    render() {
        const store = createStore(
            reducer, applyMiddleware(thunkMiddleware));

        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default App;
