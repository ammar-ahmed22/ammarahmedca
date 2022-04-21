import { readFileSync } from "fs";


const readContent = ( file ) => {
    return readFileSync(file).toString("utf-8")
}

export default readContent;