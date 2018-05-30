const DATASET_AREA = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD"
const DATASET_SAFETY = "https://data.cityofnewyork.us/api/views/bydc-d8tj/rows.json?accessType=DOWNLOAD"
const DATASET_HOUSING = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD"
const DATASET_SHAPES = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson"
const DATASET_MUSEUMS = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD"


var map;
var markerDistanceNeighboorhods = [];
var markerDistanceDistricts = [];
var markerSafe = [];
var markerHousing = [];
var markerHousingDistrics = [];
var markerMaxScore = [];
var markerMuseums = [];
var arrayDataSetArea = [];
var arrayDataSetSafety = [];
var arrayDataSetHousing = [];
var arrayDataSetShapes = [];
var arrayDataSetMuseums = [];
var arrayNeighborhoods = [];
var arrayPoligonDistrict = [];
var arrayCrimesDistri = [];
var arraySafeDistric = [];
var arrayMuseumsDistri = [];
var arrayDistanceNeighborhoods = [];
var arrayDistanceNeighborhoods2 = [];
var arrayDistanceDistrics = [];
var arrayAuxDistance = [];
var arrayAuxDistance2 = [];
var arrayAuxDistance3 = [];
var arrayAuxDistance4 = [];
var arrayAuxHousing = [];
var arrayAuxHousing2 = [];
var arrayAuxHousing3 = [];
var arrayAuxHousing4 = [];
var auxScore = [];
var arrayMaxScore = [];
var arrayDistri = [[,"BRONX"],[,"MANHATTAN"],[,"STATEN ISLAND"],[,"QUEENS"],[,"BROOKLYN"]]
var arrayDistanceNeighborhoodsMiles = ["0.3 mi","0.8 mi","0.9 mi","0.9 mi","1.1 mi","1.2 mi","1.1 mi","1.4 mi","1.7 mi","1.5 mi"];
var arrayDistanceDistricsMiles = [0.5,1.2,2.3,2.2,2.4,3.7,4.2,5.4,6.0,6.3];

var topDistance = [];
var topSafe = [];
var topHousing = [];

var contador = 0;
var controlDist = 0;
var controlSafe = 0;
var controlHous = 0;
var controlTop3 = 0;

function getInfo_DATASETS(URL, array=[]){
	var data = $.get(URL, function(){
		console.log(URL)
	})
		.done( function(){
			for(var i=0;i<data.responseJSON.data.length;i++){
				array.push(data.responseJSON.data[i]);
			}
			//console.log(data.responseJSON.data[3]);

		})
		.fail( function(error){
			console.error(error);
		})
}

function getInfoShapes(URL){
	var data2 = $.getJSON(URL,function(){
		console.log(URL)
	})
		.done(function(){
			for(var i=0;i<data2.responseJSON.features.length;i++){
				arrayDataSetShapes.push(data2.responseJSON.features[i].geometry.coordinates);
			}
			/*
			console.log(data2.responseJSON.features)	  
			console.log(data2.responseJSON.features[0].geometry.coordinates)
			console.log(data2.responseJSON.features[0].geometry.coordinates[0])
			
			console.log(arrayDataSetShapes[0])
			console.log(arrayDataSetShapes[0][0][0])
			
			console.log(arrayDataSetShapes[0][0][0][0])
			console.log(arrayDataSetShapes[0][0][0][1])
			
			console.log(arrayDataSetShapes[1][0][0])
			console.log(arrayDataSetShapes.length)
			console.log(arrayDataSetShapes[0][0].length)
			*/
		})
		.fail( function(error){
			console.error(error);
		})
}


