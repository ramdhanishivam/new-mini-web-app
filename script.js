let mainList = document.getElementById("main-list");
let categoryDrop = document.getElementById("categoryDrop");
let sortByPrice = document.getElementById("sortByPrice");
let loadMore = document.getElementById("loadMore");
let searchInput = document.getElementById("searchInput");

async function getFakeStoreData(loadMore = false) {
    try {
        let apiURL = "https://fakestoreapi.com/products";
        apiURL = !loadMore ? apiURL +"?limit=10" : apiURL;
        const response  = await fetch(apiURL);
        const data = await response.json();
        localStorage.setItem('fakeStoreProducts', JSON.stringify(data));
        createListItem(data, null ,loadMore);
    } catch (error) {
        console.log(error)
    }
}

getFakeStoreData();

sortByPrice.addEventListener("click", () => {
    const storedData = JSON.parse(localStorage.getItem("fakeStoreProducts"));
    sortByPrice.value && createListItem(storedData, sortByPrice.value);
})

categoryDrop.addEventListener("click", () => {
    let proudctCards = document.querySelectorAll(".proudct-card");
    proudctCards.forEach( (card) => {
        if (categoryDrop.value && card.getElementsByTagName('p')[1].innerHTML !== categoryDrop.value) {
            card.parentElement.style.display = "none"
        } else {
            card.parentElement.style.display = "list-item"
        }
    }) 
})

loadMore.addEventListener("click", () => {
    getFakeStoreData(true);
})

searchInput.addEventListener("keyup", () => {
    mainList.childNodes.forEach((item) => {
        let productName = item.firstChild.childNodes[1].innerHTML.toUpperCase();
        if(!productName.includes(searchInput.value.toUpperCase())){
            item.style.display = "none"
        } else {
            item.style.display = "list-item"
        }
    })
    
})

function createListItem(data, sort = null, loadMore = false ) {
    if(sort){
        data = sortProductsByPrice(data, sort);
        mainList.innerHTML = "";
    }

    if(loadMore){
        mainList.innerHTML = "";
    }
    data.forEach(product => {
        let listitem = document.createElement("li");
        let productCard = document.createElement("div");
        productCard.className = "proudct-card";
        let productImg = document.createElement("img");
        productImg.src = product.image;
        let productTitle = document.createElement("p");
        productTitle.textContent = product.title;
        let productCategory = document.createElement("p");
        productCategory.textContent = product.category;
        let productPrice = document.createElement("p");
        productPrice.textContent = product.price;

        productCard.appendChild(productImg);
        productCard.appendChild(productTitle);
        productCard.appendChild(productCategory);
        productCard.appendChild(productPrice);
        listitem.append(productCard);
        mainList.appendChild(listitem);
    });
}

async function getProductCategories() {
    try {
        const response  = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        createCategoryOptions(data);
    } catch (error) {
        console.log(error)
    }
}

function createCategoryOptions(data) {
    data.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDrop.appendChild(option);
    });
}

function sortProductsByPrice(data, value){
    return data.sort( (a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return value === "asc" ? priceA - priceB : priceB - priceA; 
    })
}

getProductCategories();