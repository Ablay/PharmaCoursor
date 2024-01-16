import * as fs from "node:fs";

export function createDirectory(folder) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, { recursive: true });
	}
};

export function deleteFileById(folder, id) {
	const filePath = `${folder}/mock_${id}.json`;

	try {
		fs.unlinkSync(filePath);
	} catch (error) {
		return null;
	}
};

export function getMockById(folder, id) {
	const filePath = `${folder}/mock_${id}.json`;

	try {
		fs.accessSync(filePath, fs.constants.R_OK);

		const fileContent = fs.readFileSync(filePath, "utf-8");
		const data = JSON.parse(fileContent);

		return data;
	} catch (error) {
		return null;
	}
};

export function clearHTMLAndCut(str, length) {
	return str.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, ' ').substring(0, length);
};