function getDATASETS(){
	getInfo_DATASETS(DATASET_AREA, arrayDataSetArea);
	getInfo_DATASETS(DATASET_SAFETY, arrayDataSetSafety);
	getInfo_DATASETS(DATASET_HOUSING, arrayDataSetHousing);	
	getInfoShapes(DATASET_SHAPES);
	getInfo_DATASETS(DATASET_MUSEUMS, arrayDataSetMuseums);
}
/*
function updateTableAREA(){
	tableref = $("#mainTableBodyAREA")[0];
	var newRow, number, position, name, borough;
	
	for(var i=0;i<arrayDataSetArea.length;i++){
		newRow = tableref.insertRow(tableref.rows.length);
		
		number = newRow.insertCell(0);
		position = newRow.insertCell(1);
		name = newRow.insertCell(2);
		borough = newRow.insertCell(3);
		
		number.innerHTML = arrayDataSetArea[i][8];
		position.innerHTML = arrayDataSetArea[i][9];
		name.innerHTML = arrayDataSetArea[i][10];
		borough.innerHTML = arrayDataSetArea[i][16];
	}
}

function updateTableSAFETY(){
	tableref = $("#mainTableBodySAFETY")[0];
	var newRow, date, time, descrip, type, borough, position;
	
	for(var i=0;i<arrayDataSetSafety.length;i++){
		newRow = tableref.insertRow(tableref.rows.length);
		
		date = newRow.insertCell(0);
		time = newRow.insertCell(1);
		descrip = newRow.insertCell(2);
		type = newRow.insertCell(3);
		borough = newRow.insertCell(4);
		position = newRow.insertCell(5);
		
		date.innerHTML = arrayDataSetSafety[i][9];
		time.innerHTML = arrayDataSetSafety[i][10];
		descrip.innerHTML = arrayDataSetSafety[i][17];
		type.innerHTML = arrayDataSetSafety[i][19];
		borough.innerHTML = arrayDataSetSafety[i][21];
		position.innerHTML = arrayDataSetSafety[i][31][1] + "," +  arrayDataSetSafety[i][31][2];
	}		 
}

function updateTableHOUSING(){
	tableref = $("#mainTableBodyHOUSING")[0];
	var newRow, borough, lat, long, income;
	
	for(var i=0;i<arrayDataSetHousing.length;i++){
		newRow = tableref.insertRow(tableref.rows.length);
		
		borough = newRow.insertCell(0);
		lat = newRow.insertCell(1);
		long = newRow.insertCell(2);
		income = newRow.insertCell(3);
		
		borough.innerHTML = arrayDataSetHousing[i][15];
		lat.innerHTML = arrayDataSetHousing[i][25];
		long.innerHTML = arrayDataSetHousing[i][26];
		income.innerHTML = arrayDataSetHousing[i][31];
	}		 
}
*/
function updateSHAPES(){	
	for(var i=0;i<arrayDataSetShapes.length;i++){
		borough = newRow.insertCell(0);
		lat = newRow.insertCell(1);
		long = newRow.insertCell(2);
		income = newRow.insertCell(3);
		
		borough.innerHTML = arrayDataSetHousing[i][15];
		lat.innerHTML = arrayDataSetHousing[i][25];
		long.innerHTML = arrayDataSetHousing[i][26];
		income.innerHTML = arrayDataSetHousing[i][31][2];
	}		 
}

function onGoogleMapResponse(){
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		zoom: 10,
		center:{lat:40.7291,lng:-73.9965}
	});
	map.data.loadGeoJson(DATASET_SHAPES);
	map.data.setStyle({
		strokeColor: 'blue',
  		strokeWeight: 0.8,
		fillColor: 'grey',
		fillOpacity: 0.1,
	});
	
	var marker = new google.maps.Marker({
		position:{lat:40.7291,lng:-73.9965},
		map: map,
		animation: google.maps.Animation.DROP,
		title:"New York University Stern School of Business"
	})
	getDATASETS();	
}

function drawAllCircles(color){
	for (var i = 0; i < arrayDataSetSafety.length; i++) {
			var circle = new google.maps.Circle({
				strokeColor: "red",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "red",
				fillOpacity: 0.1,
				map: map,
				center: {lat:parseFloat(arrayDataSetSafety[i][29]),lng:parseFloat(arrayDataSetSafety[i][30])},
				radius: 50
			})
	}
}

function asocDistri(){
	var distriAll = [];
	var bounds = new google.maps.LatLngBounds();

	for (j = 0; j < arrayDataSetShapes.length; j++) {
		
		var polyDistri = [];
		for(i = 0; i < arrayDataSetShapes[j][0].length; i++){
			
			var a = arrayDataSetShapes[j][0][i][1];
			var b = arrayDataSetShapes[j][0][i][0];
			polyDistri[i] = new google.maps.LatLng(parseFloat(a),parseFloat(b));
		}
		distriAll[j] = polyDistri;
	}
		
	//------------------ Guia de datos consola ------------
	console.log(polyDistri);
	console.log(polyDistri[0]);
	console.log(polyDistri[294]);
	
	console.log("disAll: " + distriAll.length);
	console.log("disAll 0: " + distriAll[0].length);
	console.log("disAll 70: " + distriAll[70].length);
	
	
	//-------------------- Prueba Lógica y Gráfica para verificaión de coordenada contenida en cierta area-
	var areaDistri= new google.maps.Polygon({
		paths: distriAll[0]
	});
	
	console.log(google.maps.geometry.poly.containsLocation(new google.maps.LatLng(40.595476, -73.991747), areaDistri));
	
	var color;
	if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(40.595476, -73.991747), areaDistri) == true) {
			color = "red"
		}else{
			color = "black"
		}
	
	for (var j = 0; j < arrayDataSetShapes.length; j++) {
		for (var i = 0; i < arrayDataSetShapes[j][0].length; i++) {
			var circle = new google.maps.Circle({
				strokeColor: "orange",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "orange",
				map: map,
				center: {lat:parseFloat(arrayDataSetShapes[j][0][i][1]),lng:parseFloat(arrayDataSetShapes[j][0][i][0])},
				radius: 40
			})
			//bounds.extend({lat:parseFloat(arrayDataSetShapes[1][0][i][1]),lng:parseFloat(arrayDataSetShapes[1][0][i][0])});
	}
	}
	
	/*
	var circle = new google.maps.Marker({
		map: map,
		position: bounds.getCenter(),
		icon : 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
	})	
	*/
	
	var clasZoneTotal = [];
	var clasZone1 = [];
	var aux = 0;
	
	for (i = 0;  i < arrayDataSetSafety.length; i++) {
		var clasZone = [];
		if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(parseFloat(arrayDataSetSafety[i][29]), parseFloat(arrayDataSetSafety[i][30])), areaDistri) == true){
			clasZone[0] = arrayDataSetSafety[i][29];
			clasZone[1] = arrayDataSetSafety[i][30];
			clasZone1[aux] = clasZone;
			aux++;
		}
	}
	clasZoneTotal[0] = clasZone1;
	
		
	for (var i = 0; i < clasZoneTotal[0].length; i++) {
		var circle = new google.maps.Circle({
			strokeColor: "black",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "black",
			fillOpacity: 1,
			map: map,
			center: {lat:parseFloat(clasZoneTotal[0][i][0]),lng:parseFloat(clasZoneTotal[0][i][1])},
			radius: 60
		})
	}
	
}

