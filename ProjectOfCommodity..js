let title = document.getElementById("title");
let price = document.getElementById("price");
let count = document.getElementById("count");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let total = document.getElementById("total");
let create = document.getElementById("create");


 //Count The prices
console.log(typeof price)
function getTotal(){
    if(price.value !=""){
        let result = JSON.stringify((+price.value + +taxes.value + +ads.value) - +discount.value);
        total.value = "Total: " + result;
        total.style.background='green';
    }else{
        total.value = ""
        total.value = "Total: "
        total.style.background = 'red';
    }
}

let mode = 'create';
let error = document.getElementById("eror");
//Create Button
let datepro;
if(localStorage.Product != null){
    datepro = JSON.parse(localStorage.Product)
}else{
    datepro = [];
}

create.onclick = function(){
    let dateobj = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if((title.value && category.value) != ""){
        if(count.value < 100){
            if(mode == 'create'){
                if (dateobj.count > 0){
                for(let i =0 ; i < +count.value ; i++){
                    datepro.push(dateobj);
                }}else{
                    datepro.push(dateobj);
                }
            }else{
                datepro[savi].title = title.value;
                datepro[savi].price = price.value;
                datepro[savi].taxes = taxes.value;
                datepro[savi].ads = ads.value;
                datepro[savi].discount = discount.value;
                datepro[savi].category = category.value;
            }
            localStorage.setItem("Product",JSON.stringify(datepro));
            console.log(datepro);
            clearedate();
            showoutput();
            location.reload(); 

    }else{
        error.innerText ="The number of count should be less than 100";
    }
}

}




//delete All
let deleteall = document.getElementById("deleteobj");

if(datepro.length > 0){
    deleteall.classList.remove("hide");
    deleteall.onclick = function(){
        localStorage.removeItem('Product'); 
        project.style.backgroundColor = 'black';
        location.reload();    
}
}else{
    deleteall.classList.add("hide");
}

showoutput();








//clear inputs
function clearedate(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.value = '';
}


//Show the output 
let tablecount =' ';
function showoutput(){
    let table =' ';
    let i;
    for( i = 0;  i < datepro.length; i++){
            table += `
             <tr>
                        <td>${i+1}</td>
                        <td>${datepro[i].title}</td>
                        <td>${datepro[i].price}</td>
                        <td>${datepro[i].taxes}</td>
                        <td>${datepro[i].ads}</td>
                        <td>${datepro[i].discount}</td>
                        <td>${datepro[i].total}</td>
                        <td>${datepro[i].category}</td>
                        <td><button onclick="updatebtn(${i})" id="update">update</button></td>
                        <td><button onclick="deletebtn(${i})" id="deletebtn">delete</button></td>
                    </tr>
            
            `;
            
    }
    document.getElementById("tbody").innerHTML = table;
}




//delete btn
function deletebtn(i){
    console.log(datepro.splice(i,1));
    localStorage.Product = JSON.stringify(datepro);
    location.reload();
}

//count btn
function countfun(){
    for(let i =0; i < count.value ; i++){
        document.getElementById("tbody").innerHTML = table;
    }
}




//update btn
let savi = 0;
function updatebtn(i){

    savi = i;    
    title.value = datepro[i].title;
    price.value = datepro[i].price;
    taxes.value = datepro[i].taxes;
    ads.value = datepro[i].ads;
    discount.value = datepro[i].discount;
    getTotal()
    count.style.display = 'none';
    count.value = datepro[i].count;
    category.value = datepro[i].category;
    create.innerHTML = 'Update';
    mode = 'update';

}


//serach
let modeSearch = "title";
let searchtitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchcategory");
let search = document.getElementById("search");

function checkMode(id){
    if(id === "searchTitle"){
        modeSearch = "title";
        search.setAttribute("placeholder","Search By Title");
        search.focus();
    }else{
        modeSearch = "searchcategory";
        search.setAttribute("placeholder","Search By Category");
        search.focus();
    }
}

function getDateFromSearch(date){
    let table = '';
    date = date.toLowerCase();
    if(modeSearch === "title"){
        console.log(modeSearch);
        for(let i =0; i < datepro.length; i++){
            if(datepro[i].title.includes(date)){
                console.log(i);
                table += `
             <tr>
                        <td>${i+1}</td>
                        <td>${datepro[i].title}</td>
                        <td>${datepro[i].price}</td>
                        <td>${datepro[i].taxes}</td>
                        <td>${datepro[i].ads}</td>
                        <td>${datepro[i].discount}</td>
                        <td>${datepro[i].total}</td>
                        <td>${datepro[i].category}</td>
                        <td><button onclick="updatebtn(${i})" id="update">update</button></td>
                        <td><button onclick="deletebtn(${i})" id="deletebtn">delete</button></td>
                    </tr>
            
            `;
            
            }
        }
    }else{
            for(let i =0; i < datepro.length; i++){
                if(datepro[i].category.includes(date)){
                    table += `
                 <tr>
                            <td>${i+1}</td>
                            <td>${datepro[i].title}</td>
                            <td>${datepro[i].price}</td>
                            <td>${datepro[i].taxes}</td>
                            <td>${datepro[i].ads}</td>
                            <td>${datepro[i].discount}</td>
                            <td>${datepro[i].total}</td>
                            <td>${datepro[i].category}</td>
                            <td><button onclick="updatebtn(${i})" id="update">update</button></td>
                            <td><button onclick="deletebtn(${i})" id="deletebtn">delete</button></td>
                        </tr>
                
                `;
                
                }
            }
        





    }









    document.getElementById("tbody").innerHTML = table;




}


