const textField = document.getElementById("post");
const submitBtn = document.getElementById("submit-btn");
const msgBox = document.getElementById("msg-box");
let updateRequest = false;

let idStore = [];

async function getData() {
    const res = await fetch('https://jsonplaceholder.org/posts')
    const data = await res.json()
    // console.log(data)
    displayData(data)
}
getData()

function displayData(data) {
    let count = 1
    for(let post of data.slice(0,10)) {
        idStore.push(`Msg${idStore.length+count}`)
        makeMsg(`Msg${idStore.length}`,post.content)
        count++
    }
}

function makeMsg(ID,post) {
  const newMsg = document.createElement("div");
  newMsg.id = ID;
  newMsg.innerHTML = `            
    <p id="read">${post}</p>
    <button onclick="deletePost(${newMsg.id})">Delete</button>
    <button onclick="updatePost(${newMsg.id})">Update</button>`;
  textField.value = "";
  msgBox.appendChild(newMsg);
}

submitBtn.onclick = function () {
  let trackID = textField.getAttribute("current-id");
  if (idStore.includes(trackID) && updateRequest) {
    document.getElementById(trackID).children[0].innerText = textField.value;
    textField.setAttribute("current-id", "");
    textField.value = "";
  } else {
    let ID = `Msg${idStore.length}`;
    textField.setAttribute("current-id", ID);
    makeMsg(ID,textField.value);
  }

  for (let i = 0; i < msgBox.children.length; i++) {
    const elementID = msgBox.children[i].id;
    if (!idStore.includes(elementID)) {
      idStore.push(elementID);
    }
  }
};

function deletePost(id) {
  msgBox.removeChild(id);
}

function updatePost(id) {
  textField.value = id.children[0].innerText;
  textField.setAttribute("current-id", id.id);
  updateRequest = true;
}

function clearField() {
  textField.value = "";
}