function neighborhoods() {
	for(var i = 0; i < arrayDataSetArea.length; i++) {
		arrayNeighborhoods[i] = (arrayDataSetArea[i][9].substr(7,(arrayDataSetArea[i][9].length)-8)).split(" ");
	}
	/*	
	for (var i = 0; i < arrayNeighborhoods.length; i++) {
		var circle = new google.maps.Circle({
			strokeColor: "green",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "green",
			fillOpacity: 0.4,
			map: map,
			center: {lat:parseFloat(arrayNeighborhoods[i][1]),lng:parseFloat(arrayNeighborhoods[i][0])},
			radius: 60
		})
	}
	*/
}

function dataDistricts() {
	contador++;
	//......... Draw Neighborhoods.............................
	neighborhoods();
	
	var arrayAllPoligons = [];
	for (var j = 0; j < arrayDataSetShapes.length; j++) {
		var polyDistri = [];
		for(var i = 0; i < arrayDataSetShapes[j][0].length; i++){
			var a = arrayDataSetShapes[j][0][i][1];
			var b = arrayDataSetShapes[j][0][i][0];
			polyDistri[i] = new google.maps.LatLng(parseFloat(a),parseFloat(b));
		}
		arrayAllPoligons[j] = polyDistri;
		
	}
	
	for (var i = 0; i < arrayAllPoligons.length; i++) {
		arrayPoligonDistrict[i] = new Array(7);
	}
	
	for (var i = 0; i < 2; i++) {
		topDistance[i] = new Array(11);
		topDistance[i][0] = 0;
		//topSafe = new Array(2);
		//topHousing = new Array(2);
	}
	
	//.........Pos 0 Poligono Distrito........................
	for (var k = 0; k < arrayAllPoligons.length; k++) {
		var areaDistri= new google.maps.Polygon({
		paths: arrayAllPoligons[k]
		});
		arrayPoligonDistrict[k][0] = areaDistri;
	}	
	
	//.........Pos1 Seguridad.................................
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		var aux = 0;
		var auxArrayCrimes = [];
		for (var j = 0; j < arrayDataSetSafety.length; j++) {
			if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(parseFloat(arrayDataSetSafety[j][29]), parseFloat(arrayDataSetSafety[j][30])), arrayPoligonDistrict[i][0]) == true){
				auxArrayCrimes[aux] = new google.maps.LatLng(parseFloat(arrayDataSetSafety[j][29]), parseFloat(arrayDataSetSafety[j][30]));
				aux = aux+1;
			}
		}
		arrayPoligonDistrict[i][1] = auxArrayCrimes;
	}			

	//.........Pos2 Neighborhoods.............................
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		var aux = 0;
		var auxArrayNeighborhoods = [];
		for (var j = 0; j < arrayNeighborhoods.length; j++) {
			if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(parseFloat(arrayNeighborhoods[j][1]), parseFloat(arrayNeighborhoods[j][0])), arrayPoligonDistrict[i][0]) == true){
				auxArrayNeighborhoods[aux] = new google.maps.LatLng(parseFloat(arrayNeighborhoods[j][1]), parseFloat(arrayNeighborhoods[j][0]));
				aux = aux+1;
			}
		}		
		arrayPoligonDistrict[i][2] = auxArrayNeighborhoods;
	}
	
	/*
	for (var j = 0; j < arrayAllPoligons.length; j++) {
		for (var i = 0; i < arrayPoligonDistrict[j][2].length; i++) {
			var circle = new google.maps.Circle({
				strokeColor: "yellow",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "yellow",
				fillOpacity: 0.5,
				map: map,
				center: arrayPoligonDistrict[j][2][i],
				radius: 80
			})
		}
	}
	*/
		
	
	//.........Pos3 Coord Centro Distrito.............................
	for (var j = 0; j < arrayDataSetShapes.length; j++) {
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < arrayDataSetShapes[j][0].length; i++) {			
			bounds.extend({lat:parseFloat(arrayDataSetShapes[j][0][i][1]),lng:parseFloat(arrayDataSetShapes[j][0][i][0])});
		}
		arrayPoligonDistrict[j][3] = bounds.getCenter();
		/*
		var markerDistanceNeighboorhods1 = new google.maps.Marker({
			map: map,
			position: arrayPoligonDistrict[j][3],
			icon : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
		})
		*/
	}
	
	
	//.........Pos4 Distancia a Centro Distrito.............................
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		var posIni = arrayPoligonDistrict[i][3];
		var posUni = new google.maps.LatLng(40.7291,-73.9965);	
		var distancia = google.maps.geometry.spherical.computeDistanceBetween(posIni, posUni);
		arrayPoligonDistrict[i][4] = distancia;
	}	
		
	
	//.........Pos5 Housing.............................

	for (var j = 0; j < arrayPoligonDistrict.length; j++) {
		arrayPoligonDistrict[j][5] = 0;
	}
	
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		var auxArrayHousing = [];
		for (var j = 0; j < arrayDataSetHousing.length; j++) {
			if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(parseFloat(arrayDataSetHousing[j][25]),parseFloat(arrayDataSetHousing[j][26])), arrayPoligonDistrict[i][0]) == true){
				arrayPoligonDistrict[i][5] += parseInt(arrayDataSetHousing[j][31]);
			}
			//arrayAuxHousing[j] = parseInt(arrayDataSetHousing[j][31].slice());
		}	
		//arrayAuxHousing3[i] = parseInt(arrayPoligonDistrict[i][5]);
		//console.log("dasdsadad: "+ i + ": " + arrayPoligonDistrict[i][4]);
	}
	
	//.........Pos6 Puntaje Ranking Final.............................
	for (var j = 0; j < arrayPoligonDistrict.length; j++) {
		arrayPoligonDistrict[j][6] = 0;
	}
	
	console.log("Termine");
	
}

