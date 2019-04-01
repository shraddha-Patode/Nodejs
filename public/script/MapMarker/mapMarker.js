
var MapMarkerJs = function (para) {

    var retStr = "";
    var user = para;

    var ObjArray = [];
    var ObjArrayData = [];
    var ObjArrId = [];

    //DEFINE HTML CODE IN STRING
    this.mapMarkerHtml = "<div class=\"mapMarker-MainDiv\">" +
        "<table class=\"mapMarker\" id=\"X" + para.markerId + "\" style=\"border-spacing:0;width:100%\">\n\
                                    <tr class=\"mapMarker-Header\">\n\
                                        <td colspan=\"3\"> <label>" + para.meterName + " </label> </td> \n\
                                    </tr> " +
        (function () {
            //var jsonObjArray = [];
            //var jsonObjArrayData = [];
            //var jsonObjArrId = [];
            for (key in user) {
                if (user.hasOwnProperty(key)) {
                    if (key.substr(0, 3) == "tag") {
                        ObjArray.push(user[key][0]);
                        ObjArrayData.push(user[key][1]);
                        ObjArrId.push(user[key][2]);
                    }

                }
            }

            for (var i = 0; i <= ObjArray.length - 1; i++) {

                if (ObjArray[i] == 'Meter Size' || ObjArray[i] == 'Installation Date' || ObjArray[i] == 'Owner' || ObjArray[i] == 'Door' || ObjArray[i] == 'Last Updated') {

                    if (ObjArray[i] == 'Door') {
                        retStr += "<tr class=\"mapMarker-tr\" style=\" background-image:url('/images/b50.png') \">\n\
                                                <td> " + ObjArray[i] + " </td>\n\
                                                <td style=\"font-weight:bold\">:</td>\n\
                                                <td id=\"tagid" + ObjArrId[i] + "\" class=\"aaa\" data-tagid=\"" + ObjArrId[i] + "\">" + ObjArrayData[i] + "</td>\n\
                                            </tr> ";
                    }

                } else {
                    retStr += "<tr style=\"color:rgb(148, 215, 105);background-image:url('/images/b51.png')\" class=\"mapMarker-tr\" >\n\
                                                <td> " + ObjArray[i] + " </td>\n\
                                                <td style=\"font-weight:bold\">:</td>\n\
                                                <td id=\"tagid" + ObjArrId[i] + "\" class=\"aaa\" data-tagid=\"" + ObjArrId[i] + "\">" + ObjArrayData[i] + "</td>\n\
                                            </tr> ";


                }
            }
            return retStr + ' <tr> <td colspan="3" style="color:red;height:23px;"> <marquee id="marquee' + para.markerId + '">   </marquee> </td></tr>  </table>';
        }());
}
