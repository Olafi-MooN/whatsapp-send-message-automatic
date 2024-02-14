import fs from 'fs';

const CreateFile = (fileContent: string, fileName: string) => fs.writeFileSync(__dirname + '/../documents/csv/' + fileName, fileContent);

export { CreateFile };
