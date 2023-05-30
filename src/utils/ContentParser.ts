import { Alien, AlienInformation } from "./Interfaces"
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse, CancelTokenSource } from "axios";

export async function fetchAliens(cancelTokenSource: CancelTokenSource): Promise<Alien[]> {
    const ALIEN_RETURN_AMOUNT = 62;
    try {
        const response = await axios.get(
            `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=Category:Classic_Aliens`,
            { cancelToken: cancelTokenSource.token }
        )
        const content = getContent(response);
        const pattern = /\|articlename=([^\|\n]+)(?:\|name=([^\|\n]+))?.*?\}\}/g;
        const result: Alien[] = [];
        let match = pattern.exec(content);
        let i = 0;
        while (i < ALIEN_RETURN_AMOUNT && match !== null) {
            const [, articleName, name] = match;
            const alienName = articleName.includes('Ultimate') ? articleName : name || articleName;
            const id = uuidv4();
            result.push({ id, articleName, name: alienName });
            match = pattern.exec(content)
            i++;
        }

        return result;
    } catch (error) {
        throw error
    }
}

export async function fetchAlienInformation(alien: Alien, cancelTokenSource: CancelTokenSource): Promise<AlienInformation[]> {
    try {
        const response = await axios.get(
            `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=${alien.articleName}`,
            { cancelToken: cancelTokenSource.token }
        )
        const content: string = getContent(response);
        const fixedContent = fixContent(alien.name, content);
        const result: AlienInformation[] = [];
        result.push({
            id: alien.id,
            species: getInfoFromContent('|species = ', fixedContent),
            homePlanet: getInfoFromContent('|home-planet = ', fixedContent),
            body: getInfoFromContent('|body = ', fixedContent),
        });

        return result;
    } catch (error) {
        throw error;
    }
}

function getContent(response: AxiosResponse): string {
    const pageID = Object.keys(response.data.query.pages)[0];
    const content: string = response.data.query.pages[pageID].revisions[0].slots.main["*"];
    return content;
}

function getInfoFromContent(infoType: string, content: string): string {
    let info: string;
    let matches: RegExpMatchArray | null;
    const startIndex = content.indexOf(infoType) + infoType.length;
    const endIndex = content.indexOf('\n', startIndex);

    switch (infoType) {
        case '|home-planet = ':
        case '|species = ':
            matches = content.substring(startIndex, endIndex).match(/\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
            info = matches && !matches[1].includes('Species') ? matches[1].trim().replace(' (Classic)', '') : 'Unknown';
            break;
        case '|body = ':
            matches = content.substring(startIndex, endIndex).match(/([^|\n<]+)/);
            info = matches ? matches[1].trim() : 'Unknown';
            break;
        default:
            info = 'info not found';
            break;
    }

    return info;
}

// Fixing the WikiText generated from the API call
function fixContent(name: string, content: string): string {
    switch(name) {
        case "Nanomech":
            content = content.replace('\u00bd [[Human (Classic)|Human]] \u00bd [[Nanochip]]', '[[1/2 Human 1/2 Nanochip]]');
            break;
        case "Upchuck":
            content = content
            .replace('Perk/Murk [[Gourmand]]', '[[Perk/Murk Gourmand]]')
            .replace(
                "Peptos I - X <small>(destroyed)</small>{{Refn|name=TVPU|group=pop-up}}<ref name=\"TV\">''[[The Visitor]]''</ref><br>[[Peptos XI]] <small>(destroyed)</small><br>[[Peptos XII]]", 
                '[[Peptos XII, Peptos I-XI (Destroyed)]]')
            .replace('{{Refn|[[:File:Upchuck Amoeba Creature.png]]|group = TP|name = amoeba}}', 
                '');
            break;
        case "Way Big":
            content = content.concat("|home-planet = [[Cosmic storms]]\n")
            break;
        case "Goop":
            content = content.replace('Unknown <small>(native; destroyed)</small><br>[[Viscosia (Classic)|Viscosia]]', '[[Viscosia]]');
            break;
        default:
            break;
    }

    return content
}