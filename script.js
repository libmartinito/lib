let myLibrary = [];

// A constructor for the object book

/*
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

}

Book.prototype.info = function() {
  return `${title} by ${author}, ${pages} pages, ${isRead}`;
}

Book.prototype.updateIsRead = function() {
  if (this.isRead == "Not yet read") {
    this.isRead = "Read";
  }
}
*/

// Using the class syntax instead of a constructor for the object book

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info() {
    return `${title} by ${author}, ${pages} pages, ${isRead}`;
  }

  updateIsRead() {
    if (this.isRead == "Not yet read") {
      this.isRead = "Read";
    }
  }

}

// A function that creates an instance of a book

function addBookToLibrary() {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let status = document.querySelector("#status");
  let book = new Book(title.value, author.value, pages.value, status.value);

  myLibrary.push(book)

  title.value = "";
  author.value = "";
  pages.value = "";
  status.value = "";
}

// A function displays the content of library array on the ui

let table = document.querySelector("table");

function displayBooks(book) {
    let trow = document.createElement("tr");
    Object.keys(book).forEach(key => {
      let tdata = document.createElement("td");
      tdata.textContent = book[key];
      tdata.style.textAlign = "center";
      trow.appendChild(tdata);
    });

    let tdata1 = document.createElement("td");
    let rmvBtn = document.createElement("button");
    rmvBtn.textContent = "Remove";
    rmvBtn.dataset.index = curIndex;
    rmvBtn.addEventListener("click", removeBook);
    rmvBtn.style.fontSize = "16px";
    rmvBtn.style.fontFamily = "serif";
    rmvBtn.style.paddingLeft = "6px";
    rmvBtn.style.paddingRight = "6px";
    tdata1.style.textAlign = "center";
    tdata1.appendChild(rmvBtn);
    trow.appendChild(tdata1);

    let tdata2 = document.createElement("td");
    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.dataset.index = curIndex;
    updateBtn.addEventListener("click", updateStatus);
    updateBtn.style.fontSize = "16px";
    updateBtn.style.fontFamily = "serif";
    updateBtn.style.paddingLeft = "6px";
    updateBtn.style.paddingRight = "6px";
    tdata2.style.textAlign = "center";
    tdata2.appendChild(updateBtn);
    trow.appendChild(tdata2);

    trow.classList.add("row");
    table.appendChild(trow);

    curIndex++;
}

// A function that removes a book from the list and display

let curIndex = 0;

function removeBook() {
  let index = this.dataset.index;
  myLibrary.splice(index,1);
  if (curIndex != 0) {
    curIndex--;
  }
  updateList();
}

function updateList() {
  curIndex = 0;
  let curList = document.getElementsByClassName("row");
  while (curList[0]) {
    curList[0].parentNode.removeChild(curList[0]);
  }
  myLibrary.forEach(book => displayBooks(book));
}

// A function that updates the status of the book

function updateStatus() {
  let index = this.dataset.index;
  myLibrary[index].updateIsRead();
  updateList();
}

// Code for modal

let modal = document.querySelector(".modal");
let newBookBtn = document.querySelector(".new");

newBookBtn.addEventListener("click", openModal);

function openModal() {
  modal.style.visibility = "visible";
  modal.style.display = "block";
}

let closeBtn = document.querySelector(".close");

function closeModal() {
  modal.style.visibility = "hidden";
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

let submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
  addBookToLibrary();
  closeModal();
  displayBooks(myLibrary[myLibrary.length - 1]);
});

