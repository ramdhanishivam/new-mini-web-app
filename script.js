let mainList = document.getElementById("main-list");
let categoryDrop = document.getElementById("categoryDrop")

async function getFakeStoreData(){
    try{
        const response  = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        createListItem(data);

    } catch (error){
        console.log(error)
    }
}

getFakeStoreData();

function createListItem(data) {
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

async function getProductCategories(){
    try{
        const response  = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        createCategoryOptions(data);

    } catch (error){
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

getProductCategories();