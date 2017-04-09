// returns style object for the geojson areas
function style(feature) {
    return {
        fillColor: getColor(feature.properties.count),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}

// return color code in dependence of the node count
// queried in style()
/* ///
function getColor(d) {
    return d > 50 ? '#1b9e77' :
           d > 40 ? '#d95f02' :
           d > 30 ? '#7570b3' :
           d > 20 ? '#e7298a' :
           d > 15 ? '#66a61e' :
           d > 10 ? '#e6ab02' :
           d > 5 ?  '#a6761d' :
                    '#666666';
}
*/
function getColor(d) {
    return d > 200 ? '#e08ea3' :
           d > 150 ? '#9eeeff' :
           d > 100 ? '#ffc200' :
           d > 75 ? '#83d1ed' :
           d > 50 ? '#1b9e77' :
           d > 40 ? '#d95f02' :
           d > 30 ? '#7570b3' :
           d > 20 ? '#e7298a' :
           d > 15 ? '#66a61e' :
           d > 10 ? '#e6ab02' :
           d > 5 ?  '#a6761d' :
                    '#666666';
}

// event listener to highlight the area on mouse over
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

// reset area style on mounseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

// zoom to the area you've clicked
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// add listeners to the areas
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
