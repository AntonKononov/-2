document.getElementById("text").value = gettext("text");

function settext(Val) {
    localStorage.setItem(Val.id, Val.value);
}

function gettext(Val) {
    return localStorage.getItem(Val);
}