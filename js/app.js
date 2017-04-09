var last_modified = 'unbekannt';
var node_count = 'unbekannt';
$.getJSON('state.json', function(data) {
    last_modified = data.last_modified;
    node_count = data.nodes;
});


// init leaflet map
///var map = L.map('map').setView([49.47704787438876, 8.5638427734375], 10);
var map = L.map('map').setView([49.514584413079, 7.7681922912598], 10);
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <br/> Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
}).addTo(map);



var geojson;

// I think this isn't nice, someone with better js skills should fix this
$.get('nodes.geojson', function(json) {
    geojson = L.geoJson(JSON.parse(json), {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
})


// init legend element
var legend = L.control({
    position: 'bottomright'
});

// build the legend
legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        ///grades = [0, 5, 10, 15, 20, 30, 40, 50],
	grades = [0, 5, 10, 15, 20, 30, 40, 50, 75, 100, 150, 200],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<div class="legend-point"><i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' Knoten<br></div>' : '+ Knoten</div>');
    }
    return div;
};

// add legend to the map
legend.addTo(map);

//var last_modified = 'unbekannt';
//var node_count = 'unbekannt';
//$.getJSON('state.json', function(data) {
//    last_modified = data.last_modified;
//    node_count = data.nodes;
//});

// init info element
var info = L.control();

// build info element
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    setTimeout(function() {
        info.update();
    }, (1500));
    return this._div;
};

// update the info box with the data frome the fields hovered
info.update = function(props) {
///    this._div.innerHTML = '<h4>Freifunk Rhein Neckar </br>Knoten Einzugsgebiet und Verteilung</h4>' + (props ?
///        '<b>' + props.name + '</b><br />' + props.count + ' Knoten' : 'Fahre über ein Gebiet um mehr zu erfahren');
    this._div.innerHTML = '<h4>Freifunk Westpfalz - Knotenverteilung</h4>' + (props ?
        '<b>' + props.name + '</b><br />' + props.count + ' Knoten' : 'Fahre über ein Gebiet um mehr zu erfahren<br />Stand: ' + last_modified
        + ', Knoten: ' + node_count.toString()
        );
};

// add info element to map
info.addTo(map);
