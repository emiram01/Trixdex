import { Alien, AlienInformation } from "./Interfaces"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export async function fetchAliens(): Promise<Alien[]> {
    const ALIEN_RETURN_AMOUNT = 62;
    const cancelTokenSource = axios.CancelToken.source();
    try {
        const response = await axios.get(
            `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=Category:Classic_Aliens`,
            { cancelToken: cancelTokenSource.token }
        )
        const pageID = Object.keys(response.data.query.pages)[0];
        const content: string = response.data.query.pages[pageID].revisions[0].slots.main["*"];
        const pattern = /\{\{Portal square 80px\|articlename=([^\|\n]+)(?:\|name=([^\|\n]+))?.*?\}\}/g;

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
        if (axios.isCancel(error)) {
            console.log('request canceled');
        } else {
            throw error;
        } 
    }

    throw new Error('failed to fetch aliens');
}

export async function fetchAlienInformation(articleName: string): Promise<AlienInformation[]> {
    const cancelTokenSource = axios.CancelToken.source();
    try {
        const response = await axios.get(
            `https://ben10.fandom.com/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&format=json&origin=*&titles=${articleName}`,
            { cancelToken: cancelTokenSource.token }
        )
        const pageID = Object.keys(response.data.query.pages)[0];
        const content: string = response.data.query.pages[pageID].revisions[0].slots.main["*"];
        var nameMatch = content.match(/\|name\s*=\s*([^|\n]+)/);

        const fixedContent = nameMatch ? FixContent(nameMatch[1].trim(), content) : content;
        nameMatch = fixedContent.match(/\|name\s*=\s*([^|\n]+)/);
        const speciesMatch = fixedContent.match(/\|species\s*=\s*\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
        const homePlanetMatch = fixedContent.match(/\|home-planet\s*=\s\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
        const bodyMatch = fixedContent.match(/\|body\s*=\s*([^|\n<]+)/);

        const result: AlienInformation[] = [];
        result.push({
            id: uuidv4(),
            name: nameMatch ? nameMatch[1].trim() : 'Unknown',
            species: speciesMatch && !speciesMatch[1].includes('Species') ? speciesMatch[1].trim().replace(' (Classic)', '') : 'Unknown',
            homePlanet: homePlanetMatch ? homePlanetMatch[1].trim().replace(' (Classic)', '') : 'Unknown',
            body: bodyMatch ? bodyMatch[1].trim() : 'Unknown',
        });

        return result;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('request canceled');
        } else {
            throw error;
        } 
    }

    throw new Error("failed to fetch alien information");
}

// Fixing the WikiText generated from the API call
function FixContent(name: string, content: string): string {
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
        case "earthquake}}":
            content = content.replace('earthquake}}', 'Armodrillo');
            break;
        case "Archive}} In addition, his eyes are now green with lightning like eyebrows.":
            content = content.replace('Archive}} In addition, his eyes are now green with lightning like eyebrows.', 'NRG');
            break;
        case "link}}":
            content = content.replace('link}}', 'Shocksquatch');
            break;
        default:
            break;
    }

    return content
}