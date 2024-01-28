import { createRoot } from 'react-dom/client';
import App from "./App";
import React from 'react';

const root = createRoot(document.getElementById('app')!);
root.render(React.createElement(App));
