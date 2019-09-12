socket.on('saveplaces', function(msg){
var baselat;var baselng;
var frmar=msg.split("&");
var infovar="";var baselat="";var baselng="";
for(var i=0;i<=frmar.length-1;i++){
 var prmar=frmar[i].split('=');

 switch(prmar[0]){
case "baselat":
   baselat=prmar[1];
  break;
  case "baselng":
   baselng=prmar[1];
  break;
  case "info":
   infovar=prmar[1];
var pieces = infovar.split("nndd");
   for(var j=0;j<=(pieces.length)-1;j++){
    var str0=pieces[j];
    var ar2=str0.split("nnpp");
    var pieces2 = ar2;//pieces[i].split("nnpp");
    //lat, lng, id, name, placeid, types, vincity
     var urlx = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + ar2[4] + "&fields=address_component,adr_address,formatted_address,geometry/viewport,geometry/location,icon,name,permanently_closed,photos,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,reviews,user_ratings_total&key=AIzaSyC2NOpcDO_lkIMXTiYVNJPATOEFRnOvDZ0";  
     var urlx2 = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + ar2[4] + "&fields=website&key=AIzaSyC2NOpcDO_lkIMXTiYVNJPATOEFRnOvDZ0";  
      var allinfo;var website;
      var request = require('request');
      var propertiesObject = {};
 request({url:urlx, qs:propertiesObject}, function(err, response, body) {
  if(err) { console.log("**ERROR: "+err); return; }
  allinfo=body;

  request({url:urlx2, qs:propertiesObject}, function(err, response, body) {
   if(err) { console.log("**ERROR: "+err); return; }
   website=body;
try{
website=website.split("website")[1].split(":")[1]+":"+website.split("website")[1].split(":")[2].split("}")[0].trim();
}catch(ex){website=body;}
website=replaceallstr(website,'"','');
var dnow="dnow";
var s_flst="dinfo,ddate,dbaselng,dbaselat,dweb,dlng,dlat,dname";
var s_vlst="#sq#" + allinfo + "#sq#,#sq#" + dnow + "#sq#,#sq#" + baselng + "#sq#,#sq#" + baselat + "#sq#,#sq#" + website + "#sq#,#sq#" + pieces2[1] + "#sq#,#sq#" + pieces2[0] + "#sq#,#sq#" + pieces2[3] + "#sq#";
var s_where="(dlng=#sq#" + baselng + "#sq#) and (dlat=#sq#" + baselat + "#sq#)";
var propertiesObject2 = { api:"sql",cmd:"insertorupdate",project:"ipozal", tablename: "ipz_place", flst: s_flst, vls: s_vlst, where: s_where, device: socket.device  };
var datax=s_flst+"\r\n"+s_vlst+"\r\n\r\n";
fs.appendFile('placeQ.txt',datax, 'utf8',
    function(err) { 
        if (err) throw err;
        console.log("Data is appended to file successfully.")
});

  });
 });

    }
  break;
  
 }
}
});
