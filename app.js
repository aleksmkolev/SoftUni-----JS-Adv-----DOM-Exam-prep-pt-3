window.addEventListener('load', solve);

function solve() {
    const inputs = {
    firstname: document.getElementById("first-name"),
    lastName: document.getElementById("last-name"),
    peopleCount: document.getElementById("people-count"),
    dateIn: document.getElementById("from-date"),
    daysCount: document.getElementById("days-count"),
  };
  //WE TAKE THE NEXT BUTTON
  const nextBtn = document.getElementById("next-btn");
  //ADD EVENT LISTEN AND FUNCTION TO NEXT BUTTON
  nextBtn.addEventListener("click", onNextClick);
  const body = document.getElementById("body")
  let main

  const infoList = document.querySelector(".ticket-info-list");
  const confirmList = document.querySelector(".confirm-ticket");
  //const output = document.getElementById("verification")

  function onNextClick(event) {
    event.preventDefault();
    //HERE WE CHECK OF EMPTY INPUTS and RETURN IF THEY ARE ANY
    if (
      inputs.firstname.value == "" ||
      inputs.lastName.value == "" ||
      inputs.peopleCount.value == "" ||
      inputs.dateIn.value == "" ||
      inputs.daysCount.value == ""
    ) {
      return;
    }
    // COLLECT THE INPUT DATA AND CONVERT THE DATE TO NEW DATE SO WE CAN COMPARE
    const firstName = inputs.firstname.value;
    const lastName = inputs.lastName.value;
    const peopleCount = inputs.peopleCount.value;
    const dateIn = inputs.dateIn.value;
    const daysCount = inputs.daysCount.value

    //VALIDATING THE dateIn < dateOut
        
    //DISABLE THE BUTTON
    nextBtn.parentElement.reset()
    nextBtn.disabled = "true";

    const result = createaPreview(firstName, lastName, peopleCount, dateIn, daysCount);
    infoList.appendChild(result);
  }
  function createInfo(firstName, lastName, peopleCount, dateIn, daysCount){
    const element = e("li");
    element.className = "ticket-info-list";

    const article = e("article");
    article.appendChild(e("h3", `Name: ${firstName} ${lastName}`));
    article.appendChild(e("p", `From date: ${dateIn}`));
    article.appendChild(e("p", `For: ${daysCount} days`));
    article.appendChild(e("p", `For ${peopleCount} people`));

    element.appendChild(article);
    return element
  }
  function createaPreview(firstName, lastName, peopleCount, dateIn, daysCount) {

    const element = createInfo(firstName, lastName, peopleCount, dateIn, daysCount)
    
    const editBtn = e("button", "Edit");
    editBtn.className = "edit-btn";
    editBtn.addEventListener('click', () => onEditClick(firstName, lastName, peopleCount, dateIn, daysCount))


    const continueBtn = e("button", "Continue");
    continueBtn.className = "continue-btn";
    continueBtn.addEventListener('click',onContinueClick.bind(null, firstName, lastName, peopleCount, dateIn, daysCount))

    element.appendChild(editBtn);
    element.appendChild(continueBtn);

    return element;

    
  }
  function e(type, content) {
    const element = document.createElement(type);

    if (content) {
      element.textContent = content;
    }

    return element;
  }
  function onContinueClick(firstName, lastName, peopleCount, dateIn, daysCount){

    const result = createConfirmation(firstName, lastName, peopleCount, dateIn, daysCount)
    confirmList.appendChild(result)
    infoList.textContent=''

  }
  function onEditClick(firstName, lastName, peopleCount, dateIn, daysCount){

    inputs.firstname.value = firstName
    inputs.lastName.value = lastName
    inputs.peopleCount.value = peopleCount
    inputs.dateIn.value  = dateIn
    inputs.daysCount.value = daysCount
    

    infoList.textContent = ''
    nextBtn.disabled = false
  }

  function createConfirmation(firstName, lastName, peopleCount, dateIn, daysCount){
    const element = createInfo(firstName, lastName, peopleCount, dateIn, daysCount)

    const confirmBtn = e("button", "Confirm");
    confirmBtn.className = "confirm-btn";
    confirmBtn.addEventListener('click', onConfirm)


    const cancelBtn = e("button", "Cancel");
    cancelBtn.className = "cancel-btn";
    cancelBtn.addEventListener('click', onCancel)

    element.appendChild(confirmBtn);
    element.appendChild(cancelBtn);

    return element;

  }
  function onFinishClick(confirmed){
    const className = confirmed ? `reservation-confirmed` : 'reservation-cancelled'
    const text = confirmed ? 'Confirmed.' : 'Cancelled.'

    output.className = className
    output.textContent = text

    confirmList.textContent = ''
    
    nextBtn.disabled = false


  }
  function onConfirm(e){
    onDelete(e.target.parentElement)
    main = document.getElementById("main")
    body.innerHTML = ""
    let h1 = document.createElement("h1")
    h1.textContent = "Thank you, have a nice day!"
    h1.id = "thank-you"
    let btn = createBtn("","Back")
    btn.id = "back-btn"
    btn.addEventListener("click", onReset)
    body.appendChild(h1)
    body.appendChild(btn)

  }
  function createBtn(classes, text){
    let btn = document.createElement("button")
    classes && btn.classList.add(classes)
    btn.textContent = text
    return btn
  }
  function onCancel(e){
    onDelete(e.target.parentElement)
    toggleButton()
  }
  function toggleButton(){
    nextBtn = disabled = !nextBtn.disabled
  }
  function onDelete(elRef){
    elRef.remove()
  }
  function onReset(){
    body.innerHTML = ""
    body.appendChild(main)
    toggleButton()
  }
  

}


    
    
