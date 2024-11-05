import dotenv from 'dotenv';

dotenv.config();

import { getSpotifyToken } from './services/spotifyAuthentication';

async function main() {
    try {
        const tokenData = await getSpotifyToken();
        console.log(tokenData);
    } catch (error) {
        console.error('Erro ao obter token:', error);
    }
}

main();
