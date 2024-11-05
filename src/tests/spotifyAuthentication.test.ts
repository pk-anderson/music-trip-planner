import { getSpotifyToken } from '../services/spotifyAuthentication'; 
import axios from 'axios';

jest.mock('axios'); 

describe('getSpotifyToken', () => {
    it('should return a valid access token', async () => {
        const mockedResponse = {
            data: {
                access_token: 'mocked_access_token',
                token_type: 'Bearer',
                expires_in: 3600
            }
        };

        (axios.post as jest.Mock).mockResolvedValue(mockedResponse);

        const tokenData = await getSpotifyToken();

        expect(tokenData).toHaveProperty('access_token');
        expect(tokenData.access_token).toBeDefined();
        expect(tokenData.access_token).not.toBe('');
        expect(tokenData).toHaveProperty('token_type', 'Bearer');
        expect(tokenData).toHaveProperty('expires_in', 3600);
    });

    it('should throw an error when the Spotify API fails', async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error('Spotify API error'));

        await expect(getSpotifyToken()).rejects.toThrow('Error obtaining Spotify token');
    });
});
