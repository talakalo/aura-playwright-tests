import axios from 'axios';
import test, { expect } from '@playwright/test';
import { Pages } from '../pageObjects/sidebar/Sidebar';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
    headers: {
        'Content-Type': 'application/json',
        // Add authentication headers or other necessary headers here
    }
});

async function Create(name: string, email: string,entity:Pages) {
    const response = await apiClient.post(`/resources/${entity}/actions/new`, { name, email });
    return response.data;
}
async function Edit(name: string, email: string,entity:Pages) {
    const response = await apiClient.post(`/resources/${entity}/actions/edit`, { name, email });
    return response.data;
}
async function Show(name: string, email: string,entity:Pages) {
    const response = await apiClient.post(`/resources/${entity}/records/${id}/show`, { name, email });
    return response.data;
}
//resources/Publisher/records/67/show  

async function Delete(id:string , entity:Pages){
    const response = await apiClient.delete(`/resources/${entity}/records/${id}/delete`);
    return response.status === 204; // Assuming 204 No Content on successful deletion
}

// Define other necessary API operations in a similar manner...

test.describe('Scenario 3 & 4: CRUD using API', () => {
    test('Create and delete a publisher using API', async () => {
        const publisher = await Create('New Publisher', 'Some details',Pages.Publisher);
        const deleteSuccess = delete (publisher.id);
        expect(deleteSuccess).toBeTruthy();
    });

    // Additional tests for other operations...
});