function distance(){
	if (contador == 0) {
		window.alert("Un momento Por favor");
		//var progreso = 0;
		//progreso +=10;
		//$('#bar').css('width', progreso + '%');
		dataDistricts();
	}
	
	controlDist++;
	
	var index;
	for (var i = 0; i < arrayNeighborhoods.length; i++) {
		var posIni = new google.maps.LatLng(parseFloat(arrayNeighborhoods[i][1]), parseFloat(arrayNeighborhoods[i][0]));
		var posUni = new google.maps.LatLng(40.7291,-73.9965);
		
		var distancia = google.maps.geometry.spherical.computeDistanceBetween(posIni, posUni);
		arrayDistanceNeighborhoods2.push(distancia);
		//console.log("Distancia pos " + i + ": " + arrayDistanceNeighborhoods2[i]);
	}	
	
	for (var j = 0; j < arrayNeighborhoods.length; j++) {
		arrayAuxDistance[j] = arrayDistanceNeighborhoods2[j];
	}
	
	for (var i = 0; i < 10; i++) {
		var minDistance = 1000000000;
		for (var j = 0; j < arrayAuxDistance.length; j++) {
			if (arrayAuxDistance[j] < minDistance) {
				minDistance = arrayAuxDistance[j];
				index = j;
			}	
		}
		arrayAuxDistance2[i] = index;
		arrayAuxDistance[index] = 1000000001;
	}
	
	
	console.log(arrayAuxDistance2.length);
	for (var i = 0; i < arrayAuxDistance2.length; i++) {
		console.log(arrayAuxDistance2[i]);
	}
	
	
	for (var i = 0; i < arrayAuxDistance2.length; i++) {
		var markerDistanceNeighboorhods1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: {lat:parseFloat(arrayNeighborhoods[arrayAuxDistance2[i]][1]),lng:parseFloat(arrayNeighborhoods[arrayAuxDistance2[i]][0])},
			title: "Option #" + (i+1) + " " + arrayDataSetArea[arrayAuxDistance2[i]][10],
			icon : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
		})
		markerDistanceNeighboorhods.push(markerDistanceNeighboorhods1);
	}
	
	/*
	for (var i = 0; i < 10; i++) {	
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		var request = {
			origin:new google.maps.LatLng(parseFloat(arrayNeighborhoods[arrayAuxDistance2[i]][1]), parseFloat(arrayNeighborhoods[arrayAuxDistance2[i]][0])),
			destination:new google.maps.LatLng(40.7291,-73.9965),
			travelMode: google.maps.TravelMode.DRIVING
		};
		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				//alert("todo bien");
				//directionsDisplay.setDirections(response);
				var route = response.routes[0].legs[0].distance.text;
				arrayDistanceNeighborhoods[i] = route;
				console.log(arrayDistanceNeighborhoods[i]);
			}else{
				console.log("error");
			}
		});
	}
	*/

	// Tabla correspondiente...
	
	/*
	tableref = $("#mainTableBodyDISTANCETOP10")[0];
	var newRow, number, position, name, distanceTop;
	
	for(var i = 0;i < 10; i++){
		newRow = tableref.insertRow(tableref.rows.length);
		
		number = newRow.insertCell(0);		
		name = newRow.insertCell(1);
		position = newRow.insertCell(2);
		distanceTop = newRow.insertCell(3);
		
		number.innerHTML = i+1;
		name.innerHTML = arrayDataSetArea[arrayAuxDistance2[i]][10];
		position.innerHTML = arrayNeighborhoods[arrayAuxDistance2[i]]
		distanceTop.innerHTML = arrayDistanceNeighborhoodsMiles[i]; 
	}
	*/
	
			
	//...... Distancia con Centro Distritos ....................................... //
	
	for (var j = 0; j < arrayPoligonDistrict.length; j++) {
		arrayAuxDistance3[j] = arrayPoligonDistrict[j][4];
	}
	
	var index2;
	for (var i = 0; i < 10; i++) {
		var minDistance = 1000000000;
		for (var j = 0; j < arrayAuxDistance3.length; j++) {
			if (arrayAuxDistance3[j] < minDistance && arrayPoligonDistrict[j][1].length > 3) {
				minDistance = arrayAuxDistance3[j];
				index2 = j;
			}	
		}
		arrayAuxDistance4[i] = index2;
		arrayAuxDistance3[index2] = 1000000001;
		console.log("min Distri:" + minDistance);
		
		topDistance[0][i+1] = index2;
		topDistance[1][i+1] = minDistance;
	}
	
	for (var i = 0; i < arrayAuxDistance4.length; i++) {
		console.log(arrayAuxDistance4[i]);
	}
	
	for (var i = 0; i < arrayAuxDistance4.length; i++) {
		var markerDistanceDistricts1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: arrayPoligonDistrict[arrayAuxDistance4[i]][3],
			title: "Option #" + (i+1) + " District #" + arrayAuxDistance4[i],
			icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		})
		markerDistanceDistricts.push(markerDistanceDistricts1);
		arrayPoligonDistrict[arrayAuxDistance4[i]][6] += (20-i);
		//console.log(arrayPoligonDistrict[arrayAuxDistance4[i]][6]);
	}
	
	for (var i = 0; i < 10; i++) {	
		var directionsDisplay = new google.maps.DirectionsRenderer();
		var directionsService = new google.maps.DirectionsService();
		var request = {
			origin:arrayPoligonDistrict[arrayAuxDistance4[i]][3],
			destination:new google.maps.LatLng(40.7291,-73.9965),
			travelMode: google.maps.TravelMode.DRIVING
		};		
		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var route = response.routes[0].legs[0].distance.text;
				arrayDistanceDistrics[i] = route;
				console.log(arrayDistanceDistrics[i]);
			}else{
				console.log("error");
			}
		});
	}
	
	/*
	tableref = $("#mainTableBodyDISTANCETOP10_2")[0];
	var newRow, number, position, district, distanceTop;
	
	for(var i = 0;i < 10; i++){
		newRow = tableref.insertRow(tableref.rows.length);
		
		number = newRow.insertCell(0);		
		district = newRow.insertCell(1);
		position = newRow.insertCell(2);
		distanceTop = newRow.insertCell(3);
		
		number.innerHTML = i+1;
		position.innerHTML = arrayPoligonDistrict[arrayAuxDistance4[i]][3];
		district.innerHTML = [arrayAuxDistance4[i]];
		distanceTop.innerHTML = arrayDistanceDistricsMiles[i] + " mi"; 
	}
	*/
	graphic1(arrayDistanceDistricsMiles);
}

