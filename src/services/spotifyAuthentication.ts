import { SpotifyTokenResponse } from '../interfaces/spotify'; 
import axios from 'axios';

const getBase64Credentials = (id: string, secret: string) => {
    return Buffer.from(`${id}:${secret}`).toString('base64');
};

export async function getSpotifyToken(): Promise<SpotifyTokenResponse> {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
        'Authorization': `Basic ${getBase64Credentials(clientId!, clientSecret!)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = 'grant_type=client_credentials';

    try {
        const response = await axios.post<SpotifyTokenResponse>(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error obtaining Spotify token');
    }
}