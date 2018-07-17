			function ExportToTable() {  
				var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls|.csv)$/;
				
				/*Checks whether the file is a valid excel file*/  
				if (regex.test($("#excelfile").val().toLowerCase())) {  
					var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/ 
					var csvflag = false;
					if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
						xlsxflag = true;  
					}
					if($("#excelfile").val().toLowerCase().indexOf(".csv") > 0){
						csvflag = true;
					}
					/*Checks whether the browser supports HTML5*/  
					if (typeof (FileReader) != "undefined") {  
						var reader = new FileReader();  
						reader.onload = function (e) {  
							var data = e.target.result;  
							/*Converts the excel data in to object*/  
							if (xlsxflag || csvflag) {  
								var workbook = XLSX.read(data, { type: 'binary' });  
							}  
							
							else {  
								var workbook = XLS.read(data, { type: 'binary' });  
							}  
							/*Gets all the sheetnames of excel in to a variable*/  
							var sheet_name_list = workbook.SheetNames;  
							
							/*This is used for restricting the script to consider only first sheet of excel*/  
							sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
								/*Convert the cell value to Json*/  
								if (xlsxflag) {  
									
									var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
									
								}  
								else {  
									var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
								}  
								if (exceljson.length > 0 ) {  
									BindTable(exceljson, '#exceltable');  
									
								}  
							});  
							$('#exceltable').show();  
						}  
						if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
							reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
						}  
						else {  
							reader.readAsBinaryString($("#excelfile")[0].files[0]);  
						}  
					}  
					else {  
						alert("Sorry! Your browser does not support HTML5!");  
					}  
				}  
				else {  
					alert("Please upload a valid Excel file!");  
				}  
			} 
			
			function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
				
				var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/ 
				var temp=createJson(jsondata);
				for (var i = 0; i < jsondata.length; i++) {  
					var row$ = $('<tr/>');  
					for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
						var cellValue = jsondata[i][columns[colIndex]];//jsondata[row][col] 2
						if(cellValue==contact[1].name)
						{
							console.log("cellvalue is printed="+contact[1].name);
							//sheet_name_list.
						} 
						if (cellValue == null)  
						cellValue = "";  
						row$.append($('<td/>').html(cellValue));  
					}  
					$(tableid).append(row$);  
					
					
					
				}  
			}  
			function createJson(data){
				// console.log(data);
				// for(var i=0;i<data.length;i++){
		
				// 	for(var key in datjs){
				// 		console.log(key,90);
						
				//     }
				// 	break;	
				// }
				
				return;
			}
			
			function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
				var columnSet = [];  
				var headerTr$ = $('<tr/>');  
				for (var i = 0; i < jsondata.length; i++) {  
					var rowHash = jsondata[i];  
					for (var key in rowHash) {
						
						if (rowHash.hasOwnProperty(key)) {  
							if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
								console.log("here");
								columnSet.push(key);  
								headerTr$.append($('<th/>').html(key));  
							}  
						}  
					}  
				}  
				$(tableid).append(headerTr$);  
				return columnSet;  
			}  

				//Reading from JSON file
				console.log(contact[0].empid);
				console.log(contact[0].name);
				console.log(contact[1].empid);
				console.log(contact[1].name);
				console.log(contact[2].empid);
				console.log(contact[2].name);
				
		