function rankSafetyZone(){
	
	
	if (contador == 0) {
		window.alert("Un momento Por favor");
		dataDistricts();
	}
	
	controlSafe++;
	
	var bronx = 0,island = 0, queens = 0, brooklyn = 0,	manhattan = 0;
	var minCrime;
	var safeDistri;
	
	for (var i = 0; i < arrayDataSetSafety.length; i++) {
		if (arrayDataSetSafety[i][21] == "BRONX") {
			arrayDistri[0][0]=++bronx;
			}
		if (arrayDataSetSafety[i][21] == "MANHATTAN") {
			arrayDistri[1][0]=++manhattan;
		}
		
		if (arrayDataSetSafety[i][21] == "STATEN ISLAND") {
			arrayDistri[2][0]=++island;
		}
		if (arrayDataSetSafety[i][21] == "QUEENS") {
			arrayDistri[3][0]=++queens;
		}
		if (arrayDataSetSafety[i][21] == "BROOKLYN") {
			arrayDistri[4][0]=++brooklyn;
		}
	}
	
	var minCrime = Math.min(bronx,island,queens,brooklyn,manhattan);
	
	for (j = 0; j < arrayDistri.length; j++) {
		if (minCrime == arrayDistri[j][0]) {
			safeDistri = arrayDistri[j][1];
		}
	}

	window.alert("The safest area is: " + safeDistri + " And the safests Districts are indicated in Green in the Map");
	
	//... Rank Top 10 District ...
	var auxArrayPoli = [];
	var index;
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		auxArrayPoli[i] = arrayPoligonDistrict[i].slice();
	}	
	
	for (var j = 0; j < 10; j++) {
		var min_CrimeRank = 100;
		for (var i = 0; i < auxArrayPoli.length; i++) {
			if (auxArrayPoli[i][1].length<min_CrimeRank && auxArrayPoli[i][1].length > 2) {
					min_CrimeRank = auxArrayPoli[i][1].length;
					index = i;
			}
		}
		arraySafeDistric[j] = parseInt(index);
		auxArrayPoli[index][1] = 101;
	}
	
	
	/*
		for (var i = 0; i < arrayDataSetSafety.length; i++) {		
			var circle = new google.maps.Circle({
				strokeColor: "yellow",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: "yellow",
				fillOpacity: 0.5,
				map: map,
				center: new google.maps.LatLng(parseFloat(arrayDataSetSafety[i][29]), parseFloat(arrayDataSetSafety[i][30])),
				radius: 100
			})
		}
	
	*/
	
	for (var j = 0; j < 10; j++) {
		var markerSafe1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: arrayPoligonDistrict[arraySafeDistric[j]][3],
			title: "Option #" + (j+1) + " District #" + arraySafeDistric[j],
			icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		})
		markerSafe.push(markerSafe1);
		arrayPoligonDistrict[arraySafeDistric[j]][6] += (20-j);
		//console.log(arrayPoligonDistrict[arraySafeDistric[j]][6]);
	}
	
	graphic2();
}

