function showTablesDataset(data_table) {
  data = { data_option: data_table.getAttribute("name") };
  console.log("data before ajax", data);
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/dataset",
    data: data,
    dataType: "json",
    success: function (data) {
      console.log("data_option after 1st ajax:", data);
      // use the response to from get request (path of csv file) as url
      $.ajax({
        type: "GET",
        url: data.data_path,
        dataType: "text",
        success: function (data) {
          var evaluation_data = data.split(/\r?\n|\r/);
          var table_data =
            '<table class="table table-bordered evaluation" id="dataTable">';

          for (var count = 0; count < evaluation_data.length; count++) {
            var cell_data = evaluation_data[count].split(":::");
            table_data += "<tr>";
            for (
              var cell_count = 0;
              cell_count < cell_data.length;
              cell_count++
            ) {
              if (count === 0) {
                table_data += "<th>" + cell_data[cell_count] + "</th>";
              } else {
                table_data += "<td>" + cell_data[cell_count] + "</td>";
              }
            }
            table_data += "</tr>";
          }
          table_data += "</table>";
          $(data_table).html(table_data);
        },
      });
    },
  });
}

showTablesDataset(data_table);
showTablesDataset(data_table_2);

// ###########################################################################

// data_path = "../Assets/Data/sample/data_clean_sample_final.csv";
// data_path_2 = "../Assets/Data/sample/data_stem_sample_final.csv";
// function showTablesDataset(data_path, data_table) {
//   $.ajax({
//     type: "GET",
//     url: data_path,
//     dataType: "text",
//     success: function (data) {
//       var evaluation_data = data.split(/\r?\n|\r/);
//       var table_data =
//         '<table class="table table-bordered evaluation" id="dataTable">';

//       for (var count = 0; count < evaluation_data.length; count++) {
//         var cell_data = evaluation_data[count].split(":::");
//         table_data += "<tr>";
//         for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
//           if (count === 0) {
//             table_data += "<th>" + cell_data[cell_count] + "</th>";
//           } else {
//             table_data += "<td>" + cell_data[cell_count] + "</td>";
//           }
//         }
//         table_data += "</tr>";
//       }
//       table_data += "</table>";
//       $(data_table).html(table_data);
//     },
//   });
// }

// showTablesDataset(data_path, data_table);
// showTablesDataset(data_path_2, data_table_2);
