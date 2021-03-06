//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function () {
    getProductInfo(PRODUCT_INFO_URL);

});

async function getProductInfo(url) {
    let resultObj = await getJSONData(url);
    if (resultObj.status === 'ok') {
        showProductInfo(resultObj.data);
    } else {
        console.log(resultObj.status);
    }
}



function showProductInfo(resultObj){

    let htmlContentToAppend = "";
    for(let i = 0; i < resultObj.length; i++){
        let product = resultObj[i];

       
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.cost + `</p>
                    </div>
                </div>
            </a>
            ` ;
            console.log(product)
        }

        document.getElementById("product-info-container").innerHTML = htmlContentToAppend;
    }