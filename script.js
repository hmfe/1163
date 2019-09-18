$(document).ready(function () {
    // get the <datalist> and <input> elements.
    let dataList = document.getElementById("country-datalist");
    let input = document.getElementById("search");
    let dynamicTable = document.getElementById("dynamicTable");
    // Create a new XMLHttpRequest.
    let request = new XMLHttpRequest();
    $("#search").keyup(function (e) {
        e.stopImmediatePropagation();
        let searchData = this.value;
        if (searchData.length === 2) {
            // Set up and make the request.
            request.open("GET", "https://restcountries.eu/rest/v2/name/" + searchData, true);
            request.send();
        }
        // Handle state changes for the request.
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                // Parse the JSON
                let jsonOptions = JSON.parse(request.responseText);
                while (dataList.firstChild) {
                    dataList.removeChild(dataList.firstChild);
                }
                // Loop over the JSON array.
                jsonOptions.forEach(function (item) {
                    // Create a new <option> element.
                    let option = document.createElement("option");
                    // Set the value using the item in the JSON array.
                    option.value = item.name;
                    // Add the <option> element to the <datalist>.
                    dataList.appendChild(option);
                });
            } else {
                // List not loaded yet :(
                input.placeholder = "e.g sw";
            }
        }
    }).change(function () {
        let commonDiv = document.createElement("div");
        commonDiv.setAttribute("class", "common");
        commonDiv.setAttribute("contenteditable", "true");
        let searchCountry = document.createElement("div");
        searchCountry.setAttribute("class", "searchCountry");
        searchCountry.innerHTML = this.value;
        commonDiv.appendChild(searchCountry);
        let searchDateTime = document.createElement("div");
        searchDateTime.setAttribute("class", "searchDateTime");
        searchDateTime.innerHTML = new Date($.now()).toLocaleString();
        commonDiv.appendChild(searchDateTime);
        let removeButton = document.createElement("button");
        removeButton.setAttribute("class", "clearSelected");
        removeButton.innerHTML = "&times";
        commonDiv.appendChild(removeButton);
        dynamicTable.appendChild(commonDiv);
    })
});
$(document).on("click", ".clearSelected", function () {
    $(this).closest(".common").remove();
});
$(document).on("click", ".clearAll", function () {
    $("div.common").remove();
});
