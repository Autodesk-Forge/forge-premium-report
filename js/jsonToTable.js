/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
document.getElementsByTagName('head')[0].innerHTML +=
	'<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
function ExportToTable() {
	var regex = /^([a-zA-Z0-9\s_\\.\-:()])+(.xlsx|.xls)$/;
	/*Checks whether the file is a valid excel file*/
	if (regex.test($('#excelfile').val().toLowerCase())) {
		var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
		if ($('#excelfile').val().toLowerCase().indexOf('.xlsx') > 0) {
			xlsxflag = true;
		}
		/*Checks whether the browser supports HTML5*/
		if (typeof FileReader != 'undefined') {
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				/*Converts the excel data in to object*/
				if (xlsxflag) {
					var workbook = XLSX.read(data, { type: 'binary' });
				} else {
					var workbook = XLS.read(data, { type: 'binary' });
				}
				/*Gets all the sheetnames of excel in to a variable*/
				var sheet_name_list = workbook.SheetNames;
				console.log(sheet_name_list);
				var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
				sheet_name_list.forEach(function (y) {
					/*Iterate through all sheets*/ /*Convert the cell value to Json*/
					if (xlsxflag) {
						var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
					} else {
						var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
					}
					//Download & View Subscriptions
					//  if (exceljson.length > 0 && cnt == 0) {
					//     BindTable(exceljson, '#subscriptions');
					// }
					//  //Download & View Users
					//  if (exceljson.length > 0 && cnt == 1) {
					//     BindTable(exceljson, '#users');
					// }
					// //Download & View Usage
					// if (exceljson.length > 0 && cnt == 2) {
					//     BindTable(exceljson, '#usage');
					// }
					//Download & View Metadata
					// if (exceljson.length > 0 && cnt == 3) {
					//     BindTable(exceljson, '#metadata');
					// }
					// //Download & View Meta Data Linking
					// if (exceljson.length > 0 && cnt == 1) {
					//     metadata = [];
					//     fetch("metadata.json")
					//         .then(response => response.json())
					//         .then(json => {
					//             metadata = json;
					//             console.log(metadata);
					//             user_metadata1 = [], obj_m_processed = [];
					//             for (var i in exceljson) {
					//                 var obj = { email: exceljson[i].email, name: exceljson[i].team_alias, id: exceljson[i].autodesk_id };
					//                 for (var j in metadata) {
					//                     if (exceljson[i].email == metadata[j].email) {
					//                         obj.GEO = metadata[j].GEO;
					//                         obj.COUNTRY = metadata[j].COUNTRY;
					//                         obj.CITY = metadata[j].CITY;
					//                         obj.PROJECT = metadata[j].PROJECT;
					//                         obj.DEPARTMENT = metadata[j].DEPARTMENT;
					//                         obj.CC=metadata[j].CC;
					//                       obj_m_processed[metadata[j].email] = true;
					//                     }
					//                 }
					//                 obj.GEO = obj.GEO || '-';
					//                 obj.COUNTRY = obj.COUNTRY || '-';
					//                 obj.CITY = obj.CITY || '-';
					//                 obj.PROJECT = obj.PROJECT || '-';
					//                 obj.DEPARTMENT = obj.DEPARTMENT || '-';
					//                 obj.CC = obj.CC || '-';
					//                 user_metadata1.push(obj);
					//             }
					//             for (var j in metadata) {
					//                 if (typeof obj_m_processed[metadata[j].email] == 'undefined') {
					//                     user_metadata1.push({ email: metadata[j].email, name: metadata[j].name, id: metadata[j].autodesk_id,
					//                          GEO: metadata[j].GEO,
					//                          COUNTRY : metadata[j].COUNTRY,
					//                         CITY : metadata[j].CITY,
					//                         PROJECT : metadata[j].PROJECT,
					//                         DEPARTMENT : metadata[j].DEPARTMENT,
					//                         CC:metadata[j].CC
					//                     });
					//                 }
					//             }
					//             document.getElementById("headings4").innerHTML = "MetaData Mapping";
					//            BindTable(user_metadata1, '#user_metadata1');
					//              var createXLSLFormatObj = [];
					//      var xlsHeader = ["email", "name","autodesk_id","GEO","COUNTRY","CITY","PORJECT","DEPARTMENT","COSTCENTER"];
					//      createXLSLFormatObj.push(xlsHeader);
					//      createXLSLFormatObj.push(user_metadata1);
					//      $.each(user_metadata1, function(index, value) {
					//          var innerRowData = [];
					//          $("tbody").append('<tr><td>' + '</td><td>'+ '</td><td>'+'</td></tr>');
					//          $.each(value, function(ind, val) {
					//             innerRowData.push(val);
					//         });
					//          createXLSLFormatObj.push(innerRowData);
					//      });
					//      var filename = "metadata.xlsx";
					//      var ws_name = "metadata";
					//      if (typeof console !== 'undefined') console.log(new Date());
					//      var wb = XLSX.utils.book_new(),
					//          ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
					//      XLSX.utils.book_append_sheet(wb, ws, ws_name);
					//      if (typeof console !== 'undefined') console.log(new Date());
					//      XLSX.writeFile(wb, filename);
					//      if (typeof console !== 'undefined') console.log(new Date());
					//         });
					// }
					// //Download & View Subscription product usage by user per cost center
					if (exceljson.length > 0 && cnt == 2) {
						metadata = [];
						fetch('metadata.json')
							.then((response) => response.json())
							.then((json) => {
								metadata = json;
								(user_metadata = []), (obj_m_processed = []);
								for (var i in exceljson) {
									var obj = {
										autodesk_id: exceljson[i].autodesk_id,
										product_name: exceljson[i].product_name,
									};
									for (var j in metadata) {
										if (exceljson[i].autodesk_id == metadata[j].autodesk_id) {
											obj.CC = metadata[j].CC;
											obj_m_processed[metadata[j].autodesk_id] = true;
										}
									}
									obj.CC = obj.CC || '-';
									user_metadata.push(obj);
								}
								for (var j in metadata) {
									if (typeof obj_m_processed[metadata[j].autodesk_id] == 'undefined') {
										user_metadata.push({
											autodesk_id: metadata[j].autodesk_id,
											product_name: metadata[j].product_name,
											CC: metadata[j].CC,
										});
									}
								}
								document.getElementById('headings').innerHTML = 'Cost Center';
								BindTable(user_metadata, '#costcenter');
								var createXLSLFormatObj = [];
								var xlsHeader = ['autodesk_id', 'product_name', 'cost_center'];
								createXLSLFormatObj.push(xlsHeader);
								createXLSLFormatObj.push(user_metadata);
								$.each(user_metadata, function (index, value) {
									var innerRowData = [];
									$('tbody').append('<tr><td>' + '</td><td>' + '</td><td>' + '</td></tr>');
									$.each(value, function (ind, val) {
										innerRowData.push(val);
									});
									createXLSLFormatObj.push(innerRowData);
								});
								/* File Name */
								var filename = 'costcenter.xlsx';
								/* Sheet Name */
								var ws_name = 'costcenter';
								if (typeof console !== 'undefined') console.log(new Date());
								var wb = XLSX.utils.book_new(),
									ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
								/* Add worksheet to workbook */
								XLSX.utils.book_append_sheet(wb, ws, ws_name);
								/* Write workbook and Download */
								if (typeof console !== 'undefined') console.log(new Date());
								XLSX.writeFile(wb, filename);
								if (typeof console !== 'undefined') console.log(new Date());
							});
					}
					//Download & View license Purchased
					if (exceljson.length > 0 && cnt == 0) {
						document.getElementById('headings1').innerHTML = 'Licenses Purchased';
						BindTable(exceljson, '#exceltable');
						user_p = [];
						const count = {};
						for (var i in exceljson) {
							var obj = {
								team_alias: exceljson[i].team_alias,
								offering_name: exceljson[i].offering_name,
								seat_quantity: exceljson[i].seat_quantity,
							};
							user_p.push(obj);
						}
						BindTable(user_p, '#license_purchased');
						var createXLSLFormatObj = [];
						var xlsHeader = ['team_alias', 'offering_name', 'seat_quantity'];
						createXLSLFormatObj.push(xlsHeader);
						createXLSLFormatObj.push(user_p);
						$.each(user_p, function (index, value) {
							var innerRowData = [];
							$('tbody').append('<tr><td>' + '</td><td>' + '</td><td>' + '</td></tr>');
							$.each(value, function (ind, val) {
								innerRowData.push(val);
							});
							createXLSLFormatObj.push(innerRowData);
						});
						/* File Name */
						var filename = 'license_purchased.xlsx';
						/* Sheet Name */
						var ws_name = 'license_purchased';
						if (typeof console !== 'undefined') console.log(new Date());
						var wb = XLSX.utils.book_new(),
							ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
						/* Add worksheet to workbook */
						XLSX.utils.book_append_sheet(wb, ws, ws_name);
						/* Write workbook and Download */
						if (typeof console !== 'undefined') console.log(new Date());
						XLSX.writeFile(wb, filename);
						if (typeof console !== 'undefined') console.log(new Date());
					}
					//Download & View license  Assigned
					if (exceljson.length > 0 && cnt == 1) {
						document.getElementById('headings2').innerHTML = 'License Assigned';
						user_l = [];
						const count = {};
						for (var i in exceljson) {
							count[exceljson[i].offering_name] = (count[exceljson[i].offering_name] || 0) + 1;
						}
						let count1 = JSON.stringify(count, null, 2);
						user_l.push(count);
						console.log(count1);
						BindTable(user_l, '#license_assigned');
						var createXLSLFormatObj = [];
						var xlsHeader = [
							'Flex',
							'Premium',
							'ArchitectureEngineering&ConstructionCollection',
							'Assemble Office',
							'CFD - Ultimate',
							'Fusion 360 Manage - Enterprise',
							'Product Design & Manufacturing Collection',
							'Vault Professional',
							'InfoDrainage - Ultimate',
							'InfoWater Pro',
							'InfoWorks ICM - Ultimate',
							'Fusion 360',
							'Media & Entertainment Collection',
							'ShotGrid - Subscription',
						];
						createXLSLFormatObj.push(xlsHeader);
						createXLSLFormatObj.push(user_l);
						$.each(user_l, function (index, value) {
							var innerRowData = [];
							$('tbody').append('<tr><td>' + '</td><td>' + '</td><td>' + '</td></tr>');
							$.each(value, function (ind, val) {
								innerRowData.push(val);
							});
							createXLSLFormatObj.push(innerRowData);
						});
						/* File Name */
						var filename = 'license_assigned.xlsx';
						/* Sheet Name */
						var ws_name = 'license_assigned';
						if (typeof console !== 'undefined') console.log(new Date());
						var wb = XLSX.utils.book_new(),
							ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
						/* Add worksheet to workbook */
						XLSX.utils.book_append_sheet(wb, ws, ws_name);
						/* Write workbook and Download */
						if (typeof console !== 'undefined') console.log(new Date());
						XLSX.writeFile(wb, filename);
						if (typeof console !== 'undefined') console.log(new Date());
					}
					//Identify users on the same project(s) using different product version.
					if (exceljson.length > 0 && cnt == 2) {
						metadata1 = [];
						fetch('metadata.json')
							.then((response) => response.json())
							.then((json) => {
								metadata1 = json;
								console.log(metadata1);
								(product_version = []), (obj_m_version = []);
								for (var i in exceljson) {
									var obj = {
										email: exceljson[i].email,
										product_name: exceljson[i].product_name,
										team_alias: exceljson[i].team_alias,
										version: exceljson[i].version,
									};
									for (var j in metadata1) {
										if (exceljson[i].email == metadata1[j].email) {
											obj.PROJECT = metadata1[j].PROJECT;
											obj_m_version[metadata1[j].email] = true;
										}
									}
									obj.PROJECT = obj.PROJECT || '-';
									product_version.push(obj);
								}
								for (var j in metadata1) {
									if (typeof obj_m_version[metadata1[j].email] == 'undefined') {
										product_version.push({
											email: metadata1[j].email,
											product_name: metadata1[j].product_name,
											team_alias: metadata1[j].team_alias,
											version: metadata1[j].version,
											PROJECT: metadata1[j].PROJECT,
										});
									}
								}
								document.getElementById('headings5').innerHTML =
									'Users on the same project(s) using different product versions';
								BindTable(product_version, '#product_version');
								var createXLSLFormatObj = [];
								var xlsHeader = ['email', 'product_name', 'team_alias', 'version', 'PROJECT'];
								createXLSLFormatObj.push(xlsHeader);
								createXLSLFormatObj.push(product_version);
								$.each(product_version, function (index, value) {
									var innerRowData = [];
									$('tbody').append('<tr><td>' + '</td><td>' + '</td><td>' + '</td></tr>');
									$.each(value, function (ind, val) {
										innerRowData.push(val);
									});
									createXLSLFormatObj.push(innerRowData);
								});
								/* File Name */
								var filename = 'product_version.xlsx';
								/* Sheet Name */
								var ws_name = 'product_version';
								if (typeof console !== 'undefined') console.log(new Date());
								var wb = XLSX.utils.book_new(),
									ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
								/* Add worksheet to workbook */
								XLSX.utils.book_append_sheet(wb, ws, ws_name);
								/* Write workbook and Download */
								if (typeof console !== 'undefined') console.log(new Date());
								XLSX.writeFile(wb, filename);
								if (typeof console !== 'undefined') console.log(new Date());
							});
					}
					//
					cnt++;
				});
				$('#exceltable').show();
			};
			if (xlsxflag) {
				/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
				reader.readAsArrayBuffer($('#excelfile')[0].files[0]);
			} else {
				reader.readAsBinaryString($('#excelfile')[0].files[0]);
			}
		} else {
			alert('Sorry! Your browser does not support HTML5!');
		}
	} else {
		alert('Please upload a valid Excel file!');
	}
}
function BindTable(jsondata, tableid) {
	/*Function used to convert the JSON array to Html Table*/
	var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/
	for (var i = 0; i < jsondata.length; i++) {
		var row$ = $('<tr/>');
		for (var colIndex = 0; colIndex < columns.length; colIndex++) {
			var cellValue = jsondata[i][columns[colIndex]];
			if (cellValue == null) cellValue = '';
			row$.append($('<td/>').html(cellValue));
		}
		$(tableid).append(row$);
	}
}
function BindTableHeader(jsondata, tableid) {
	/*Function used to get all column names from JSON and bind the html table header*/
	var columnSet = [];
	var headerTr$ = $('<tr/>');
	for (var i = 0; i < jsondata.length; i++) {
		var rowHash = jsondata[i];
		for (var key in rowHash) {
			if (rowHash.hasOwnProperty(key)) {
				if ($.inArray(key, columnSet) == -1) {
					/*Adding each unique column names to a variable array*/
					columnSet.push(key);
					headerTr$.append($('<th/>').html(key));
				}
			}
		}
	}
	$(tableid).append(headerTr$);
	return columnSet;
}
