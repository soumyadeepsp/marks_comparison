var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  var subjects = document.getElementById("subject").value;
  for (i = 0; i < subjects; i++) {
    document.getElementById("subjects").innerHTML =
      document.getElementById("subjects").innerHTML +
      `
	  <div class="form-group">
    <label for="-Scienceinput12">Subject Name. ${i + 1}</label>
    <input type="text" name="Scienceinput12" class="deaths-input form-control" id="marks${i}"/>
  </div>
  <div class="form-group">
    <label for="-Scienceinput12">Marks. ${i + 1}</label>
    <input type="text" name="Scienceinput12" class="deaths-input form-control" id="submarks${i}"/>
  </div>
  <div class="form-group">
    <label for="-input12">Subject no. ${i + 1} Avg marks</label>
    <input type="text" name="input12" class="deaths-input form-control" id="avg${i}"/>
  </div>
  `;
  }
  document.getElementById("subjects").innerHTML =
    document.getElementById("subjects").innerHTML +
    `
    <div id="submit"><button type="button" class="btn btn-primary">Submit</button></div>
    `;
  var submit = document.getElementById("submit");
  submit.addEventListener("click", function () {
    var student_subject = [];
    var student_marks = [];
    var average_marks = [];
    var arr = [];
    var color = [];
    arr.push(["Subjects", "Marks comparison"]);
    for (i = 0; i < subjects; i++) {
      var marksid = "marks" + i;
      var subid = "submarks" + i;
      var avgid = "avg" + i;
      student_subject.push(document.getElementById(marksid).value);
      student_marks.push(document.getElementById(subid).value);
      average_marks.push(document.getElementById(avgid).value);
      if (student_marks[i] > average_marks[i]) {
        color[i] = "green";
      } else if (student_marks[i] < average_marks[i]) {
        color[i] = "red";
      } else {
        color[i] = "orange";
      }

      var c = i + 1;
      arr.push([student_subject[i], parseInt(100 / subjects)]);
    }

    var slices = {};
    var sub = {};

    for (i = 0; i < color.length; i++) {
      slices[i] = { color: color[i] };
      sub[i] = { student_subject: student_subject[i] };
    }
    console.log(slices);
    console.log(arr);

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(arr);

      var options = {
        title: "Marks comparison",
        slices: slices,
        legend: "none",
        pieSliceText: "label",
        tooltip: { trigger: "none" },
      };

      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );

      chart.draw(data, options);
    }
    var left = document.getElementById("left");
    left.innerHTML =
      left.innerHTML +
      `<div id="piechart" style="width: 900px; height: 500px;"></div>`;
  });
});
