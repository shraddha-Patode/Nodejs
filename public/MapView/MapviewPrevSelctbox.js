
$(document).ready(function () {
    var pageLock = new PageLock({});
    // $('.area').append(dynNav);
     pageLock.Show({ message: "Fetching page Data" });
    ViewMap();

    var InnerCol = [];
    var map, hereMarker, marker;
    var marker1 = [];
	 var AMSMarker1 = [];
    var poly;
    var table1;
    var temp = [];
    var Arrchakno = [];
    var isClicked = false;
    var hashTable = new HashTable();
    var OmsId_hashTable = new HashTable();

    var mcg = L.markerClusterGroup({
        chunkedLoading: true,
        //singleMarkerMode: true,
        spiderfyOnMaxZoom: false
    });

    $('#status').select2({
        theme: "flat"
    });


    function ViewMap() {
        ServerCall({
            paras: {},
            apiCall: '/scadaConfig',
            successFunc: (data) => {
                var table = data[0][0];
                table1 = data[0];
                table2 = data[1];
                table3 = data[2];
                table4 = data[3];
				  table5 = data[4];


                var LatLong = table.ProjectCenterCoordinate.split(","),   //Map View Lat Long
                    minZoom = table.minZoom,          //MinZoom Level
                    maxZoom = table.maxZoom,
                    Zoomlevel = table.ProjectZoomLevel,        //MaxZoom Level;
                    maxBoundNorthEast = table.maxBoundNorthEast.split(","),
                    maxBoundSouthWest = table.maxBoundSouthWest.split(",");

                /// View PolyLine

                var polylineOptions = {
                    color: 'blue',
                    weight: 3,
                    opacity: 0.9
                };

                // $.each(table2, function (key, tmpcoordinates) {


                    // var polyCoodinate = [];
                    // $.each(tmpcoordinates.Coordinates.split(/[[\]]{1,2}/), function (key, strCoOrdinate) {
                        // if (replaceNull(strCoOrdinate.trim(), ",") === ",") {
                            // return;
                        // }
                        // var tmpArr = [];
                        // var latlon = strCoOrdinate.split(",");
                        // if (isNaN(latlon[0]) || isNaN(latlon[1])) {
                            // console.warn("polygon id:" + polyRow.polygonId + " has invalid co-ordinate:" + polyRow.coOrdinates + " at " + strCoOrdinate);
                            // return;
                        // }
                        // tmpArr.push(parseFloat(latlon[0].trim()), parseFloat(latlon[1].trim()));
                        // polyCoodinate.push(tmpArr);
                    // });

                    // var polyline = L.polyline(polyCoodinate, polylineOptions);
                    // // polyline.bindTooltip(tmpcoordinates.PipeLineName, { direction: 'right', sticky: true });
                    // mcg.addLayer(polyline);
                // })

                var localOsmMap = L.tileLayer(/*"../maps/OSM/riysdh_OMM/{z}/os_{x}_{y}_{z}.png"*/ "E:/Projects/riyadh/OSM/riysdh_OMM/{z}/os_{x}_{y}_{z}.png", {
                    maxZoom: 30
                    , subdomains: ["mt0", "mt1", "mt2", "mt3"]
                }),

                    ////GOOGLE EARTH HYB GOOGLE EARTH HYB GOOGLE EARTH HYB
                    gooleEarthHyBrid = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
                        maxZoom: 21,
                        subdomains: ["mt0", "mt1", "mt2", "mt3"]
                    }),

                    ////GOOGLE EARTH STREET //GOOGLE EARTH STREET //GOOGLE EARTH STREET
                    googleMap = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                        maxZoom: 30,
                        subdomains: ["mt0", "mt1", "mt2", "mt3"]
                    })


                    , mapDefaultView = { loc: [], zoom: 0 };

                mapDefaultView.loc = [LatLong[0], LatLong[1]];
                mapDefaultView.zoom = Zoomlevel;

                map = L.map('map', {

                     maxZoom: maxZoom,
                    // minZoom: minZoom,
                    attributionControl: false,
                    // maxBounds: [[maxBoundNorthEast[0], maxBoundNorthEast[1]], [maxBoundSouthWest[0], maxBoundSouthWest[1]]],
                    layers: [gooleEarthHyBrid],
                    zoomControl: false,
                    doubleClickZoom: false,
                }).setView([LatLong[0], LatLong[1]], Zoomlevel);;


                if (true) //THIS WILL BE DECIDED DYNAMICALLY BY A BIT IN DB !!TO BE IMPLEMENTED
                    L.control.scale({
                        maxWidth: 100,
                        position: "bottomleft",
                        updateWhenIdle: true
                    }).addTo(map);

                var baseMaps = {
                    "Map": googleMap,
                    "Hybrid": gooleEarthHyBrid,
                    "OSM map(offline)": localOsmMap
                };

                L.control.layers(
                    baseMaps,                   //MAP LAYER CONTROL
                    null,                       //OTHER OVERLAY LAYERS
                    { position: 'bottomleft' }  //ADDED LAYER PARAMETERS
                ).addTo(map);

                new L.Control.Zoom({
                    position: "bottomleft"
                }).addTo(map);


                hereMarker = L.icon({
                    iconUrl: "../images/hereMarker.gif",

                    iconSize: [38, 95], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });


                pumpstation = L.icon({
                    iconUrl: "../script/Leaflet/images/BuildingIcon.png",

                    iconSize: [38, 60], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });

                tank = L.icon({
                    iconUrl: "../script/Leaflet/images/Tank.png",

                    iconSize: [30, 30], // size of the icon
                    shadowSize: [50, 64], // size of the shadow
                    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62], // the same for the shadow
                    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                });


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

                var kmllayer = new L.KML("../script/Mohan.kml",{async:true})
                kmllayer.on("loaded",function(e){
                map.fitBounds(e.target.getBounds())
                });
                map.addLayer(kmllayer);

                    document.getElementById('lblkml').addEventListener('click',function(){
                    if(map.hasLayer(kmllayer)){
                        map.removeLayer(kmllayer);
                        document.getElementById("lblkml").setAttribute(
                            "style", "color: red; text-decoration: line-through;");
                    }else{
                        map.addLayer(kmllayer);
                        document.getElementById("lblkml").setAttribute(
                            "style", "color: white; text-decoration: none;");
                    }
                })
                // Custom Marker
                // var myMarker = L.marker([24.5106841498394,75.7629869205836], { icon: pumpstation, title: "MyPoint", alt: "The Big I", draggable: true })
                //     .addTo(map)
                //     .on('dragend', function () {
                //         var coord = String(myMarker.getLatLng()).split(',');
                //         console.log(coord);
                //         var lat = coord[0].split('(');
                //         console.log(lat);
                //         var lng = coord[1].split(')');
                //         console.log(lng);
                //         myMarker.bindPopup("Moved to: " + lat[1] + ", " + lng[0]);
                //     });

                // //// View Area
                // var polygonPoints = [
                //     polyCoodinate];
                // poly = L.polygon(
                //     polygonPoints, {
                //         color: 'grey',
                //         fillColor: 'grey',
                //         fillOpacity: 0.2,
                //         radius: 500
                //     }).addTo(map);

                // poly.on('click', function () {
                //     window.location.href = '/detailview?id=' + table1.areaId;
                // })
                //  MapMarker();
				//   var pStation = L.marker([23.97335,76.80963], { icon: pumpstation, title: "Pump Station", alt: "", draggable: false })
                //     .addTo(mcg)
                
                
                //     var pTank = L.marker([23.97363,76.81962], { icon: tank, title: "Tank", alt: "", draggable: false })
                //     .addTo(mcg)
                var Arrmarker = [];

                $.each(table3, function (k, mk) {
                    temp = [];
                    var tmpstring = mk.OmsCoordinate;
                    Arrchakno.push(mk.ChakNo);
                    hashTable.insert(mk.ChakNo, mk.OmsCoordinate);

                    var valveStat = [];

                    for (var k = 0; k <= table4.length - 1; k++) {
                        if (table4[k].OmsId == mk.OmsId) {
                            valveStat.push([
                                table4[k].CurrentStatus
                            ])
                        }
                    }
                    var dyndetails = '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 1020 !important;">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content"  id="' + mk.ChakNo + '" style="background-color:rgba(0, 0, 0,1);color:white;border-radius:3%; border: 3px solid rgba(255, 249, 249, 0.71);                             width:360px;height:  auto;    CURSOR: POINTER;">'
                        + '<div class="">'
                        + '<table id="tblDev" width="100%" class="tblcolor" style="color:white;" cellpadding="0"; cellspacing="0";>'
                        + '<tbody>'
                        + '<tr>'
                        + '<td colspan="4" class="clsthead">Chak No : ' + mk.ChakNo + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Distributory</td>'
                        + '<td>: ' + mk.description + ' </td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Chak Area</td>'
                        + '<td>: ' + parseFloat(mk.ChakArea).toFixed(2) + ' Ha</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Inlet Pressure</td>'
                        + '<td style="border-right: 1px solid white;width: 77px;">: ' + replaceNull(mk.InLetPressure, '-') + ' bar</td>'
                        + '<td class="width84px">Outlet Pressure</td>'
                        + '<td>: ' + replaceNull(mk.OutLetPressure, '-') + ' bar</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Flow Rate</td>'
                        + '<td>: ' + parseFloat(mk.FlowRate).toFixed(2) + ' m3/hr</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Todays Volume</td>'
                        + '<td>: ' + replaceNull(mk.CalculatedVolume, '-') + ' m3</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Valve Status</td>'
                        + '<td colspan="3">'
                        + '<table id="tblvalvest">'
                        + '<tbody>'
                        + '<tr id="trvalve">'

                        + (function () {
                            for (var i = 0; i <= valveStat.length - 1; i++) {
                                temp.push('<td class="width18px ' + `${(function () { if (valveStat[i] == 0) { return 'valveClose' } else if (valveStat[i] == 1) { return 'valveOpen' } }).call(this)}` + '">' + String.fromCharCode(i + 65) + '</td>');
                            }
                            return temp.join('');
                        })();

                    + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</td>'
                        + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    $.each(tmpstring.split(/[[\]]{1,2}/), function (key, strcoOrdinates) {
                        if (replaceNull(strcoOrdinates.trim(), ",") === ",") {
                            return;
                        }
                        var tmpArr = [];
                        var latlon = strcoOrdinates.split(",");
                        if (isNaN(latlon[0]) || isNaN(latlon[1])) {
                            // console.warn("polygon id:" + polyRow.polygonId + " has invalid co-ordinate:" + polyRow.coOrdinates + " at " + strCoordinates);
                            return;
                        }

                       

                        var img = '<div class="' + `${(function () { if (mk.devStatus != 1) return 'pinRED'; else if (mk.AlarmState > 0) return 'pinORANGE'; else return 'pinGREEN'; }).call(this)}` + ' bounce" style="border:' + `${(function () { if (mk.mode == 0) return '2px solid yellow'; else return '2px solid blue'; }).call(this)}` + '"><span data-after=' + mk.OnValve + '>' + replaceNull(mk.OnValve, '0') + '</span></div>'
                      
                        // var img = '<svg width="100" height="50"><rect width="100" height="50" style="fill:rgb(0,0,255);stroke-width:10;stroke:rgb(0,0,0)" /></svg>';
                        var icon1 = L.divIcon({
                            html: img,
                            // Specify a class name we can refer to in CSS.
                            className: 'image-icon',
                            // Set a markers width and height.
                            iconSize: [52, 52]
                        });

                        // var CustomIcon = L.divIcon({class:'my-div-icon'},{html:'<div>HI</div>'});


                        tmpArr.push(parseFloat(latlon[0].trim()), parseFloat(latlon[1].trim()));
                        Arrmarker.push(tmpArr);
                        marker = L.marker(new L.LatLng(tmpArr[0], tmpArr[1]), { icon: icon1 })
                            .bindPopup(dyndetails, { closeButton: false });
                        
                            marker1.push(marker);

                        marker.on('mouseover', function (e) {
                            if (!isClicked) {
                                this.openPopup();
                                $(".leaflet-container a.leaflet-popup-close-button").css("display", "none");
                            }
                        })
                            .on('mouseout', function (e) {
                                if (!isClicked) {
                                    this.closePopup();
                                }
                            })
                            .on('click', function () {
                                isClicked = true
                                this.openPopup()
                                $('#'+mk.ChakNo).on('click',function(){
                                    window.location = '/OMSdashboard' + '?id=' + mk.OmsId + '&UID=' + mk.PublishTopic;
                                })
                            })
                            .on('dblclick', function () {
                                window.location = '/OMSdashboard' + '?id=' + mk.OmsId + '&UID=' + mk.PublishTopic;
                            });

                        // marker.on({
                        //     mouseover: function () {
                        //         if (!isClicked) {
                        //             this.openPopup()
                        //         }
                        //     },
                        //     // mouseout: function () {
                        //     //     if (!isClicked) {
                        //     //         this.closePopup()
                        //     //     }
                        //     // }
                        //     // ,
                        //     click: function () {
                        //         isClicked = true
                        //         this.openPopup()
                        //     }
                        // })

                        map.on({
                            click: function () {
                                isClicked = false
                            },
                            popupclose: function () {
                                isClicked = false
                            }
                        })

                        mcg.addLayer(marker);
                    });
                })
				
				 var AmsArrmarker = [];
                $.each(table5, function (p, Ak) {
                    var tempAmsCord = Ak.AmsCoordinate;
                    Arrchakno.push(Ak.AmsNo);
                    hashTable.insert(Ak.AmsNo, Ak.AmsCoordinate);

                    if(Ak.deviceType == 'BPT'){

                    var dynAMSdetail = '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 1020 !important;">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content"  id="' + Ak.AmsNo + '" style="background-color:rgba(0, 0, 0,1);color:white;border-radius:3%; border: 3px solid rgba(255, 249, 249, 0.71);                             width:360px;height:  auto;    CURSOR: POINTER;">'
                        + '<div class="">'
                        + '<table id="tblDev" width="100%" class="tblcolor" style="color:white;" cellpadding="0"; cellspacing="0";>'
                        + '<tbody>'
                        + '<tr>'
                        + '<td colspan="4" class="clsthead">BPT No : ' + Ak.AmsNo + '</td>'
                        + '</tr>'


                        + '<tr>'
                        + '<td class="width84px">Level</td>'
                        + '<td style="border-right: 1px solid white;width: 77px;">: ' + parseFloat(Ak.Pressure).toFixed(2) + ' m</td>'
                        + '<td class="width84px">Door</td>'
                        + '<td>: ' + `${(function () {
                            if (Ak.DI1 == false) {
                                return 'CLOSE';
                            } else if (Ak.DI1 == true) {
                                return 'OPEN';
                            }else{
                                return '-';
                            }
                        }).call(this)}` + '</td>'
                        + '</tr>'



                        // + '<tr>'
                        // + '<td class="width84px">Level :</td>'
                        // + '<td>: ' + parseFloat(Ak.Pressure).toFixed(2) + ' bar</td>'
                        // + '<td></td>'
                        // + '<td></td>'
                        // + '</tr>'
                        // + '<tr>'
                        // + '<td class="width84px">Door :</td>'
                        // + '<td>: ' + `${(function () {
                        //     if (Ak.DI1 == false) {
                        //         return 'CLOSE';
                        //     } else if (Ak.DI1 == true) {
                        //         return 'OPEN';
                        //     }else{
                        //         return '-';
                        //     }
                        // }).call(this)}` + '</td>'
                        // + '<td></td>'
                        // + '<td></td>'
                        // + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';

                    }else{
                        var dynAMSdetail = '<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 1020 !important;">'
                        + '<div class="modal-dialog" role="document">'
                        + '<div class="modal-content"  id="' + Ak.AmsNo + '" style="background-color:rgba(0, 0, 0,1);color:white;border-radius:3%; border: 3px solid rgba(255, 249, 249, 0.71);                             width:360px;height:  auto;    CURSOR: POINTER;">'
                        + '<div class="">'
                        + '<table id="tblDev" width="100%" class="tblcolor" style="color:white;" cellpadding="0"; cellspacing="0";>'
                        + '<tbody>'
                        + '<tr>'
                        + '<td colspan="4" class="clsthead">AMS No : ' + Ak.AmsNo + '</td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Distributory</td>'
                        + '<td>: ' + Ak.description + ' </td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Type of Valve :</td>'
                        + '<td>: ' + replaceNull(Ak.TypeOfVale,'-') + '</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Pressure :</td>'
                        + '<td>: ' + parseFloat(Ak.Pressure).toFixed(2) + ' bar</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '<tr>'
                        + '<td class="width84px">Door :</td>'
                        + '<td>: ' + `${(function () {
                            if (Ak.DI1 == false) {
                                return 'CLOSE';
                            } else if (Ak.DI1 == true) {
                                return 'OPEN';
                            }else{
                                return '-';
                            }
                        }).call(this)}` + '</td>'
                        + '<td></td>'
                        + '<td></td>'
                        + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</div>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    }

                    $.each(tempAmsCord.split(/[[\]]{1,2}/), function (key, AmsCoordinates) {
                        if (replaceNull(AmsCoordinates.trim(), ",") == ",") {
                            return;
                        }
                        var AmsTempArr = [];
                        var Amslatlon = AmsCoordinates.split(",");
                        if (isNaN(Amslatlon[0]) || isNaN(Amslatlon[1])) {
                            return;
                        }

                        if(Ak.deviceType == 'BPT'){

                            var Amsimg = '<div class="' + `${(function () { if (Ak.AmsdevStatus == 0) return 'AmspinRed'; else if (Ak.AmsdevStatus == 1) return 'AmspinGreen'; else return 'Amspin'; }).call(this)}` + ' bounce" style="border:2px solid Black;"><span data-after="AMS">BPT</span></div>';

                            var AMSicon = L.divIcon({
                                html: Amsimg,
                                // Specify a class name we can refer to in CSS.
                                className: 'image-icon',
                                // Set a markers width and height.
                                iconSize: [52, 52]
                            });

                        }else{
                            var Amsimg = '<div class="' + `${(function () { if (Ak.AmsdevStatus == 0) return 'AmspinRed'; else if (Ak.AmsdevStatus == 1) return 'AmspinGreen'; else return 'Amspin'; }).call(this)}` + ' bounce" style="border:2px solid Black;"><span data-after="AMS">AMS</span></div>';

                            var AMSicon = L.divIcon({
                                html: Amsimg,
                                // Specify a class name we can refer to in CSS.
                                className: 'image-icon',
                                // Set a markers width and height.
                                iconSize: [52, 52]
                            });
                        }

                       

                        AmsTempArr.push(parseFloat(Amslatlon[0].trim()), parseFloat(Amslatlon[1].trim()));
                        AmsArrmarker.push(AmsTempArr);
                        AMSmarker = L.marker(new L.LatLng(AmsTempArr[0], AmsTempArr[1]), { icon: AMSicon })
                            .bindPopup(dynAMSdetail, { closeButton: false });

                        AMSMarker1.push(AMSmarker);


                        AMSmarker.on('mouseover', function (e) {
                            if (!isClicked) {
                                this.openPopup();
                                $(".leaflet-container a.leaflet-popup-close-button").css("display", "none");
                            }
                        })
                            .on('mouseout', function (e) {
                                if (!isClicked) {
                                    this.closePopup();
                                }
                            })
                            .on('click', function () {
                                isClicked = true
                                this.openPopup()
                                // $('#' + mk.ChakNo).on('click', function () {
                                //     window.location = '/OMSdashboard' + '?id=' + mk.OmsId + '&UID=' + mk.PublishTopic;
                                // })
                            })
                            .on('dblclick', function () {
                                // window.location = '/OMSdashboard' + '?id=' + mk.OmsId + '&UID=' + mk.PublishTopic;
                            });

                        map.on({
                            click: function () {
                                isClicked = false
                            },
                            popupclose: function () {
                                isClicked = false
                            }
                        })

                        mcg.addLayer(AMSmarker);
                    });
                })
				
				
                map.addLayer(mcg);
                pageLock.Hide();

                $("#getmeter").autocomplete({
                    source: Arrchakno
                });
            }
        })
    }

	 $('#lbloms').on('click', function () {  
        if ($(this).hasClass('a')) {
            $(this).removeClass('a');
            document.getElementById("lbloms").setAttribute(
                "style", "color: red; text-decoration: line-through;"
            )
            $.each(marker1, function (key, temp) {         
                if (table3[key].deviceType == "OMS") {
                    mcg.removeLayer(temp);
                }
            })
            $.each(AMSMarker1, function (k, t) {
                // mcg.removeLayer(t);
                if (table5[k].deviceType == "AMS") {
                    mcg.addLayer(t);
                }
            })
        }
        else {
            $(this).addClass('a');
            document.getElementById("lbloms").setAttribute(
                "style", "color: white; text-decoration: none;"
            )
            $.each(marker1, function (key, temp) {         
                if (table3[key].deviceType == "OMS") {
                    mcg.addLayer(temp);
                }
            })
            $.each(AMSMarker1, function (k, t) {
                mcg.addLayer(t);
                if (table5[k].deviceType == "AMS") {
                    mcg.addLayer(t);
                }
            })
        }
       
    })  
	  $('#lblams').on('click', function () {  
        if ($(this).hasClass('a')) {
            $(this).removeClass('a');
            document.getElementById("lblams").setAttribute(
                "style", "color: red; text-decoration: line-through;"
            )
            $.each(marker1, function (key, temp) {         
                if (table3[key].deviceType == "OMS") {
                    mcg.addLayer(temp);
                }
            })
            $.each(AMSMarker1, function (k, t) {
                // mcg.removeLayer(t);
                if (table5[k].deviceType == "AMS") {
                    mcg.removeLayer(t);
                }
            })
        }
        else {
            $(this).addClass('a');
            document.getElementById("lblams").setAttribute(
                "style", "color: white; text-decoration: none;"
            )
            $.each(marker1, function (key, temp) {         
                if (table3[key].deviceType == "OMS") {
                    mcg.addLayer(temp);
                }
            })
            $.each(AMSMarker1, function (k, t) {
                mcg.addLayer(t);
                if (table5[k].deviceType == "AMS") {
                    mcg.addLayer(t);
                }
            })
        }
       
    })
   
    $('#status').select2({
        theme: "flat"
    });
    $('.chkDeviceTypeSelector').on('focus', function () {
        var previous;
        previous = this.value;
        //console.log(document.querySelector('select.status > option:checked').text.before.createElement('span'));
        //$('select.status > option:checked').before('<span class="checkmark">&#10004;</span>');
        //document.querySelector('select.status > option:checked').text.html('<span class="checkmark">&#10004;</span>')
        $('.chkDeviceTypeSelector').on('change', function () {
            var markerType = $("option:selected", this).val();
            var isChecked = $('.chkDeviceTypeSelector:checked').val() ? true : false;
            // var span = document.createElement('span');
            //     span.innerHTML = '&#10004;';
            //     span.className = 'checkmark';
            // var my_elem = document.querySelector('select.status > option:checked');
            
            // $(span).appendTo(my_elem);

            if (isChecked == true) {
                $.each(marker1, function (key, temp) {
                    if (previous != markerType) {
                        mcg.removeLayer(temp);
                    }
                    switch (markerType) {
                        case "Alarm":
                        //    if (table3[key].AlarmState > 0 && table3[key].devStatus != 1) {
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1){
                                mcg.addLayer(temp);
                            }
                            break;
                        case "No Alarm":
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                            }
                            else {
                                mcg.addLayer(temp)
                            }
                            break;
                        case "Communication Ok":
                        // (table3[key].devStatus == 1 && table3[key].AlarmState < 1)
                            if (table3[key].devStatus == 1) {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "Communication Fail":
                            // if (table3[key].AlarmState < 1 && table3[key].devStatus != 1)
                          if(table3[key].devStatus != 1)
                            {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "Auto Mode":
                            if (table3[key].mode == 0) {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "Manual Mode":
                            if (table3[key].mode == 1 || table3[key].mode == null) {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "Not In Irrigation":
                            if (replaceNull(table3[key].OnValve, '-') == "-") {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "In Irrigation":
                            if (table3[key].OnValve > 0) {
                                mcg.addLayer(temp);
                            }
                            break;
                        case "Clear":
                            mcg.addLayer(temp);
                            break;
                        default:
                            break;
                    }

                })
				  

                // else if (markerType == "TANK") {
                //     map.addLayer(pTank);
                // }
                // else {
                //     map.addLayer(pStation);                    
                // }
                previous = this.value;
            }
        });
    })


    function searchMarker() {
        if (hashTable.length != 0) {
            var meterpos = hashTable.retrieve($('#getmeter').val());
            if (meterpos === undefined || meterpos === null) {
                swal({
                    title: "Site has no/invalid location details",
                    type: "error"
                })
                return;
            }

            var lat = meterpos.split(",")[0];
            var lon = meterpos.split(",")[1];

            if (lat !== undefined && lon !== undefined) {
                map.setView([meterpos.split(",")[0], meterpos.split(",")[1]], `${(function () {
                    if ($("#mtrzoom").prop("checked")) {
                        return 18;
                    } else {
                        return map.getZoom();
                    }
                }).call(this)}`
                )
            }
            else {
                swal({
                    title: "Site has no/invalid location details",
                    type: "error"
                });
            }

            var highlightMarker = L.marker([lat, lon] /**/, {
                icon: hereMarker,
                riseOnHover: true
            });
            highlightMarker.addTo(map).on("click", function (e) {
                map.removeLayer(highlightMarker);
            }).on("mouseover", function (e) {
                map.removeLayer(highlightMarker);
            });

            setTimeout(function () {
                map.removeLayer(highlightMarker);
            }, 10000);
        }
    }


    $('#getmeter').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            searchMarker();
        }
    });



    $('#btnfind').on('click', function () {
        searchMarker();
    });

    $('#lblZoom').on('click', function () {
        // $("#lblZoom").removeClass('btnzoom');
        $('#lblZoom').toggleClass('btnzoom');
    });

});