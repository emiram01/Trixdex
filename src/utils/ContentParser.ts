import axios from "axios";

interface Alien {
    articleName: string;
    name: string;
}

export async function fetchAliens(): Promise<Alien[]> {
    const ALIEN_RETURN_AMOUNT = 70;
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
            result.push({ articleName, name: alienName });
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

interface AlienInformation {
    name: string;
    species: string;
    homePlanet: string; 
    body: string;
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
        const nameMatch = content.match(/\|name\s*=\s*([^|\n]+)/);
        const speciesMatch = content.match(/\|species\s*=\s*\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
        const homePlanetMatch = content.match(/\|home-planet\s*=\s\[\[([^\[\]\|]+)(?:\s*\([^)]*\))?(?:\|[^\]]*)?\]\]/);
        const bodyMatch = content.match(/\|body\s*=\s*([^|\n<]+)/);
        const result: AlienInformation[] = [];
        result.push({
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