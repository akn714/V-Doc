import './App.css';

import { Chat } from './components/chat/Chat';

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Chat />} />
        </Route>
    )
);

export function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
