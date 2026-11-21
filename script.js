//  Now finally i acme to the using of the scrip that is 

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

let pending = document.querySelector(".Pending");
function addingTasks() {

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    pending.innerHTML = ""; // Clear previous tasks

    pending.style.display = "block";

    savedTasks.forEach((task) => {

        let div = document.createElement("div");
        div.classList.add("p");

        let p = document.createElement("p");
        p.innerText = task.task;
        p.classList.add("task-text");
        if (task.status) {
            p.classList.add("completed-task");
        }

        let h4 = document.createElement("h4");
        h4.innerText = task.time;

        div.appendChild(p);
        div.appendChild(h4);

        if (task.status == false) {
            let divv = document.createElement("div");
            divv.classList.add("completed");
            divv.innerText = "Completed";
            divv.setAttribute("data-id", task.id)
            div.appendChild(divv);
        }

        let divv = document.createElement("div");
        divv.classList.add("remove");
        divv.innerText = "Remove"
        divv.setAttribute("data-id", task.id)
        div.appendChild(divv);

        // Remove button toh banao every time no isue ki complete karke karna hai yaan vaise hii without complete karke akrna hai 



        pending.appendChild(div);
    });
}

if (savedTasks.length > 0) {
    console.log(savedTasks);
    addingTasks();

}


let add = document.querySelector(".add");
let testt = document.querySelector(".test");
add.addEventListener("click", () => {
    if (testt.style.display === "none") {
        testt.style.display = "block";
    } else {
        testt.style.display = "none";
    }
});

let form = document.querySelector("form")
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // agar mile toh bhi theeh agar nahi mille toh bhi theek 

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target[0].value == "" || e.target[1].value == "") {

        let div = document.createElement("div");
        div.classList.add("toaster")
        div.innerText = "Pls Enter All the details carefully "
        document.body.appendChild(div);
        setTimeout(() => {
            document.body.removeChild(div);

        }, 3000)




    } else {
        let task = e.target[0].value
        let time = e.target[1].value
        let status = false;
        let id = Date.now();
        tasks.push({
            task: task,
            time: time,
            status: status,
            id: id
        })
        localStorage.setItem("tasks", JSON.stringify(tasks));// Beacuse in local storage we can save one value at a time therefore in order to save it we need to do retreive all put them in an array and then pass that array to store the products 
        // basically in the local storage we are storing the an array of the tasks
        testt.style.display = "none";
        let div = document.createElement("div");
        div.classList.add("toaster")
        div.innerText = "Task Added Succesfully ! "
        div.style.backgroundColor = "#33ff3a"
        document.body.appendChild(div);

        setTimeout(() => {
            document.body.removeChild(div);

        }, 3000)

    }
    form.reset();
    addingTasks();






})
// now we have the task in our local storage now is to just attach to our tasks list
// okay so now the mainly two things ar left for now that is nothing but also storing inside the inner html
// when it is completed the we will be storing the status completed and if it is completed then we wil not be showing them the completed button other we will be showing them the completed button



// okay so now i will be laearning the real concept of the Event delegation okay 
// Approach is that we w ill be adding the event to the dive

//Step 1 it would be the click event 
// step 2 then checking is the event done on a button or not 
//step 3  after checking that yes it has been done on the button 
// step 4 then checking what its inner text is
// step 5 after getting that button 
//step 6 we will be checking the task id 
// then using for each or filter method and where we get that all thing equal we willperforming the action 


// step 1 adding event listener to the pending 

pending.addEventListener("click", (e) => {
    let completedId;
    let clearedId;
    if (e.target.classList.contains("completed")) {
        let id = Number(e.target.dataset.id);
        console.log("CompletedTaskId:", id);
        completedId = id;
    }
    if (e.target.classList.contains("remove")) {
        let id = Number(e.target.dataset.id);
        console.log("RemoveTaskId:", id);
        clearedId = id;
    }
    if (!e.target.classList.contains("completed") &&
        !e.target.classList.contains("remove")) {
        return;
    }

    // okay so now we have the their respective ids
    if (completedId) {
        let savedTasks = JSON.parse(localStorage.getItem("tasks"));
        savedTasks = savedTasks.map((tasks) => {
            if (tasks.id == completedId) {
                tasks.status = true;
            }
            return tasks;

        })
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
    if (clearedId) {

        let savedTasks = JSON.parse(localStorage.getItem("tasks"));
        savedTasks = savedTasks.filter((tasks) => {
            return tasks.id !== clearedId;


        })
        localStorage.setItem("tasks", JSON.stringify(savedTasks));



    }

    addingTasks();
})

let theme = document.querySelector(".theme");
theme.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});