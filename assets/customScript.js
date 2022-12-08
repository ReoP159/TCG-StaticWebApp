//DEFINICIÓN DE CONSTANTES

//Extracción de elementos de la tabla
const tablehead = document.getElementById("contentTableHead")
const tableBody = document.getElementById("contentTableBody")

//Declaración del HTTP Request
const request = new XMLHttpRequest();

//Definiciónde variables y URL
var container = "datacontainer";
var filename = "Producto.csv";
var url = `https://reopmistorage.blob.core.windows.net/${container}/${filename}`;



var producto;

function onRequesHandler(){
    if(this.readyState == 4 && this.status==200){
        
        producto = this.response.replace(/\"/g,'').split(/\r?\n|\r/).map(
            e =>{
                //Separa cada columna de los registros separados con ","
                return e.split(",").map(element => element.trim());
            }
        );
        console.log(producto[0][0])
            
        let title = {
            codigo:producto[0][0],
            producto:producto[0][1],
            subcategoria:producto[0][2],
            color:producto[0][3],
        }
        
        addTitle(title);

        for (let i = 1; i < 6; i++) {
            addElement({
                codigo:producto[i][0],
                producto:producto[i][1],
                subcategoria:producto[i][2],
                color:producto[i][3],
            })
            
        }
    }
}

function addTitle(element){
    tablehead.innerHTML=`<tr>
    <th>${element.codigo}</th>
    <th>${element.producto}</th>
    <th>${element.subcategoria}</th>
    <th>${element.color}</th>
</tr>`
}

function addElement(element){
    tableBody.innerHTML+=`<tr>
    <td>${element.codigo}</td>
    <td>${element.producto}</td>
    <td>${element.subcategoria}</td>
    <td>${element.color}</td>
    </tr>`
}


request.addEventListener("load",onRequesHandler);
request.open("GET",url);
request.send();


console.log("After the rain")
//Sconsole.log(request.getAllResponseHeaders());
console.log(request.HEADERS_RECEIVED.toString());







