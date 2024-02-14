interface ICsvInterfaceFile {
	Nome: string;
	Contatos: string;
	Código: string;
	// [key: string]: any;
}

import csvToJson from 'convert-csv-to-json';

let GetCSVContactInfoToJson = (fileName: string) => csvToJson.getJsonFromCsv(__dirname + `/../documents/csv/${fileName}`) as ICsvInterfaceFile[];

export { GetCSVContactInfoToJson };
