import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

/**
 * Converte string XML para objeto JSON
 * 
 * @param xmlString - String XML a ser convertida
 * @returns Objeto JSON parseado
 */
export async function xmlToJson(xmlString: string): Promise<any> {
  try {
    const result = await parseXML(xmlString);
    return result;
  } catch (error) {
    console.error('Erro ao parsear XML:', error);
    throw error;
  }
}

