//--------WIKIMEDIA API DATA FETCHING PROCESS, DATA NOW BEING STORED IN LOCAL JSON FILE | Kept for future reference---------

// import { Alien } from "./Interfaces"
// import { v4 as uuidv4 } from 'uuid';
// import axios, { AxiosResponse, CancelTokenSource } from "axios";

// export async function fetchAliens(cancelTokenSource: CancelTokenSource): Promise<Alien[]> {
//     try {
//         const response = await axios.get(
//             './aliens.json',
//             { cancelToken: cancelTokenSource.token }
//         )
//         const content = getContent(response);
//         const pattern = /\|articlename=([^\|\n]+)(?:\|name=([^\|\n]+))?.*?\}\}/g;
//         const aliens: Alien[] = [];
//         let match = pattern.exec(content);
//         let i = 0;
//         while (i < ALIEN_RETURN_AMOUNT && match !== null) {
//             const [, articleName, name] = match;
//             const alienName = articleName.includes('Ultimate') ? articleName : name || articleName;
//             const id = uuidv4();
//             aliens.push({ id, articleName, name: alienName });
//             match = pattern.exec(content)
//             i++;
//         }

//         return aliens;
//     } catch (error) {
//         throw error
//     }
// }

// export async function fetchAliens(cancelTokenSource: CancelTokenSource): Promise<Alien[]> {
//     const ALIEN_RETURN_AMOUNT = 62;
//     try {
//         const response = await axios.get(
//             `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=Category:Classic_Aliens`,
//             { cancelToken: cancelTokenSource.token }
//         )
//         const content = getContent(response);
//         const pattern = /\|articlename=([^\|\n]+)(?:\|name=([^\|\n]+))?.*?\}\}/g;
//         const aliens: Alien[] = [];
//         let match = pattern.exec(content);
//         let i = 0;
//         while (i < ALIEN_RETURN_AMOUNT && match !== null) {
//             const [, articleName, name] = match;
//             const alienName = articleName.includes('Ultimate') ? articleName : name || articleName;
//             const id = uuidv4();
//             aliens.push({ id, articleName, name: alienName });
//             match = pattern.exec(content)
//             i++;
//         }

//         return aliens;
//     } catch (error) {
//         throw error
//     }
// }

// export async function fetchAlienInformation(alien: Alien, cancelTokenSource: CancelTokenSource): Promise<AlienInformation[]> {
//     try {
//         const response = await axios.get(
//             `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=${alien.articleName}`,
//             { cancelToken: cancelTokenSource.token }
//         )
//         const content: string = getContent(response);
//         const alienInfo: AlienInformation[] = [];
//         alienInfo.push({
//             id: alien.id,
//             name: alien.name,
//             species: getInfo('|species = ', content),
//             homePlanet: getInfo('|home-planet = ', content),
//             body: getInfo('|body = ', content),
//             description: getInfo('==Appearance==\n', content),
//             abilities: getInfo('==Powers and Abilities==\n', content).split(','),
//             weaknesses: getInfo('==Weaknesses==\n', content).split(',')
//         });

//         console.log(JSON.stringify(alienInfo, null, 2));

//         return alienInfo;
//     } catch (error) {
//         throw error;
//     }
// }

// function getContent(response: AxiosResponse): string {
//     const pageID = Object.keys(response.data.query.pages)[0];
//     const content: string = response.data.query.pages[pageID].revisions[0].slots.main["*"];
//     return content;
// }

// function getInfo(infoType: string, content: string): string {
//     let info: string;
//     let matches: RegExpMatchArray | null;
//     let startIndex = content.indexOf(infoType) + infoType.length;

//     let endIndex = content.indexOf('\n', startIndex);

//     switch (infoType) {
//         case '|home-planet = ':
//         case '|species = ':
//             matches = content.substring(startIndex, endIndex).match(/\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
//             info = matches && !matches[1].includes('Species') ? matches[1].trim().replace(' (Classic)', '') : 'Unknown';
//             break;
//         case '|body = ':
//             matches = content.substring(startIndex, endIndex).match(/([^|\n<]+)/);
//             info = matches ? matches[1].trim() : 'Unknown';
//             break;
//         case '==Appearance==\n':
//             info = content.substring(startIndex, endIndex);
//             if (info.includes('===')) {
//                 startIndex = endIndex + 1;
//                 endIndex = content.indexOf('\n', startIndex);
//                 info = content.substring(startIndex, endIndex);
//             }
//             info = info.replace(/\[\[[^\]]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[[^\]]+\|([^\]]+)\]\]|{{[^}]+}}|<ref[^>]*>.*?<\/ref>|<ref[^>]*\/>|\[\[|\]\]/g, '');
//             break;
//         case '==Powers and Abilities==\n':
//         case '==Weaknesses==\n':
//             info = content.substring(startIndex, endIndex);
//             if (info.includes('<gallery')) {
//                 endIndex = content.indexOf('\n</gallery>', startIndex);
//                 matches = content.substring(startIndex, endIndex).match(/(?:\|)([^\|\n]+)/g);
//                 info = matches ? matches.map(match => match.replace('|', '')).join(', ').trim() : 'Unknown';
//             } else {
//                 endIndex = content.indexOf(']]\n', startIndex);
//                 matches = content.substring(startIndex, endIndex).match(/\[\[[^\]]+\|[^|\]]+\|([^\]]+)/);
//                 info = matches ? matches[1] : 'Unknown';
//             }
//             break;
//         default:
//             info = 'info not found';
//             break;
//     }

//     return info;
// }