function housings() { 
	
	if (contador == 0) {
		window.alert("Un momento Por favor...Estamos buscando los distritos y lugares específicos..Puede tardar un tiempo");
		dataDistricts();
	}
	
	//window.alert("Estamos buscando los distritos y lugares específicos..Puede tardar un tiempo");
	controlHous++;
	
	var index;
	
	for (var j = 0; j < arrayDataSetHousing.length; j++) {
		arrayAuxHousing[j] = parseInt(arrayDataSetHousing[j][31].slice());
	}
	for (var j = 0; j < arrayPoligonDistrict.length; j++) {
		arrayAuxHousing3[j] = parseInt(arrayPoligonDistrict[j][5]);
	}
	
	for (var i = 0; i < 11; i++) {
		var max = -1;
		for (var j = 0; j < arrayDataSetHousing.length; j++) {
			if (arrayAuxHousing[j] > max && arrayDataSetHousing[j][25] != null) {
				max = arrayAuxHousing[j];
				index = j;
			}
		}
		
		arrayAuxHousing2[i] = index;	
		arrayAuxHousing[index] = -2;

		var markerHousing1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: new google.maps.LatLng(parseFloat(arrayDataSetHousing[arrayAuxHousing2[i]][25]),parseFloat(arrayDataSetHousing[arrayAuxHousing2[i]][26])),
			title: "Option #" + (i+1) + " Zone",
			icon : 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
		})
		markerHousing.push(markerHousing1);
	}
	
	/*
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		var aux = 0;
		var auxArrayHousing = [];
		for (var j = 0; j < arrayAuxHousing2.length; j++) {
			if (google.maps.geometry.poly.containsLocation(new google.maps.LatLng(parseFloat(arrayDataSetHousing[arrayAuxHousing2[j]][25]),parseFloat(arrayDataSetHousing[arrayAuxHousing2[j]][26])), arrayPoligonDistrict[i][0]) == true){
				var maxHousing = new google.maps.Marker({
					map: map,
					position: arrayPoligonDistrict[i][3],
					icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
				})
				arrayPoligonDistrict[i][4] += cont[j];
				
				console.log("housings de " + i + ": " + arrayPoligonDistrict[i][4]);
			}
		}	
	}
	*/
	
	var index2;
	
	for (var i = 0; i < 10; i++) {
		var max2 = -1;
		for (var j = 0; j < arrayPoligonDistrict.length; j++) {
			if (arrayAuxHousing3[j] > max2) {
				max2 = arrayAuxHousing3[j];
				index2 = j;
			}
		}
		
		arrayAuxHousing4[i] = index2;	
		arrayAuxHousing3[index2] = -2;
			
		//console.log(max2);
		//console.log(arrayAuxHousing4[i]);

		var markerHousingDistrics1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: arrayPoligonDistrict[arrayAuxHousing4[i]][3],
			title: "Option #" + (i+1) + " District #" + arrayAuxHousing4[i],
			icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		})	
		markerHousingDistrics.push(markerHousingDistrics1);
		arrayPoligonDistrict[arrayAuxHousing4[i]][6] += (20-i);
		//console.log(arrayPoligonDistrict[arrayAuxHousing4[i]][6]);
	}
	
	var aux = [];
	for(var i = 0; i < arrayAuxHousing4.length; i++) {
		aux[i] = arrayPoligonDistrict[arrayAuxHousing4[i]][5];
	}
	
	graphic3();
}
	

function museums() {
	console.log(arrayDataSetMuseums.length);
	console.log(arrayDataSetMuseums);
	
	for(var i = 0; i < arrayDataSetMuseums.length; i++) {
		arrayMuseumsDistri[i] = (arrayDataSetMuseums[i][8].substr(7,(arrayDataSetMuseums[i][8].length)-8)).split(" ");	
		var markerMuseum1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: {lat:parseFloat(arrayMuseumsDistri[i][1]),lng:parseFloat(arrayMuseumsDistri[i][0])},
			title: arrayDataSetMuseums[i][9],
			icon : 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
		})
		markerMuseums.push(markerMuseum1);
	}
	
}


