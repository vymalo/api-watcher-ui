import React from 'react';
import {Provider} from 'react-redux'
import {store} from "./service/store";
import {RouterProvider} from "react-router-dom";
import {router} from "./service/router";
import {SocketComponent} from "./components/socket.component";

function App() {
    return (
        <Provider store={store}>
            <SocketComponent/>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default App;
