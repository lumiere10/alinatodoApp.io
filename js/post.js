$("document").ready(function(){
  $(".addTask").submit(function(){
    var data = {
      "action": "test"
    };
    data = $(this).serialize() + "&" + $.param(data);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "../app.php", 
      data: data,
      success: function(data) {
        $(".return").json(
          "title: " + data["title"] + "<br />Desc: " + data["desc"] +"<br />JSON: " + data["json"]
        );

        alert("Form submitted successfully.\nReturned json: " + data["json"]);
      }
    });
    return false;
  });
});