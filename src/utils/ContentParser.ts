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
        const aliens: Alien[] = [];
        let match = pattern.exec(content);
        let i = 0;
        while (i < ALIEN_RETURN_AMOUNT && match !== null) {
            const [, articleName, name] = match;
            const alienName = articleName.includes('Ultimate') ? articleName : name || articleName;
            const id = uuidv4();
            aliens.push({ id, articleName, name: alienName });
            match = pattern.exec(content)
            i++;
        }

        // console.log(JSON.stringify(aliens, null, 2));

        return aliens;
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
        const alienInfo: AlienInformation[] = [];
        alienInfo.push({
            id: alien.id,
            name: alien.name,
            species: getInfo('|species = ', fixedContent),
            homePlanet: getInfo('|home-planet = ', fixedContent),
            body: getInfo('|body = ', fixedContent),
            description: getInfo('==Appearance==\n', fixedContent),
            abilities: getInfo('==Powers and Abilities==\n', fixedContent).split(','),
            weaknesses: getInfo('==Weaknesses==\n', fixedContent).split(',')
        });

        console.log(JSON.stringify(alienInfo, null, 2));

        return alienInfo;
    } catch (error) {
        throw error;
    }
}

function getContent(response: AxiosResponse): string {
    const pageID = Object.keys(response.data.query.pages)[0];
    const content: string = response.data.query.pages[pageID].revisions[0].slots.main["*"];
    return content;
}

function getInfo(infoType: string, content: string): string {
    let info: string;
    let matches: RegExpMatchArray | null;
    let startIndex = content.indexOf(infoType) + infoType.length;

    let endIndex = content.indexOf('\n', startIndex);

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
        case '==Appearance==\n':
            info = content.substring(startIndex, endIndex);
            if (info.includes('===')) {
                startIndex = endIndex + 1;
                endIndex = content.indexOf('\n', startIndex);
                info = content.substring(startIndex, endIndex);
            }
            info = info.replace(/\[\[[^\]]+\|([^\]]+)\]\]/g, '$1').replace(/\[\[[^\]]+\|([^\]]+)\]\]|{{[^}]+}}|<ref[^>]*>.*?<\/ref>|<ref[^>]*\/>|\[\[|\]\]/g, '');
            break;
        case '==Powers and Abilities==\n':
        case '==Weaknesses==\n':
            info = content.substring(startIndex, endIndex);
            if (info.includes('<gallery')) {
                endIndex = content.indexOf('\n</gallery>', startIndex);
                matches = content.substring(startIndex, endIndex).match(/(?:\|)([^\|\n]+)/g);
                info = matches ? matches.map(match => match.replace('|', '')).join(', ').trim() : 'Unknown';
            } else {
                endIndex = content.indexOf(']]\n', startIndex);
                matches = content.substring(startIndex, endIndex).match(/\[\[[^\]]+\|[^|\]]+\|([^\]]+)/);
                info = matches ? matches[1] : 'Unknown';
            }
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
            content = content
            .replace('\u00bd [[Human (Classic)|Human]] \u00bd [[Nanochip]]', '[[1/2 Human 1/2 Nanochip]]');
            break;
        case "Upchuck":
            content = content
            .replace('|species = ', '|species = [[Perk/Murk Gourmand]]')
            .replace('|home-planet = ', '|home-planet = [[Peptos XII, Peptos I-XI (Destroyed)]]')
            .replace('|body = ', '|body = Humanoid Amoeba\n')
            .replace('\nPerk Upchuck', '\nUpchuck');
            break;
        case "Way Big":
            content = content
            .concat("|home-planet = [[Cosmic storms]]\n")
            break;
        case "Goop":
            content = content
            .replace('|home-planet = ', '|home-planet = [[Viscosia]]');
            break;
        case "Diamondhead":
            content = content
            .replace("form<ref>", " form,<ref>");
            break;
        case "Toepick":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Unbalanced, Below Average Reflexes, Drones/Robots, Blind/Deaf Beings]]\n");
            break;
        case "Kickin Hawk":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Vulnerablility to Energy-Based Attacks, Vulnerablility to Electricity]]\n");
            break;
        case "Bullfrag":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Strong Smells, Overstretched Tongue]]\n");
            break;
        case "Snare-oh":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Strong Winds, Freezing]]\n");
            break;
        case "Ripjaws":
            content = content
            .replace('== Powers and Abilities==', '==Powers and Abilities==');
            break;
        case "Chamalien":
        case "Stinkfly":
            content = content
            .replace('== Appearance==', '==Appearance==');
            break;
        case "Pesky Dust":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Small Size, Drones/Robots]]\n");
            break;
        case "Buzzshock":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Small Size, Insulation]]\n");
            break;
        case "Mole-Stache":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Small Size, Strength Limit]]\n");
            break;
        case "Arctiguana":
            content = content
            .replace('==Weaknesses==\n', "==Weaknesses==\n [[|x|x|Overexertion]]\n");
            break; 
        case "Eatle":
            content = content
            .replace("In '''[[Ben 10: Ultimate Alien|Ultimate Alien]]''', ", '');
            break;
        case "Blitzwolfer":
            content = content
            .replace("Blitzwolfer's appearance is based on a [[Wikipedia:Werewolf|werewolf]].\n\nIn the '''[[Ben 10|Original Series]]''',", '')
            .replace(/had/g, 'has')
            .replace(/was/g, 'is')
            .replace(/wore/g, 'wears');
            break;
        case "Echo Echo":
            content = content
            .replace('suit.{{Refn', 'suit.\n');
            break;
        case "Humungousaur":
            content = content
            .replace('side. Both', 'side.\n');
            break;
        default:
            break;
    }

    return content
}