function top3() {
	
	eliminateMarkersTop3();
	controlTop3++;
	var index2;
	
	for (var i = 0; i < arrayPoligonDistrict.length; i++) {
		console.log(i + ": " + arrayPoligonDistrict[i][6]);
		auxScore[i] = arrayPoligonDistrict[i][6];
	}	
	
	for (var i = 0; i < 3; i++) {
		var max2 = -1;
		for (var j = 0; j < arrayPoligonDistrict.length; j++) {
			if (auxScore[j] > max2) {
				max2 = auxScore[j];
				index2 = j;
			}
		}
		
		arrayMaxScore[i] = index2;	
		auxScore[index2] = -2;
		
		var markerMaxScore1 = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			map: map,
			position: arrayPoligonDistrict[arrayMaxScore[i]][3],
			icon : 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
			title: "Distrito #" + arrayMaxScore[i]
		})
		markerMaxScore.push(markerMaxScore1);
	}	
}

function eliminateMarkersTop3() {
	for (var i = 0; i < markerMaxScore.length; i++) {
		markerMaxScore[i].setMap(null);
    }
}

function eliminateMarkersDistance() {
	for (var i = 0; i < markerDistanceDistricts.length; i++) {
		markerDistanceDistricts[i].setMap(null);
    }
}

function eliminateMarkersDistance2() {
	for (var i = 0; i < markerDistanceNeighboorhods.length; i++) {
		markerDistanceNeighboorhods[i].setMap(null);
    }
}

function eliminateMarkerSafe() {
	for (var i = 0; i < markerSafe.length; i++) {
		markerSafe[i].setMap(null);
    }
}

function eliminateMarkersHousing() {
	for (var i = 0; i < markerHousingDistrics.length; i++) {
		markerHousingDistrics[i].setMap(null);
    }
}

function eliminateMarkersHousing2() {
	for (var i = 0; i < markerHousing.length; i++) {
		markerHousing[i].setMap(null);
    }
}

function eliminateMarkersMuseum() {
	for (var i = 0; i < markerMuseums.length; i++) {
		markerMuseums[i].setMap(null);
    }
}

function eliminateAllMarkers() {
	controlTop3 = 0;
	eliminateMarkersTop3();
	eliminateMarkersDistance();
	eliminateMarkersDistance2();
	eliminateMarkerSafe();
	eliminateMarkersHousing();
	eliminateMarkersHousing2();
	eliminateMarkersMuseum();
	d3.select("svg").remove();
	
	for(var i = 0; i < arrayPoligonDistrict.length; i++){
		arrayPoligonDistrict[i][6] = 0;
	}
}

function graphic1(dataset){
	console.log(dataset);
	d3.select("svg").remove();
	var w = 900;
	var h = 350;
	var barPadding = 25;	
	
	var svg = d3.select("body")
		.append("svg")
        .attr("width", w)
        .attr("height", h);
	
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)		
		.attr("width", w / dataset.length - barPadding)
		.attr("height", h)
		.attr("x", function(d, i) {
		return i * (w / dataset.length);
		})
		.attr("y", function(d) {
		return h-d*50;  //Altura menos el dato
		})
		.attr("fill", "teal")
		
	svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
	.text(function(d) {
    return d + " mi";
	})
	.attr("x", function(d, i) {
	return i * (w / dataset.length);
	})
	.attr("y", function(d) {
	return h-d*50+12
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "white")
	.attr("text-anchor", "middle")
	.attr("x", function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
	})
	
	g = svg.append("g").attr("transform", "translate(25,353)");
	
	var xScale = d3.scaleLinear().
		rangeRound([0,w]);
	
	g.append("g")
		.attr("transform", "rotate(0)")
		//.attr("orient","bottom")
		//.attr("translate", "rotate(90)")
		.call(d3.axisTop(xScale))
	
	g.append("path")
		.datum(arrayAuxDistance4)
	
}


function graphic2(){
	
	var dataset = [];
	for(var i = 0; i < arraySafeDistric.length; i++) {
		dataset[i] = arrayPoligonDistrict[arraySafeDistric[i]][1].length;
	}
		
	console.log(dataset);
	d3.select("svg").remove();
	var w = 900;
	var h = 350;
	var barPadding = 25;	
	
	var svg = d3.select("body")
		.append("svg")
        .attr("width", w)
        .attr("height", h);
	
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)		
		.attr("width", w / dataset.length - barPadding)
		.attr("height", h)
		.attr("x", function(d, i) {
		return i * (w / dataset.length);
		})
		.attr("y", function(d) {
		return h-d*25;  //Altura menos el dato
		})
		.attr("fill", "#28A745")
	
	svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
	.text(function(d) {
    return d + " crimes";
	})
	.attr("x", function(d, i) {
	return i * (w / dataset.length);
	})
	.attr("y", function(d) {
	return h-d*25+12
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "white")
	.attr("text-anchor", "middle")
	.attr("x", function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
	})
	
	g = svg.append("g").attr("transform", "translate(25,353)");
	
	var xScale = d3.scaleLinear().
		rangeRound([0,w]);
	
	g.append("g")
		.attr("transform", "rotate(0)")
		.call(d3.axisTop(xScale))
	
	g.append("path")
		.datum(arraySafeDistric)
}



