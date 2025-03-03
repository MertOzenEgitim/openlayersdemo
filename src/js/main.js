import '../styles/main.scss';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';

document.addEventListener("DOMContentLoaded",async()=>{

    const view=new View({
        center:fromLonLat([28.9784,41.0082]),
        zoom:10,
        maxZoom:18,
        minZoom:3
    })

    const map=new Map({
        target:'map',
        layers:[
            new TileLayer({
                source:new OSM()
            })
        ],
        view:view
    });
});
