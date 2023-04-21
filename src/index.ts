import JSZip from "jszip";

if (typeof DOMParser == "function") {
	// We are in the browser
	console.log("We are in the browser");
	
} else {
	// We are in Node
	console.log("We are in node");
	
}
/**
* Obtiene el texto dentro del document.xml en el que está el contenido del Word
* It only works in the browser
* @param {File} file - El archivo de word (.docx) a procesar
* @return {Promise<File>} El texto del xml con el contenido de texto del word ingresado
*/
function loadDocxDocumentFile(file:File): Promise<string> {
	return new Promise((resolve, reject) =>{
		if (!(file instanceof File)) {
			reject("No ingresó un archivo")
		}
		if (file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
			reject("Tipo de archivo no válido");
		}
		let jsZip = new JSZip;
		
		jsZip.loadAsync(file)
		.then(zip => {
			if (zip.files["word/document.xml"]){
				return zip.files["word/document.xml"].async("string");
			} else {
				reject("El documento no tiene el archivo document.xml");
			}
		})
		.then(xmlstr => {
			if (xmlstr) {
				resolve(xmlstr);
			}
			reject("El xml no existe o está vacío");
		})
		.catch(err=>{
			console.log("No se pudo descomprimir el .docx ingresado: " + err);
		})
	})
}
function printZipObject() {
	
	console.log(new JSZip);
	
}


export{loadDocxDocumentFile};
