import {docxInputs2Str} from '../../'
let docx_input = document.getElementById("docx_input") as HTMLInputElement;

docx_input.addEventListener("change", (ev)=>{
	if (ev.currentTarget instanceof HTMLInputElement) {
		console.log("Es Input");
		
		docxInputs2Str(ev.currentTarget)
		.then(stringified_docs=>{
			stringified_docs.forEach(strdoc=>{
				console.log(strdoc);
				
			})
		}

		);
	}
})