function graphic3(){
	
	var dataset = [];
	for(var i = 0; i < arrayAuxHousing4.length; i++) {
		dataset[i] = arrayPoligonDistrict[arrayAuxHousing4[i]][5];
	}
		
	console.log(dataset);
	d3.select("svg").remove();
	var w = 900;
	var h = 350;
	var barPadding = 25;	
	
	var svg = d3.select("body")
		.append("svg")
        .attr("width", w)
        .attr("height", h);
	
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)		
		.attr("width", w / dataset.length - barPadding)
		.attr("height", h)
		.attr("x", function(d, i) {
		return i * (w / dataset.length);
		})
		.attr("y", function(d) {
		return h-d/4;  //Altura menos el dato
		})
		.attr("fill", "#DC3545")
	
	svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
	.text(function(d) {
    return d + " hs";
	})
	.attr("x", function(d, i) {
	return i * (w / dataset.length);
	})
	.attr("y", function(d) {
	return h-d/4+12
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "white")
	.attr("text-anchor", "middle")
	.attr("x", function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
	})
	
	g = svg.append("g").attr("transform", "translate(25,353)");
	
	var xScale = d3.scaleLinear().
		rangeRound([0,w]);
	
	g.append("g")
		.attr("transform", "rotate(0)")
		.call(d3.axisTop(xScale))
	
	g.append("path")
		.datum(arrayAuxHousing4)
}


function exportDistance() {
	
	var data = [];
	for (var i = 0; i < 10; i++) {
		data[i] = new Array(14);
	}
	for (var i = 0; i < 10; i++) {
		if (controlDist == 0) {
			data[i][0] = "";
			data[i][1] = "";
			data[i][2] = "";
		}else {
			data[i][0] = arrayAuxDistance4[i];
			data[i][1] = arrayPoligonDistrict[arrayAuxDistance4[i]][3];
			data[i][2] = arrayDistanceDistricsMiles[i];
		}
		
		if (controlSafe == 0) {
			data[i][3] = "";
			data[i][4] = "";
			data[i][5] = "";
		}else{
			data[i][3] = arraySafeDistric[i];
			data[i][4] = arrayPoligonDistrict[arraySafeDistric[i]][3];
			data[i][5] = arrayPoligonDistrict[arraySafeDistric[i]][1].length;
		}
		
		if (controlHous == 0){
			data[i][6] = "";
			data[i][7] = "";
			data[i][8] = "";
		}else{
			data[i][6] = arrayAuxHousing4[i];
			data[i][7] = arrayPoligonDistrict[arrayAuxHousing4[i]][3];
			data[i][8] = arrayPoligonDistrict[arrayAuxHousing4[i]][5];
		}
		
	}
	
	for (var i = 0; i < 3; i++) {		
		if (arrayMaxScore.length == 0){
			data[i][9] = "";
		}else if (controlDist == 0){
			data[i][11] = "";	 
	    }else if (controlSafe == 0){
			data[i][12] = "";
		}else if (controlHous == 0) {
			data[i][13] = "";			
		}else{
			data[i][9]  = arrayMaxScore[i];
			data[i][10] = arrayPoligonDistrict[arrayMaxScore[i]][3];
			data[i][11] = arrayDistanceDistricsMiles[i];
			data[i][12] = arrayPoligonDistrict[arrayMaxScore[i]][1];
			data[i][13] = arrayPoligonDistrict[arrayMaxScore[i]][5];
		}
	}
	
    var csv = 'District;Position Lat Lng; Distance;District;Position Lat Lng;#Crimes; District;Position Lat Lng;Affordability; District;Position Lat Lng;Distance;#Crimes;Affordability\n';
    data.forEach(function(row) {
            csv += row.join(';');
            csv += "\n";
    });
    //console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'DistanceTop10.csv';
    hiddenElement.click();
}



$(document).ready( function(){	
	$("#getData").on("click", getDATASETS);
	//$("#updateTable").on("click", updateTableAREA);
	//$("#updateTable").on("click", updateTableSAFETY);
	//$("#updateTable").on("click", updateTableHOUSING);
	$("#updateTable").on("click", dataDistricts);
	$("#safeZoneRank").on("click", rankSafetyZone);
	$("#distancia").on("click", distance);
	$("#housingRank").on("click", housings);
	$("#top3").on("click", top3);
	$("#eliminateMarkersTop3").on("click", eliminateMarkersTop3);
	$("#eliminateMarkersDistance").on("click", eliminateMarkersDistance);
	$("#eliminateMarkersDistance2").on("click", eliminateMarkersDistance2);
	$("#eliminateMarkersSafeZone").on("click", eliminateMarkerSafe);
	$("#eliminateMarkersHousing").on("click", eliminateMarkersHousing);
	$("#eliminateMarkersHousing2").on("click", eliminateMarkersHousing2);
	$("#eliminateMarkerMuseum").on("click", eliminateMarkersMuseum);
	$("#eliminateAllMarkers").on("click", eliminateAllMarkers);
	$("#graphic1").on("click", graphic1);
	$("#exportar").on("click", exportDistance);
	$("#museum").on("click", museums);
})