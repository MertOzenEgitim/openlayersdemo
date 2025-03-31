import '../styles/main.scss';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style,Circle,Fill,Stroke} from 'ol/style';
import { Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';

document.addEventListener("DOMContentLoaded",async()=>{

    // const view=new View({
    //     center:fromLonLat([28.9784,41.0082]),
    //     zoom:10,
    //     maxZoom:18,
    //     minZoom:3,
    //     projection:'EPSG:3857'
    // });

    // const osmLayer= new TileLayer({
    //     source:new OSM()
    // });

    // const map=new Map({
    //     target:'map',
    //     layers:[
    //         osmLayer
    //     ],
    //     view:view
    // });  
    
    // map.on('singleclick',function(e){
    //     const coordinate=e.coordinate;
    //     console.log(toLonLat(coordinate));
    // });

    // const drawSource=new VectorSource();

    // // const drawLayer=new VectorLayer({
    // //     source:drawSource,
    // //     style:new Style({
    // //         image:new Circle({
    // //             radius:7,
    // //             fill:new Fill({color:'red'}),
    // //             stroke:new Stroke({color:'black',width:2})
    // //         })
    // //     })
    // // });

    // const drawLayer=new VectorLayer({
    //     source:drawSource,
    //     style:new Style({
    //        stroke:new Stroke({
    //         color:'blue',
    //         width:2
    //        })
    //     })
    // });

    // map.addLayer(drawLayer);

    // const drawLine=new Draw({
    //     source:drawSource,
    //     type:'LineString'
    // });

    // // const drawLine=new Draw({
    // //     source:drawSource,
    // //     type:'Polygon'
    // // });

    // // const drawLine=new Draw({
    // //     source:drawSource,
    // //     type:'Circle'
    // // });

    // drawLine.on('drawend',function(e){
    //     const feature=e.feature;
    //     const geojsonFormat=new GeoJSON();

    //     const geojsonStr=geojsonFormat.writeFeature(feature);
    //     console.log("GeoJSON (EPSG:3857):",geojsonStr);

    //     const geometry=feature.getGeometry();
    //     const coordinates=geometry.getCoordinates().map(coord=>toLonLat(coord));

    //     const geojson4326={
    //         type:"Feature",
    //         properties:feature.getProperties(),
    //         geometry:{
    //             type:geometry.getType(),
    //             coordinates:coordinates
    //         }
    //     };

    //     console.log('GeoJSON (EPSG:4326):',JSON.stringify(geojson4326));
    // });

    // map.addInteraction(drawLine);

    //-------------Uygulama---------------------------------

    const view=new View({
        center:fromLonLat([28.9784,41.0082]),
        zoom:10,
        maxZoom:18,
        minZoom:3,
        projection:'EPSG:3857'
    });

    const osmLayer= new TileLayer({
        source:new OSM()
    });     

    const source=new VectorSource();
    const vectorLayer=new VectorLayer({
        source:source
    });
    
    const map=new Map({
        target:'map',
        layers:[
            osmLayer,
            vectorLayer
        ],
        view:view
    }); 
    const typeSelect=document.getElementById('type');
    const undoDrawButton=document.getElementById('undoDraw');
    const clearDrawButton=document.getElementById('clearDraw');
    let draw;
    typeSelect.onchange=function(){
        const value=typeSelect.value;
        map.removeInteraction(draw);
        if(value!=='None'){
            draw=new Draw({
                source:source,
                type:typeSelect.value
            })
            map.addInteraction(draw);
        }
    }    
    undoDrawButton.addEventListener('click',function(){
        const features=source.getFeatures();
        if(features.length>0){
            const lastFeature=features[features.length-1];
            source.removeFeature(lastFeature);
        }
    });
    clearDrawButton.addEventListener('click',function(){
        source.clear();        
    });

});

