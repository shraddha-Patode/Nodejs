


$(document).ready(function () {

    getlatlong();

    function getlatlong() {
        ServerCall({
            paras: {},
            apiCall: '/getlatlong',
            successFunc: (data) => {
                var table = data[0][0];
                var table1 = data[1][0];

                var LatLong = table.mapView.split(","),   //Map View Lat Long
                    minZoom = table.minZoom,          //MinZoom Level    
                    maxZoom = table.maxZoom,          //MaxZoom Level
                    maxBoundNorthEast = table.maxBoundNorthEast.split(","),
                    maxBoundSouthWest = table.maxBoundSouthWest.split(",");
                    tmpString = table1.coOrdinates;


                    var polyCoodinate = [];
                    $.each(tmpString.split(/[[\]]{1,2}/), function (key, strCoOrdinate) {
                        if (replaceNull(strCoOrdinate.trim(), ",") === ",") {
                            return;
                        }
                        var tmpArr = [];
                        var latlon = strCoOrdinate.split(",");
                        if (isNaN(latlon[0]) || isNaN(latlon[1])) {
                            console.warn("polygon id:" + polyRow.polygonId + " has invalid co-ordinate:" + polyRow.coOrdinates + " at " + strCoOrdinate);
                            return;
                        }
                        tmpArr.push(parseFloat(latlon[0].trim()), parseFloat(latlon[1].trim()));
                        polyCoodinate.push(tmpArr);
                    });


                var tileLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                });


                //// Create the map
                map = L.map("map", {
                    maxZoom: maxZoom,
                    minZoom: minZoom,
                    //attributionControl: false,
                    maxBounds: [[maxBoundNorthEast[0], maxBoundNorthEast[1]], [maxBoundSouthWest[0], maxBoundSouthWest[1]]],
                    zoomControl: false,
                    doubleClickZoom: false,
                    //touchZoom:false
                    //closePopupOnClick:true,
                }).setView([LatLong[0],LatLong[1]], 15);
              



                // var map = new L.Map('map', {
                //     'center': [LatLong[0], LatLong[1]],
                //     'zoom': 10,
                //     'layers': [tileLayer],
                // });

                ////THUNDER FOREST THUNDER FOREST THUNDER FOREST 
                var Thunderforest_OpenCycleMap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                });

                ////GOOGLE EARTH HYB GOOGLE EARTH HYB GOOGLE EARTH HYB
                var GooleEarthHyBrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });

                ////GOOGLE EARTH STREET //GOOGLE EARTH STREET //GOOGLE EARTH STREET
                var GoogleMap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom: maxZoom,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });

                var baseMaps = {
                    "Map": GoogleMap
                    , "Hybrid": GooleEarthHyBrid
                    , "Thunderforest open cycle map": Thunderforest_OpenCycleMap
                };

                L.control.scale({
                    maxWidth: 100
                    , position: "bottomleft"
                    , updateWhenIdle: true
                }).addTo(map);

                L.control.layers(null, baseMaps, {
                    collapsed: true
                    , icon: "../images/saplLogoHiRes.svg"
                    , position: "bottomleft"
                }).addTo(map);

                // L.control.zoom({
                //     position: 'bottomleft'
                // }).addTo(map);

                var ctrl = false;
                document.body.onclick = function (e) {
                    if (e.ctrlKey) {
                        ctrl = true;
                    } else {
                        ctrl = false;
                    }
                }

                var polygonPoints = [
                    polyCoodinate];
                var poly = L.polygon(polygonPoints).addTo(map);

            }
        })
    }
})