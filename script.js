
var taskList = Array;

function fillTheList(tab){
    //debugger;
    taskList = getLocalStorageList();
    if(document.getElementById("listOfAllItems") != null){
        document.getElementById("listOfAllItems").remove();
        document.getElementById("listOfCompletedItems").remove();
        document.getElementById("listOfPendingItems").remove();
    }
  

    let listOfAllItems = document.createElement("ul");
    let listOfPendingItems = document.createElement("ul");
    let listOfCompletedItems = document.createElement("ul");

    listOfAllItems.id = "listOfAllItems";
    listOfPendingItems.id = "listOfPendingItems";
    listOfCompletedItems.id = "listOfCompletedItems";

    document.getElementById("listContainer").appendChild(listOfAllItems);
    document.getElementById("listContainer").appendChild(listOfPendingItems);
    document.getElementById("listContainer").appendChild(listOfCompletedItems);
    console.log(tab);
    if(taskList != null){
        

        if(tab === "Pending"){
            document.getElementById("listOfCompletedItems").style.display = "none";
            document.getElementById("listOfAllItems").style.display = "none";
            

            document.getElementById("btnPending").classList.add("active");  
            document.getElementById("btnAll").classList.remove("active");  
            document.getElementById("btnCompleted").classList.remove("active");  

            document.getElementById("listOfPendingItems").style.display = "block";

        }
        else if(tab === "Completed"){
            document.getElementById("listOfPendingItems").style.display = "none";
            document.getElementById("listOfAllItems").style.display = "none";
          
            document.getElementById("btnCompleted").classList.add("active");
            document.getElementById("btnPending").classList.remove("active");  
            document.getElementById("btnAll").classList.remove("active");  

  
            document.getElementById("listOfCompletedItems").style.display = "block";

        }
        
        else{
            document.getElementById("listOfPendingItems").style.display = "none";
            document.getElementById("listOfCompletedItems").style.display = "none";
           
            document.getElementById("btnAll").classList.add("active");  
            document.getElementById("btnPending").classList.remove("active");  
            document.getElementById("btnCompleted").classList.remove("active");  

            document.getElementById("listOfAllItems").style.display = "block";
        }
      
        for (let i = 0;i<taskList.length;i++){
          
            let li = document.createElement("li");
            let btnChk = document.createElement("input");
            btnChk.type = "checkbox";
            
            let lbl = document.createElement("label");
            lbl.innerText = taskList[i].taskName;
            let imgEditor = document.createElement("img");
            imgEditor.src="img/editor.png";
            let imgTrash = document.createElement("img");
            imgTrash.src="img/trash.png";
            let id = taskList[i].id;
            btnChk.id="btnChk_"+id.charAt(4)+""+id.charAt(5);
            lbl.htmlFor=btnChk.id;

            let btnForTrashIcon = document.createElement("button");
            let btnForEditorIcon = document.createElement("button");

            btnForTrashIcon.onclick=function(){
                console.log(i);
                li.remove();
                taskList.splice(i, 1);
                

                setLocalStorageList(taskList);
                fillTheList(tab);

            }
            btnForEditorIcon.onclick = function (){
                let txtOnBtn = document.getElementById("btnAdd");
                txtOnBtn.innerText = "SAVE";
                document.getElementById("txtNote").focus();
                li.remove();
                document.getElementById("txtNote").value = taskList[i].taskName;
                taskList.splice(i, 1);
                setLocalStorageList(taskList);
                adjustId();

            }
            btnChk.onclick = function(){
                if (btnChk.checked){
                    lbl.style.textDecoration ="line-through";
                    li.style.opacity="50%";
                    btnForTrashIcon.disabled = true;
                    btnForEditorIcon.disabled=true;
                    taskList[i].status = "Completed"
                }
                else{
                    lbl.style.textDecoration ="none";
                    li.style.opacity="100%";
                    btnForTrashIcon.disabled = false;
                    btnForEditorIcon.disabled=false;
                    taskList[i].status = "Pending";
                }
                setLocalStorageList(taskList);
                console.log(taskList);
                fillTheList(tab);

            }
           
           
            if (taskList[i].status =="Completed"){
                btnChk.checked = true;
                lbl.style.textDecoration ="line-through";
                li.style.opacity="50%";
                btnForTrashIcon.disabled = true;
                btnForEditorIcon.disabled= true;
            }
            
            li.appendChild(btnChk);
            li.appendChild(lbl);
            
            li.appendChild(btnForEditorIcon)
            btnForEditorIcon.appendChild(imgEditor);

            li.appendChild(btnForTrashIcon);
            btnForTrashIcon.appendChild(imgTrash);   
            if(tab===taskList[i].status){
                console.log("listOf"+tab+"Items");
                document.getElementById("listOf"+tab+"Items").appendChild(li);
            }
            else{
                document.getElementById("listOfAllItems").appendChild(li);

            }
        }
        
    }
}

function addNote(){
    

    var txtNote = document.getElementById("txtNote");

    if (txtNote.value != ""){
        let txtOnBtn = document.getElementById("btnAdd");
        if (txtOnBtn.innerText =="SAVE"){
            txtOnBtn.innerText = "Add";
        }
        taskList = getLocalStorageList();

        addTaskToList(txtNote.value);
        txtNote.value= "";

        fillTheList();

    }

}

function addTaskToList(taskName){
    taskList = getLocalStorageList();
    task = {id:"tsk_"+0,
    taskName: taskName,
        status:"Pending",
    }
    if(taskList == null){
        taskList = [task];  
    }
    else{
        taskList.push(task);
    
    }
    setLocalStorageList(taskList);
    adjustId();

}

function clearAllItems(){
    let answerOfTheClearConfirm=confirm("Are You Sure To Clear All The Items?");
    if(answerOfTheClearConfirm){
        localStorage.removeItem("taskList");
        let listAllOfItems = document.getElementById("listOfAllItems");
   
        listAllOfItems.remove();
    fillTheList('All');
    }
}

function setLocalStorageList(taskList){
    localStorage.setItem("taskList",JSON.stringify(taskList));
}


function getLocalStorageList(){
    return JSON.parse(localStorage.getItem("taskList"));
}

function adjustId(){
    let taskList = getLocalStorageList();
    if (taskList != null){
    
        for (let i=0;i<taskList.length;i++){
            taskList[i].id = "tsk_"+i;
        }
        console.log(taskList);

        setLocalStorageList(taskList);
    }
}