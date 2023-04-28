import JSZip from "jszip";

/**
 * Obtiene el texto dentro del document.xml en el que está el contenido del Word
 * @param {string|File} file - El archivo de word (.docx) a procesar (Su ubicación o el File)
 * @return {Promise<File>} El texto del xml con el contenido de texto del word ingresado
 */
function loadDocxMainXml(file: File): Promise<Document> {
    return new Promise((resolve, reject) => {
        if (file.type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            reject("Tipo de archivo no válido");
        }
        let jsZip = new JSZip();

        jsZip
            .loadAsync(file)
            .then((zip) => {
                if (zip.files["word/document.xml"]) {
                    return zip.files["word/document.xml"].async("string");
                } else {
                    reject("El documento no tiene el archivo document.xml");
                }
            })
            .then((xmlstr) => {
                if (xmlstr) {
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(xmlstr, "text/xml");
                    resolve(xmlDoc);
                }
                reject("El xml no existe o está vacío");
            })
            .catch((err) => {
                console.log("No se pudo descomprimir el .docx ingresado: " + err);
            });
    });
}
/**
 * Converts a .docx file to a simple string
 * @param file .docx file to parse
 * @returns string with the simplified version of the word document
 */
function docx2str(file: File): Promise<string> {
	
    return new Promise<string>((resolve, reject) => {
        loadDocxMainXml(file).then((xml) => {
            let text = "";
            let paragraphs = Array.from(xml.getElementsByTagName("w:p"));
            [...paragraphs].forEach((paragraph) => {
                if (paragraph.hasChildNodes()) {
                    let runs = Array.from(paragraph.getElementsByTagName("w:r"));
                    [...runs].forEach((run) => {
                        if (run.hasChildNodes()) {
                            let text_chunks = Array.from(run.getElementsByTagName("w:t"));
                            [...text_chunks].forEach((text_chunk) => {
                                text += text_chunk.childNodes[0].nodeValue;
                            });
                        }
                    });
                    text += "\n";
                }
            });
            resolve(text);
        });
    });
}
/**
 * Function that helps you take an input's selected docx and convert them to strings
 * @param inputElement inputElement from which we will take the .docx files to convert
 * @returns a promise that resolves in an array with all the strings of each .docx converted
 */
function docxInputs2Str(inputElement: HTMLInputElement): Promise< Array<string> > {
    return new Promise< Array<string> >((resolve, reject) => {
		
		let promises:Array< Promise<string> > = [];
        if (inputElement) {
            if (inputElement.files) {
				[...Array.from(inputElement.files)].forEach(file => {
					
					promises.push(docx2str(file));
					
				});
                
				resolve(Promise.all(promises));
            }
			reject("No hay archivos seleccionados")
        };
		reject("No hay un inputElement del cual consumir el .docx")
    });
};

export default docx2str;
export { loadDocxMainXml, docx2str, docxInputs2Str };
