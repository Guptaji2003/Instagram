const DataURIParser = require("datauri/parser");
const path = require("path");
const parser = new DataURIParser();

const getDataUri = (file) => {
  if (!file || !file.path) {
    throw new Error("File path is missing or invalid"); 
  }

  const extName = path.extname(file.originalname); 
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
