import '../styles/main.scss';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style,Circle,Fill,Stroke} from 'ol/style';
import { Polygon } from 'ol/geom';

document.addEventListener("DOMContentLoaded",async()=>{

    const view=new View({
        center:fromLonLat([28.9784,41.0082]),
        zoom:10,
        maxZoom:18,
        minZoom:3,
        rotation:(45*Math.PI)/180,
        projection:'EPSG:3857'
    });

    //radyan=(derece*Math.PI)/180

    const stamenLayer=new TileLayer({
        source:new XYZ({
            url:'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png'
        })
    })

    const osmLayer= new TileLayer({
        source:new OSM()
    });

    const map=new Map({
        target:'map',
        layers:[
            stamenLayer,
            osmLayer
        ],
        view:view
    });

    //map.removeLayer(stamenLayer);
    //const layers=map.getLayers().getArray();
    //console.log(layers);
    //stamenLayer.setVisible(false);
    //stamenLayer.setVisible(true);
    //osmLayer.setVisible(true);
    //osmLayer.setVisible(false);
    
    document.getElementById("layerSelect").addEventListener('change',(event)=>{
        const selectedLayer=event.target.value;

        osmLayer.setVisible(selectedLayer==='osm');
        stamenLayer.setVisible(selectedLayer==='stamen');
    });

    const vectorLayer=new VectorLayer({
        source:new VectorSource({
            url:'data/points.geojson',
            format:new GeoJSON()
        }),
        style: function (feature) {
            const geometryType = feature.getGeometry().getType();
            if (geometryType === 'Point') {
                return new Style({
                    image: new Circle({
                        radius: 6,
                        fill: new Fill({ color: 'red' }),
                        stroke: new Stroke({ color: 'black', width: 2 }),
                    }),
                });
            } else if (geometryType === 'Polygon') {
                return new Style({
                    fill: new Fill({ color: 'rgba(0, 0, 255, 0.5)' }), 
                    stroke: new Stroke({ color: 'blue', width: 2 }), 
                });
            }
        }
    })

    map.addLayer(vectorLayer);
});
