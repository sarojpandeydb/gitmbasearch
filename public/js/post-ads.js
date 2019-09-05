$(document).ready(function() {
  $("#category-select").on("change", e => {
    var subCat = $("#subcat-select");
    let currCat = e.target.value;
    if (currCat) {
      var request = $.ajax({
        url: "/api/subcategory/" + currCat,
        method: "GET",
        dataType: "json"
      });
      request.done(function(msg) {
        if (msg.length > 0) {
          var output = [];
          $.each(msg, function(key, value) {
            output.push(
              '<option value="' +
                value._id +
                '">' +
                value.subcatname +
                "</option>"
            );
          });
          subCat.append(output.join(""));
        } else {
          subCat.html('<option value="">Sub Category not available</option>');
        }
      });
      request.fail(function(jqXHR, textStatus) {
        console.log("ERROR = " + textStatus);
      });
    }
  });

  /* Country Selection */
  $("#country-select").on("change", e => {
    var currState = $("#state-select");
    let currSelect = e.target.value;

    if (currSelect) {
      var request = $.ajax({
        url: "/api/state/" + currSelect,
        method: "GET",
        dataType: "json"
      });

      request.done(function(msg) {
        if (msg.length > 0) {
          var output = [];
          $.each(msg, function(key, value) {
            output.push(
              '<option value="' +
                value._id +
                '">' +
                value.state_name +
                "</option>"
            );
          });
          currState.append(output.join(""));
        } else {
          currState.html('<option value="">State not available</option>');
        }
      });

      request.fail(function(jqXHR, textStatus) {
        console.log("ERROR = " + textStatus);
      });
    }
  });

  $("#state-select").on("change", e => {
    var currState = $("#select-city");
    let currSelect = e.target.value;
    if (currSelect) {
      var request = $.ajax({
        url: "/api/city/" + currSelect,
        method: "GET",
        dataType: "json"
      });
      request.done(function(msg) {
        if (msg.length > 0) {
          var output = [];
          $.each(msg, function(key, value) {
            output.push(
              '<option value="' +
                value._id +
                '">' +
                value.city_name +
                "</option>"
            );
          });
          currState.append(output.join(""));
        } else {
          currState.html('<option value="">City not available</option>');
        }
      });
      request.fail(function(jqXHR, textStatus) {
        console.log("ERROR = " + textStatus);
      });
    }
  });

  /* End Country Selection */

  $("#summernote").summernote({
    height: 250,
    minHeight: null,
    maxHeight: null,
    focus: false
  });
});
