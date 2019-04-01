
$(document).ready(function () {
    loadMap();
    var map, marker;
    var marker1 = [];
    var mcg = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: false
    });
    function loadMap() {
        ////GOOGLE EARTH HYB GOOGLE EARTH HYB GOOGLE EARTH HYB
        gooleEarthHyBrid = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        }),
            googleMap = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 35,
                subdomains: ["mt0", "mt1", "mt2", "mt3"]
            })

            , mapDefaultView = { loc: [], zoom: 0 };

        map = L.map('map', {
            maxZoom: 20,
            attributionControl: false,
            layers: [googleMap],
            zoomControl: false,
            doubleClickZoom: false,
        }).setView([19.2184696, 72.8631155], 13);

        Icon = L.icon({
            iconUrl: "../script/Leaflet/images/icon.png",
            className: 'image-icon',
            iconSize: [50, 50], // size of the icon
          
        });

   // Custom Marker
                var myMarker = L.marker([19.21852,72.86399], { icon: Icon, title: "My Point", alt: "The Big I" })
                    .addTo(map)

        if (true) //THIS WILL BE DECIDED DYNAMICALLY BY A BIT IN DB !!TO BE IMPLEMENTED
            L.control.scale({
                maxWidth: 100,
                position: "bottomleft",
                updateWhenIdle: true
            }).addTo(map);

        var baseMaps = {
            "Map": googleMap,
            "Hybrid": gooleEarthHyBrid
        };

        L.control.layers(
            baseMaps,                   //MAP LAYER CONTROL
            null,                       //OTHER OVERLAY LAYERS
            { position: 'bottomleft' }  //ADDED LAYER PARAMETERS
        ).addTo(map);

        new L.Control.Zoom({
            position: "bottomleft"
        }).addTo(map);


        if (true) {
            /*CUSTOM CONTROL CENTER MAP*/
            var resetMapBtn = L.control({ position: 'bottomleft' })
                , rstBtnDivObj;
            resetMapBtn.onAdd = function (map) {
                rstBtnDivObj = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control');
                rstBtnDivObj.innerHTML = '<div id="resetMapView" title="Reset map" style="margin: 3px; margin-top: 10px; font-size: 22px;" class="cursorPointer"><span                       class="material-icons">fullscreen_exit</span></div>';
                return rstBtnDivObj;
            };
            resetMapBtn.addTo(map);
            function ResetMapZoom() {
                if (mapDefaultView) {
                    map.setView(mapDefaultView.loc, mapDefaultView.zoom)
                } else {
                    console.warn("Default view undefined. Setting view to map max bound.");
                    map.fitBounds(map.options.maxBounds);
                }
            }
            rstBtnDivObj.addEventListener("click", ResetMapZoom, false);
            /*CUSTOM CONTROL CENTER MAP*/
        }
    }
    getAlarmDetail();
    function getAlarmDetail() {
        var alarmType = 'Active'
        var frequency = document.getElementsByName("alarmType")
        frequency.forEach(element => {

            if (element.checked) {
                alarmType = element.id;
            }
        });
        ServerCall({

            apiCall: '/getAutoComplete',
            successFunc: (data) => {
                var projects = [];
                var table = data[0];
                for (var i = 0; i <= table.length - 1; i++) {
                    projects.push(
                        {
                            value: table[i].id,
                            label: table[i].Location
                        })
                }
                $("#getmeter").autocomplete({
                    source: projects,
                    select: function (e, ui) {
                        e.preventDefault() // <--- Prevent the value from being inserted.
                        $("#add").val(ui.item.value);
                        $(this).val(ui.item.label);
                    },
                    focus: function (e, ui) {
                        e.preventDefault() // <--- Prevent the value from being inserted.
                        $("#add").val(ui.item.value);

                        $(this).val(ui.item.label);
                    },
                });
            }
        })
    }
    // get marker
    $('#btnfind').on('click', function () {
        removeMarker();
        getMarker();
        function getMarker() {
            ServerCall({
                paras: {
                    locId: $('#add').val()
                },
                apiCall: '/getMarker',
                successFunc: (data) => {
                   
                    $.each(data[0], function (k, mk) {
                       
                        var Coorinate = mk.locCoordinate;
                        var logo = mk.locLogo;
                        var tmpArr = [], Arrmarker = [];
                        $.each(Coorinate.split(/[[\]]{1,2}/), function (key, v) {
                            if (replaceNull(v.trim(), ",") == ",") {
                                return;
                            }
                            var Amslatlon = v.split(",");
                            if (isNaN(Amslatlon[0]) || isNaN(Amslatlon[1])) {
                                return;
                            }
                            var Amsimg = '<div class="' + `${(function () { if (logo == null) return 'AmspinRed'; else return 'AmspinGreen'; }).call(this)}` + ' bounce" style="border:2px solid Black;"><span data-after="">'+logo+'</span></div>';

                            var AMSicon = L.divIcon({
                                html: Amsimg,
                                className: 'image-icon',
                                iconSize: [52, 52]
                            });

                            tmpArr.push(parseFloat(Amslatlon[0].trim()), parseFloat(Amslatlon[1].trim()));
                            Arrmarker.push(tmpArr);
                            marker = L.marker(new L.LatLng(tmpArr[0], tmpArr[1]), { icon: AMSicon })
                            marker1.push(marker);

                            mcg.removeLayer(marker);
                                mcg.addLayer(marker);
                           
                        })
                    })
                        map.addLayer(mcg);
                    
                    
                }
            })
        }
    })
    function removeMarker() {
        if (marker != undefined) {
            $.each(marker1, function (key, mark) {
                mcg.removeLayer(mark);
            });
            map.removeLayer(mcg);
        }
    }
});