
//
button = document.getElementById("submit");

button.addEventListener("click", ()=>{//Add an event listener to the submit button
    //Get the needed elements and values for the calc to work  
    firstNumber = document.getElementById("firstNumber"); 
    secondNumber = document.getElementById("secondNumber");
    fnError1 = document.getElementById("fnError1");
    snError1 = document.getElementById("snError1");
    fnError2 = document.getElementById("fnError2");
    snError2 = document.getElementById("snError2");

    error = checkForErrors(firstNumber.value, secondNumber.value, fnError1, fnError2, snError1, snError2);
    if(error === false){  //Only run if there are no errors 
        fnError1.classList.add("hidden");
        snError1.classList.add("hidden");
        fnError2.classList.add("hidden");
        snError2.classList.add("hidden");
        action = document.getElementById("action").value;
        answer = calc(Number(firstNumber.value), Number(secondNumber.value), action);//find the answer
        appendHistory(firstNumber.value, secondNumber.value, answer, action);//create and append the history elms
        displayAnswer(answer, firstNumber);//Display answer in the firstNumber input element
        appendAnswer(answer);//Display the answer in the answer container
    }
});

function calc(firstNumber, secondNumber, action){
    //Find the type of acction that needs to be done to the two numbers
    if(action === "x") {
        answer = multiply(firstNumber, secondNumber);   
    }
    else if(action === "/") {
        answer = divide(firstNumber, secondNumber);
    }
    else if(action === "-") {
        answer = subtract(firstNumber, secondNumber);
    }
    else if(action === "+") {
        answer = add(firstNumber, secondNumber);
    }
    return answer//After the answer is found return it to the calling location 
}

function multiply(firstNumber, secondNumber) {
    answer = firstNumber * secondNumber;
    return answer;
}
function divide(firstNumber, secondNumber) {
    answer = firstNumber / secondNumber;
    return answer;
}
function subtract(firstNumber, secondNumber) {
    answer = firstNumber - secondNumber;
    return answer;
}
function add(firstNumber, secondNumber) {
    answer = firstNumber + secondNumber;
    return answer;
}
function displayAnswer (value, firstNumberInput){
    //Set the firstNumber input to the found answer
    firstNumberInput.value = `${value}`;
}

function appendAnswer(value){
    //Display the answer in the answer container
     answerContainer = document.getElementById("answerContainer");
     answerContainer.innerText =  `This is the answer : ${value}`;
}

function appendHistory(firstNumber, secondNumber, value, action){
   //Get the parent of the history container 
   historyContainer = document.getElementById("historyContainer");
   answerDiv = document.createElement("div");
   answerDiv.setAttribute ("class", "answerDiv");

   //Create firstNumber span
   firstNumberSpan = document.createElement("span");
   firstNumberSpan.innerText = `${firstNumber}`;
   firstNumberSpan.setAttribute("class", "firstNumberHistory");
   answerDiv.appendChild(firstNumberSpan);

   //Action Span
   actionSpan = document.createElement("span");
   actionSpan.innerText = `${action}`;
   actionSpan.setAttribute("class", "actionHistory");
   answerDiv.appendChild(actionSpan);

   //SecondNumber Span
   secondNumberSpan = document.createElement("span");
   secondNumberSpan.innerText = `${secondNumber}`;
   secondNumberSpan.setAttribute("class", "secondNumberHistory");
   answerDiv.appendChild(secondNumberSpan);

   //Answer span
   answerSpan = document.createElement("span");
   answerSpan.innerText = `= ${answer}`;
   answerSpan.setAttribute("class", "historyAnswer");
   answerDiv.appendChild(answerSpan);

   //Container for the buttons 
   buttonContainer = document.createElement("div");
   buttonContainer.setAttribute("class", "historybuttonContainer");
   answerDiv.appendChild(buttonContainer);
 
   //Clear button
    clearButton = document.createElement("button");
    clearButton.setAttribute("class", "clearButton");
    clearButton.innerText =`Clear`;
    buttonContainer.appendChild(clearButton);

    //Restore button
    restoreButton = document.createElement("button");
    restoreButton.setAttribute("class", "restoreButton");
    restoreButton.innerText =`Restore`;
    buttonContainer.appendChild(restoreButton);

     //Append answerContainer to historyContainer
    historyContainer.appendChild(answerDiv);

    //Create new listeners for the created buttons 
    appendClearListener(clearButton);
    appendRestoreListener(restoreButton);

}

function appendRestoreListener(restoreButton) {
    //Create event listener for the restore button
    restoreButton.addEventListener("click", findRestoreData);//getRestoreData is the callback function
}

function findRestoreData(event) {
    //Get the data needed to restore the history
    currentButton = event.target;
    answerContainerChildren = currentButton.parentNode.parentNode.children;
    let i =0;//Loop over the children of the answer container to find the needed data
    while(i < answerContainerChildren.length){
       if(answerContainerChildren[i].classList.contains("firstNumberHistory") === true){
            //if firstNumberHistory was found set firstNumberValue
            firstNumberHistory = answerContainerChildren[i].innerText.trim();
       }
       else if (answerContainerChildren[i].classList.contains("secondNumberHistory") === true){
            //if secondNumberHistory was found set secondNumberValue
            secondNumberHistory = answerContainerChildren[i].innerText.trim();
       }
       else if (answerContainerChildren[i].classList.contains("actionHistory") === true){
            //if actionHistory was found set actionValue
            actionHistory = answerContainerChildren[i].innerText.trim();
            //trim() is used to remove spaces in strings
        }
        i++;
    } 

    //Run the function to restore the history 
    restoreSingleHistory(firstNumberHistory, secondNumberHistory, actionHistory);
}

function restoreSingleHistory(firstNumber, secondNumber, action){
    document.getElementById("firstNumber").value =`${firstNumber}`;
    document.getElementById("secondNumber").value =`${secondNumber}`;
    document.getElementById("action").value =`${action}`;
}

function appendClearListener(clearButton){
    //Create the event listener for the created clear button
    clearButton.addEventListener("click", clearSingleHistory);
}

function clearSingleHistory(event){
   //Find the container of the history object and remove it 
   currentButton = event.target;//Find the button that triggered the event
   currentAnswerContainer = currentButton.parentNode.parentNode;//Get the container node
   currentAnswerContainer.remove();//Remove the container node. Note that .remove() will remove the chirdren as well
}

function checkForErrors(firstNumber, secondNumber, fnError1, snError1, fnError2, snError2){
    fnResult1 = firstNumber.match(/^[A-Za-z]+$/);
    snResult1 = secondNumber.match(/^[A-Za-z]+$/);
    fnResult2 = firstNumber.match(/[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]+/);
    snResult2 = secondNumber.match(/[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]+/);
    error = false;

    if(fnResult1 !== null){
        fnError1.classList.remove("hidden");
        error = true; 
    }

    if(snResult1 !== null){
        snError1.classList.remove("hidden");
        error = true;
    }
    
    if(fnResult2 !== null){
        snError2.classList.remove("hidden");
        error = true;
    }
    if(snResult2 !== null){
        snError2.classList.remove("hidden");
        error = true;
    }
    return error;
}
