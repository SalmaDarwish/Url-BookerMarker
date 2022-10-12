
// General Variables -----------//
var siteName = document.getElementById("siteName");
var sitUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var deleteBtn = document.getElementById("deleteBtn");
var regexName = /^.{1,100}$/;
var regexUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

var resetBtn = document.getElementById("resetBtn");
// General Variables -----------//

// Local Storage --------------//
if (localStorage.getItem("list") == null) {
    bookmarkList = [];

} else {
    bookmarkList = JSON.parse(localStorage.getItem("list"));
    displayList(bookmarkList);
}
function setToLocalStorage() {
    window.localStorage.setItem("list", JSON.stringify(bookmarkList));
}
// Local Storage ----------- //

// buttons -----------------//
submit.addEventListener("click", addBookmark);
resetBtn.addEventListener("click", reset);

// buttons -----------------//

function addBookmark() {
    var website = {
        name: siteName.value,
        url: sitUrl.value,
    }
    var sitename = website.name;
    var siteurl = website.url;
    validateSiteUrl(siteurl)
    if (validateSiteAdd() == true) {
        bookmarkList.push(website);
        displayList();
        setToLocalStorage();
        clearError()
        clearField()
    }
}


function displayList() {
    var list = ""
    for (i = 0; i < bookmarkList.length; i++) {
        list += `
        <div class="bookmark-data row">
        <col-md-6>
                <h2>${bookmarkList[i].name}</h2>
                </col-md-6>
                <col-md-6>

                <a class=" btn btn-primary me-3" href="http://${bookmarkList[i].url}" target="_blank">visit</a>
                

                <button class=" btn btn-danger" id="deleteBtn" onclick="deleteUrl(${i})">Delete</button>
                </col-md-6>

            </div>
        `
    }
    document.getElementById("bookmarkList").innerHTML = list
}


function deleteUrl(i) {
    bookmarkList.splice(i, 1);
    displayList(bookmarkList);
    setToLocalStorage();
}

function reset(i) {
    bookmarkList.splice(i);
    displayList(bookmarkList);
    setToLocalStorage();
}

function isNameEmpty(sitename) {
    if (regexName.test(siteName.value) == false) {
        document.getElementById("nameError").classList.replace("d-none", "d-block");
        document.getElementById("nameError").innerHTML = ("Name is required");
        return true
    } else {
        document.getElementById("nameError").classList.replace("d-block", "d-none");

    }
}

function validateSiteUrl(siteurl) {
    for (var i = 0; i <= bookmarkList.length; i++) {
        if (regexUrl.test(siteUrl.value) == false) {
            document.getElementById("urlError").classList.replace("d-none", "d-block");
            document.getElementById("urlError").innerHTML = ("Url is required");
        } else {
            document.getElementById("urlError").classList.replace("d-block", "d-none");
            return true

        }
    }
}

function isNameRepeated(sitename) {
    for (var i = 0; i < bookmarkList.length; i++) {
        if (bookmarkList[i].name.includes(sitename)) {
            document.getElementById("nameError").classList.replace("d-none", "d-block");
            document.getElementById("nameError").innerHTML = ("Name is repeated")
            return true
        } else {
            document.getElementById("nameError").classList.replace("d-block", "d-none");

        }
    }
}

function validateSiteAdd() {
    if (isNameEmpty(siteName.value) != true && isNameRepeated(siteName.value) != true && validateSiteUrl(siteUrl.value) == true) {
        return true
    }
}
function clearError() {
    document.getElementById("nameError").classList.replace("d-block", "d-none");
}

function clearField() {
    siteName.value = ""
    siteUrl.value = ""
}




