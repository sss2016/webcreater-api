import React from 'react';
import {hydrate} from 'react-dom';
import  'antd/dist/antd.css';
import './components/IMQQ/index.css';
import './components/Dragging/front.css';
import App from './App';
hydrate(<App/>,document.getElementById("root"));