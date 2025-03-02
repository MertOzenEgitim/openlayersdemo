import '../styles/main.scss';
import Map from './map';

const app=document.getElementById('app');

document.addEventListener("DOMContentLoaded",async()=>{
    app.prepend(Map());
});
