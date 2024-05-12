import { readFile } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

export async function readTestData(filePath: string): Promise<any> {
    try {
        const data = await readFileAsync(filePath, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read test data:', error);
        return null;
    }
}
