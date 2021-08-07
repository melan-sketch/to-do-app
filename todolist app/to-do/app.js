
let listTasks = [];
let id = 0;

// C: Create
$("#add").click(function (e) {
    let input = $('#input-task').val()

    const task = {
        id: id,
        input: input,
    };

    listTasks.push(task); 
    console.log(listTasks); 
    localStorage.setItem("listTasks", JSON.stringify(listTasks));

    let addHTML = `
    <ul id="content">
    <li>
        <span class="text">${input}</span>
        <i class="fa fa-trash" onclick="deleteTask(${id})"></i>
    </li>
</ul>
    `;
    
    $(".main-content").append(addHTML);
    clearInput();
    id++;
});

// Save Task

function readTask() {
    listTasks = localStorage.getItem("listTasks"); 
    listTasks = JSON.parse(listTasks); 
    console.log(listTasks);
    let tasksHTML = "";
    for (element of listTasks) {
        console.log(element);
        tasksHTML += `
        <ul id="content">
        <li>
            <span class="text">${element.input}</span>
            <i class="fa fa-trash" onclick="deleteTask(${element.id})"></i>
        </li>
    </ul>
        `;
    }
    document.querySelector(".main-content").innerHTML = tasksHTML; 
  }


// D: Delete

function deleteTask(id) {
    let index = findIndexTask(id);
    $("#content").click(function (e) {
        $(this).remove();
    });

    localStorage.removeItem("listTasks");
    localStorage.setItem("listTasks", JSON.stringify(listTasks)); 


    listTasks.splice(index, 1);
    console.log(listTasks);
    readTask();
}


function findIndexTask(numberId) {
    let index;
    for (let i = 0; i < listTasks.length; i++) {
        if (listTasks[i].id === numberId) {
            index = i;
        }
    }
    return index;
}

// Clear   
function actionClear(e) {
    $("ul").fadeOut(200, function () {
        $(this).remove();
    });
}

// Update Pending Task

readTask();