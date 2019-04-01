
$(document).ready(function () {
    var pageLock = new PageLock({});
    // $('.area').append(dynNav);
    //  pageLock.Show({ message: "Fetching page Data" });
    loadMap();

    var InnerCol = [];
    var map, hereMarker, marker;
    var marker1 = [];
    var AMSMarker1 = [];
    var poly;
    var table1;
    var temp = [];
    var Arrchakno = [];
    var kmllayer;
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


    function loadMap() {
        ServerCall({
            paras: {},
            apiCall: '/loadMap',
            successFunc: (data) => {
                var table = data[0][0];
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

                kmllayer = new L.KML("../script/Mohan.kml", { async: true })
                kmllayer.on("loaded", function (e) {
                    map.fitBounds(e.target.getBounds())
                });
                map.addLayer(kmllayer);

                document.getElementById('lblkml').addEventListener('click', function () {
                    if (map.hasLayer(kmllayer)) {
                        map.removeLayer(kmllayer);
                        document.getElementById("lblkml").setAttribute(
                            "style", "color: red; text-decoration: line-through;");
                    } else {
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

            }
        });
    }


    function ViewMap(distributoryid) {
        removeMarker();
        marker1 = [];
        AMSMarker1 = [];
        ServerCall({
            paras: {
                distributoryid: distributoryid
            },
            apiCall: '/scadaConfig',
            successFunc: (data) => {
                var table1 = data[0];
                table2 = data[1];
                table3 = data[2];
                table4 = data[3];
                table5 = data[4];
                debugger;
                lblFilter = data[5][0];

              
                $('#lblAll').text(lblFilter.All);
                $('#lblComm').text(lblFilter.CommunicationOk);
                $('#lblCommFail').text(lblFilter.CommunicationFail);
                $('#lblAlarm').text(lblFilter.Alarm);
                $('#lblNoAlarm').text(lblFilter.NoAlarm);
                $('#lblAutoMode').text(lblFilter.AutoMode);
                $('#lblManual').text(lblFilter.ManualMode);
                $('#lblIrri').text(lblFilter.InIrrigation);
                $('#lblNoIrri').text(lblFilter.NotInIrrigation);


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

                        marker.bindTooltip('<div class="txtColor"><label class="lblColor">' + mk.ChakNo + '</label></div>', { permanent: true, opacity: 1, position: 'top', }).openTooltip();

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
                                $('#' + mk.ChakNo).on('click', function () {
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

                    if (Ak.deviceType == 'BPT') {

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
                                } else {
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

                    } else {
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
                            + '<td>: ' + replaceNull(Ak.TypeOfVale, '-') + '</td>'
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
                                } else {
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

                        if (Ak.deviceType == 'BPT') {

                            var Amsimg = '<div class="' + `${(function () { if (Ak.AmsdevStatus == 0) return 'AmspinRed'; else if (Ak.AmsdevStatus == 1) return 'AmspinGreen'; else return 'Amspin'; }).call(this)}` + ' bounce" style="border:2px solid Black;"><span data-after="AMS">BPT</span></div>';

                            var AMSicon = L.divIcon({
                                html: Amsimg,
                                // Specify a class name we can refer to in CSS.
                                className: 'image-icon',
                                // Set a markers width and height.
                                iconSize: [52, 52]
                            });

                        } else {
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

                        var TooltipClass = { 'className': 'class-tooltip' }
                        AMSmarker.bindTooltip('<div class="txtColor"><label class="lblColor">' + Ak.AmsNo + '</label></div>', { permanent: true, opacity: 1 }, TooltipClass).openTooltip();

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
                                if (Ak.deviceType == "AMS") {
                                    window.location = '/amsDetail' + '?id=' + Ak.AmsId + '&UID=' + Ak.PublishTopic;
                                }
                                else {
                                    window.location = '/BptDetail' + '?id=' + Ak.AmsId;
                                }
                            })
                            .on('dblclick', function () {
                                if (Ak.deviceType == "AMS") {
                                    window.location = '/amsDetail' + '?id=' + Ak.AmsId + '&UID=' + Ak.PublishTopic;
                                }
                                else {
                                    window.location = '/BptDetail' + '?id=' + Ak.AmsId;
                                }
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

    // On click of OMS
    $('#lbloms').on('click', function () {
        if ($(this).hasClass('a')) {
            // $(this).removeClass('a');

            if ($('#lbloms').hasClass('clsOmscolor')) {
                $('#lbloms').removeClass('clsOmscolor');
            }
            else {
                $('#lbloms').addClass('clsOmscolor');
            }

            if ($('#lblams').hasClass('clsAmscolor')) {
                AddAndRemoveOMS();

                // $.each(marker1, function (key, temp) {
                //     if (table3[key].deviceType == "OMS") {
                //         mcg.removeLayer(temp);
                //     }
                // })
                // $.each(AMSMarker1, function (k, t) {
                //     if (table5[k].deviceType == "AMS") {
                //         mcg.removeLayer(t);
                //     }
                // })
            }
            // check

            else {
                AddAndRemoveOMS();
            }
        }
        // else comdition
        else {
            // $(this).addClass('a');
            if ($('#lbloms').hasClass('clsOmscolor')) {
                $('#lbloms').removeClass('clsOmscolor');
            }
            else {
                $('#lbloms').addClass('clsOmscolor');
            }


            if ($('#lblams').hasClass('clsAmscolor')) {
                $.each(AMSMarker1, function (k, t) {
                    // mcg.removeLayer(t);
                    if (table5[k].deviceType == "AMS") {
                        mcg.removeLayer(t);
                    }
                })
            }
            AddAndRemoveOMS();
        }
    })
    // on click of AMS
    $('#lblams').on('click', function () {
        if ($(this).hasClass('a')) {
            // $(this).removeClass('a');

            if ($('#lblams').hasClass('clsAmscolor')) {
                $('#lblams').removeClass('clsAmscolor');
            } else {
                $('#lblams').addClass('clsAmscolor');
            }

            if ($('#lbloms').hasClass('clsOmscolor')) {
                AddAndRemoveAMS();
                // $.each(marker1, function (key, temp) {
                //     if (table3[key].deviceType == "OMS") {

                //         mcg.removeLayer(temp);
                //     }
                //     else {
                //         mcg.removeLayer(temp);
                //     }
                // })
                // $.each(AMSMarker1, function (k, t) {
                //     if (table5[k].deviceType == "AMS") {
                //         mcg.removeLayer(t);
                //     }
                // })
            }
            // check
            else {
                AddAndRemoveAMS();
            }
        }
        // else condition

        else {
            // $(this).addClass('a');
            if ($('#lblams').hasClass('clsAmscolor')) {
                $('#lblams').removeClass('clsAmscolor');
            } else {
                $('#lblams').addClass('clsAmscolor');
            }
            // $('#lblams').addClass('clsAms');
            // $('#lblams').removeClass('clsAmscolor');

            if ($('#lbloms').hasClass('clsOmscolor')) {
                $.each(marker1, function (key, temp) {
                    if (table3[key].deviceType == "OMS") {
                        mcg.removeLayer(temp);
                    }
                })
                $.each(AMSMarker1, function (k, t) {
                    if (table5[k].deviceType == "AMS") {
                        // mcg.addLayer(t);
                        AddAndRemoveAMS();
                    }
                })
            }
            else {
                AddAndRemoveAMS();
            }
        }
    })

    // function formatCount (option) {
    //     console.log(option);
    //     if (!option.id) { return option.text; }
    //     var ob = option.text + '<span>10</span>';	// replace image source with option.img (available in JSON)
    //     return ob;
    // };
    // var x = 89;
    // document.getElementById('lblAll').textContent = '10';

    // $('#status').select2({
    //     theme: "flat",
    //     templateResult: formatCount,
    //     templateSelection: function (option) {
    //         if (option.id.length > 0 ) {
    //             return option.text + "<i class='fa fa-dot-circle-o'></i>";
    //         } else {
    //             return option.text;
    //         }
    //     },
    //   escapeMarkup: function (m) {
    // 			return m;
    // 		}
    // });



    ///// AMS REMOVE MARKER
    // AddAndRemoveAMS();
    function AddAndRemoveAMS() {
        var arrAMS = [];
        arrAMS.push(AMSMarker1);
        previous = this.value;
        var markerType =DataValue;
        // var markerType = $("option:selected", this).val();
        var isChecked = DataValue ? true : false;

        if (isChecked) {
            $.each(arrAMS[0], function (k, tem) {
                if (previous != markerType) {
                    mcg.removeLayer(tem);
                }
                switch (markerType) {
                    case "Alarm":
                        // After Alarmstate tag add do comment to uncomment

                        if ($('#lblams').hasClass('clsAmscolor')) {
                            if (table5[k].deviceType == 'AMS') {
                                if (table5[k].AlarmState > 0 && table3[key].AmsdevStatus == 1) {
                                    mcg.removeLayer(tem);
                                }
                            }
                            else {
                                mcg.addLayer(tem);
                            }
                        }
                        else {
                            if (table5[k].AlarmState > 0 && table3[key].AmsdevStatus == 1) {
                                mcg.addLayer(tem);
                            }
                            else {
                                if ((table5[k].deviceType == 'BPT')) {
                                    mcg.addLayer(tem);
                                }
                            }
                        }
                        break;
                    case "No Alarm":
                        // After Alarmstate tag add do comment to uncomment

                        if ($('#lblams').hasClass('clsAmscolor')) {
                            if (table5[k].AlarmState > 0 && table5[k].AmsdevStatus == 1) {
                            }
                            else {
                                if (table5[k].deviceType == 'AMS') {
                                    mcg.removeLayer(tem)
                                }
                                else {
                                    mcg.addLayer(tem)
                                }
                            }
                        }
                        else {
                            if (table5[k].AlarmState > 0 && table5[k].AmsdevStatus == 1) {
                            }
                            else {
                                mcg.addLayer(tem)

                            }
                        }
                        break;
                    case "Communication Ok":
                        debugger;
                        if ($('#lblams').hasClass('clsAmscolor')) {
                            if (table5[k].deviceType == 'AMS') {
                                // if (table5[k].AmsdevStatus == 1) {
                                mcg.removeLayer(tem);
                                // }
                            }
                            else {
                                mcg.addLayer(tem);
                            }
                        }
                        else {
                            if (table5[k].deviceType == 'AMS') {
                                if (table5[k].AmsdevStatus == 1) {
                                    mcg.addLayer(tem);
                                }
                            }
                            else {
                                if (table5[k].deviceType == 'BPT') {
                                    mcg.addLayer(tem);
                                    // $('#lblams').addClass('clsAmscolor');
                                }
                            }
                        }
                        break;
                    case "Communication Fail":
                        if ($('#lblams').hasClass('clsAmscolor')) {
                            if (table5[k].deviceType == 'AMS') {
                                if (table5[k].AmsdevStatus != 1) {
                                    mcg.removeLayer(tem);
                                }
                            }
                            else {
                                if (table5[k].deviceType == 'BPT') {
                                    mcg.addLayer(tem);
                                    // $('#lblams').addClass('clsAmscolor');
                                }
                            }
                        }
                        else {
                            if (table5[k].deviceType == 'AMS') {
                                if (table5[k].AmsdevStatus != 1) {
                                    mcg.addLayer(tem);
                                }
                            }
                            else {
                                if (table5[k].deviceType == 'BPT') {
                                    mcg.addLayer(tem);
                                    // $('#lblams').addClass('clsAmscolor');
                                }
                            }
                        }

                        break;
                    case "Auto Mode":

                        if (table5[k].deviceType == 'BPT') {
                            mcg.addLayer(tem);
                        }
                        break;

                    case "Manual Mode":

                        if (table5[k].deviceType == 'BPT') {
                            mcg.addLayer(tem);
                        }
                        break;
                    case "Not In Irrigation":

                        if (table5[k].deviceType == 'BPT') {
                            mcg.addLayer(tem);
                        }
                        break;
                    case "In Irrigation":
                        if (table5[k].deviceType == 'BPT') {
                            mcg.addLayer(tem);
                        }
                        break;
                    case "All":
                        if ($('#lblams').hasClass('clsAmscolor')) {
                            if (table5[k].deviceType == 'AMS') {
                                mcg.removeLayer(tem);
                            }
                            else {
                                mcg.addLayer(tem);
                            }
                        }
                        else {
                            mcg.addLayer(tem);
                        }

                        break;
                    default:
                        break;
                }
            })
            previous = this.value;
        }
    }
 
    // AddAndRemoveOMS();
    function AddAndRemoveOMS() {
        var arrOMS = [];
        arrOMS.push(marker1);
        previous = this.value;
        var markerType =DataValue;
        // var markerType = $("option:selected", this).val();
        // var isChecked = $('.chkDeviceTypeSelector:checked').val() ? true : false;
        var isChecked = DataValue ? true : false;

        if (isChecked == true) {
            $.each(arrOMS[0], function (key, tempory) {
                if (previous != markerType) {
                    mcg.removeLayer(tempory);
                }
                debugger
                switch (markerType) {
                    
                    case "Alarm":
                        //    if (table3[key].AlarmState > 0 && table3[key].devStatus != 1) {
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    // case "No Alarm":
                    //     debugger;
                    //     if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                    //     }
                    //     else {
                    //         mcg.addLayer(tempory)
                    //     }
                    //     break;
                    case "No Alarm":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                            }
                            else {
                                mcg.removeLayer(tempory)
                            }
                        }
                        else {
                            if (table3[key].AlarmState > 0 && table3[key].devStatus == 1) {
                            }
                            else {
                                mcg.addLayer(tempory)
                            }
                        }
                        break;

                    case "Communication Ok":
                        // (table3[key].devStatus == 1 && table3[key].AlarmState < 1)
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].devStatus == 1) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].devStatus == 1) {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    case "Communication Fail":
                        // if (table3[key].AlarmState < 1 && table3[key].devStatus != 1)
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].devStatus != 1) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].devStatus != 1) {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    case "Auto Mode":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].mode == 0) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].mode == 0) {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    case "Manual Mode":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].mode == 1 || table3[key].mode == null) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].mode == 1 || table3[key].mode == null) {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    case "Not In Irrigation":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (replaceNull(table3[key].OnValve, '-') == "-") {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (replaceNull(table3[key].OnValve, '-') == "-") {
                                mcg.addLayer(tempory);
                            }
                        }
                        break;
                    case "In Irrigation":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            if (table3[key].OnValve > 0) {
                                mcg.removeLayer(tempory);
                            }
                        }
                        else {
                            if (table3[key].OnValve > 0) {
                                mcg.addLayer(tempory);
                            }
                        }

                        break;
                    case "All":
                        if ($('#lbloms').hasClass('clsOmscolor')) {
                            mcg.removeLayer(tempory);
                        }
                        else {
                            mcg.addLayer(tempory);
                        }

                        break;
                    default:
                        break;
                }
            })
            previous = this.value;
        }
    }

    $('.filter-list-item').on('click', function () {
        debugger;
        DataValue = $(this).data('value');
        $('#filter-dropdown-button span').text($(this).text()).parent().attr('data-value', DataValue);
     
        $('#filter-dropdown_list').toggleClass('active');
        $(this).val() + '&nbsp;'.repeat($(this).val().length)
       
        // ($('.select-dropdown__button')[2].innerText).css({'white-space':'pre'})
      var previous = this.value;
        AddAndRemoveAMS();
        AddAndRemoveOMS();
    })

    // $('.filter-list-item').on('focus', function () {
    //     debugger;
    //     var previous;
    //     previous = this.value;
    //     $('.filter-list-item').on('change', function () {
    //         AddAndRemoveAMS();
    //         AddAndRemoveOMS();
    //     });
    // })

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



    // Area dropdown List 
    getAreaList();
    function getAreaList() {
        ServerCall({
            paras: {},
            apiCall: '/getAreaList',
            successFunc: (data) => {
                var table = data[0];
                for (var i = 0; i <= table.length - 1; i++) {
                    $('#Area-dropdown_list').append('<li data-value=' + table[i].Areaid + ' class="Area-list-item Area">' + table[i].AreaName + '</li>');
                }
                $('#Area-dropdown-button').on('click', function () {
                    $('#Area-dropdown_list').toggleClass('active');
                });
           
                $('.Area').on('click', function () {
                    var itemValue = $(this).data('value');
                    getDistributoryList(itemValue);


                    // console.log(itemValue);
                    $('#Area-dropdown-button span').text($(this).text()).parent().attr('data-value', itemValue);
                    $('#Area-dropdown_list').toggleClass('active');
                });
            }
        })
    }
    // end of Area DropDown List


    // Distributory dropdown List 
    function getDistributoryList(areaid) {

        $('#Loader').removeClass('cssload-speeding-wheel');
        $('#Loader').addClass('cssload-speeding-wheel');
        $('#Distri-dropdown-button').css('-webkit-filter', 'blur(1px)');
        $('#Distri-dropdown_list').empty('');

        ServerCall({
            paras: {
                areaid: areaid
            },
            apiCall: '/getDistriList',
            successFunc: (data) => {
                var table = data[0];
                if (table.length > 0) {
                    $('#Distri-dropdown_list').append('<li data-value="none" class="Distri-list-item">NONE</li>');

                    for (var i = 0; i <= table.length - 1; i++) {

                        $('#Distri-dropdown_list').append('<li data-value=' + table[i].Id + ' class="Distri-list-item">' + table[i].Description + '</li>');
                    }
                    $('#Distri-dropdown_list').append('<li data-value="All" class="Distri-list-item">All</li>');
                    $('#spnDistri').text("Ditributory");

                    /// List Item On Click
                    $('.Distri-list-item').on('click', function () {
                        var itemValue = $(this).data('value');
                        if (itemValue == 'none') {
                            if (!(map.hasLayer(kmllayer))) {
                                map.addLayer(kmllayer);
                                document.getElementById("lblkml").setAttribute(
                                    "style", "color: white; text-decoration: none;");
                            }
                            if ($('#lblams').hasClass('clsAmscolor')) {
                                $('#lblams').removeClass('clsAmscolor');
                            }
                            if ($('#lbloms').hasClass('clsOmscolor')) {
                                $('#lbloms').removeClass('clsOmscolor');
                            }
                            removeMarker();
                        } else {
                            if (!(map.hasLayer(kmllayer))) {
                                map.addLayer(kmllayer);
                                document.getElementById("lblkml").setAttribute(
                                    "style", "color: white; text-decoration: none;");
                            }
                            if ($('#lblams').hasClass('clsAmscolor')) {
                                $('#lblams').removeClass('clsAmscolor');
                            }
                            if ($('#lbloms').hasClass('clsOmscolor')) {
                                $('#lbloms').removeClass('clsOmscolor');
                            }
                            ViewMap(itemValue);
                        }

                        $('#Distri-dropdown-button span').text($(this).text()).parent().attr('data-value', itemValue);
                        $('#Distri-dropdown_list').toggleClass('active');
                    });

                    $('#Loader').removeClass('cssload-speeding-wheel');
                    $('#Distri-dropdown-button').css('-webkit-filter', 'blur(0px)');
                }
                else {
                    $('#spnDistri').text("NO DATA..");
                    $('#Loader').removeClass('cssload-speeding-wheel');
                    $('#Distri-dropdown-button').css('-webkit-filter', 'blur(0px)');
                    removeMarker();
                }

                /// Distributory Button On CLick
                $('#Distri-dropdown-button').on('click', function () {
                    if ($('#Distri-dropdown_list').hasClass('active')) {
                        $('#Distri-dropdown_list').removeClass('active');
                    } else if (!($('#Distri-dropdown_list').hasClass('active'))) {
                        $('#Distri-dropdown_list').removeClass('active');
                        $('#Distri-dropdown_list').addClass('active');
                    }
                });
            }
        })
    }
    // end of Distributory DropDown List


    function removeMarker() {
        if (marker != undefined) {
            $.each(marker1, function (key, mark) {
                mcg.removeLayer(mark);
            });
            if (AMSmarker != undefined) {
                $.each(AMSMarker1, function (key, AMS) {
                    mcg.removeLayer(AMS);
                })
            }
            map.removeLayer(mcg);
        }
    }


  

    $('#filter-dropdown-button').on('click', function () {
        debugger;
        if ($('#filter-dropdown_list').hasClass('active')) {
            $('#filter-dropdown_list').removeClass('active');
        } else if (!($('#filter-dropdown_list').hasClass('active'))) {
            $('#filter-dropdown_list').removeClass('active');
            $('#filter-dropdown_list').addClass('active');
        }
    });

});