chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        refresh(request.source);
    }
  });

function addComment(comment){
    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('id',comment);
    li.appendChild(document.createTextNode(comment));
    ul.appendChild(li);
}

function clearItems(){
    var ul = document.getElementById("dynamic-list");
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
}

function refresh(source){
    clearItems()
    var counter = 0;
    var comment_pattern = /<!--[\s\S]*?-->/g;
    while((result = comment_pattern.exec(source)) !== null) {
        addComment(result);
        counter++;
    }
    document.body.style.width = 400;
    document.body.style.height = 50 + 300 * counter;
}

function onWindowLoad(){
    var message = document.querySelector('#message');
    chrome.tabs.executeScript(null, {file: "getPagesSource.js"});
}

window.onload = onWindowLoad;