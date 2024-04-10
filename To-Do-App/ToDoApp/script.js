var days = document.querySelectorAll('#daysList li');
var selectedDay = document.getElementById('selectedDay');

for (var i = 0; i < days.length; i++) {
    days[i].addEventListener('click', function() {
        selectedDay.textContent = this.textContent;
        document.getElementById('taskList').innerHTML = '';


        var day = this.textContent;
        var tasks = JSON.parse(localStorage.getItem(day)) || [];
        for (var j = 0; j < tasks.length; j++) {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(tasks[j]));
            document.getElementById('taskList').appendChild(li);

        }
    });
}

document.getElementById('taskInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
  var input = document.getElementById("taskInput").value;
  if (input === "") {
    alert("Please enter a task!");
    return;
  }
  var ul = document.getElementById("taskList");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input));
  ul.appendChild(li);
  document.getElementById("taskInput").value = "";


  var day = selectedDay.textContent;
  var tasks = JSON.parse(localStorage.getItem(day)) || [];
  tasks.push(input);
  localStorage.setItem(day, JSON.stringify(tasks));


  li.addEventListener("click", function() {
    this.classList.toggle("completed");
  });


  var deleteButton = document.createElement("button");
  deleteButton.appendChild(document.createTextNode("X"));
  deleteButton.className = "deleteButton";
  li.appendChild(deleteButton);


  deleteButton.addEventListener("click", function() {
    this.parentElement.remove();
  });


  var editButton = document.createElement("button");
  editButton.appendChild(document.createTextNode("Edit"));
  editButton.className = "editButton";
  li.appendChild(editButton);

  editButton.addEventListener("click", function() {
    var newTask = prompt("Edit Task", this.parentElement.firstChild.nodeValue);
    if (newTask !== null) {
      this.parentElement.firstChild.nodeValue = newTask;
    }
  });

}
