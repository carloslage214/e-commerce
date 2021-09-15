// intento de codigo pauta 1 y 2 basado en el codigo de categories.js
const ORDER_ASC_BY_PRECIO = "ASC";   
const ORDER_DESC_BY_PRECIO = "DESC";
const ORDER_BY_PROD_PRECIO = "Precio.";
var currentProductsArray = [];   //se usa en sortAndShowProducts para tomar el array de productos
var currentSortCriteria = undefined;  //se usa en sortAndShowProducts para definir el criterio
var minPrecio = undefined;    
var maxPrecio = undefined;

function sortProducts(criteria, array){  //ordena segun los criterios de las constantes
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO) 
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }   //ordena por precio de forma ascendente
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }  //ordena por precio de manera descendente
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_PRECIO){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);   
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function sortAndShowProducts(sortCriteria, productsArray){  //clasifica y muestra los productos en base al criterio de precios
    currentSortCriteria = sortCriteria;             //currentSortCriteria es undefined por defecto y toma el parametro sortCriteria

    if(productsArray != undefined){               
        currentProductsArray = productsArray;  //currentProductsArray vine vacio por defecto y toma el parametro productsArray
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //toma el array de los productos y lo ordena segun el criterio de precios definido.

    //Muestro los productos ordenados
    showProductsList();
}

   //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function () {
    getProducts(PRODUCTS_URL)
});

async function getProducts(url) {
    let resultObj = await getJSONData(url);
    if (resultObj.status === 'ok') {
    
        sortAndShowProducts(ORDER_ASC_BY_PRECIO, resultObj.data);
    }
};

document.getElementById("Asc").addEventListener("click", function(){  //cambié los nombres de las id para reutilizar el codigo de categories.html en products.html
    sortAndShowProducts(ORDER_ASC_BY_PRECIO);
});

document.getElementById("Desc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_PRECIO);
});

document.getElementById("sortByPrecio").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_PRECIO);
});

document.getElementById("LimpiarRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterMin").value = "";
    document.getElementById("rangeFilterMax").value = "";

    minPrecio = undefined;
    maxPrecio = undefined;

    showProductsList();
});
document.getElementById("RangoFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio de los productos
    
    minPrecio = document.getElementById("rangeFilterMin").value;
    maxPrecio = document.getElementById("rangeFilterMax").value;

    if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
        minPrecio = parseInt(minPrecio);
    }
    else{
        minPrecio = undefined;
    }

    if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
        maxPrecio = parseInt(maxPrecio);
    }
    else{
        maxPrecio = undefined;
    }

    showProductsList();
})





function showProductsList(resultObj){

    let htmlContentToAppend = "";
    
       for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(product.cost) >= minPrecio)) &&
            ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(product.cost) <= maxPrecio))){


            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` Artículos</small>
                            
                        </div>
                        <div class"col" align=right>
                        <small class="text-muted">` + product.cost + ` Precio</small>      
                         </div>

                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }

}