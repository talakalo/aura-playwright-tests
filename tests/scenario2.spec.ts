import test, { expect } from "@playwright/test";
import { PostPage } from "../pageObjects/post/PostPage";
import { PublisherPage } from "../pageObjects/publisher/PublisherPage";


test.describe('Scenario 2', () => {
    test('Create, link, and edit a post', async ({ page }) => {
        const publisherPage = new PublisherPage(page);
        const postPage = new PostPage(page);

        // Create a publisher
        await publisherPage.navigateToPublisherPage();
        await publisherPage.createPublisher({ name: 'Publisher1', details: 'Details' });

        // Create a post linked to the publisher
        await postPage.navigateToPostPage();
        await postPage.createPost({
            title: 'Test Post',
            content: 'Content for the post',
            publisher: 'Publisher for Post',
            status: 'Active',
            published: true
        });

        // Edit the post to change status
        await postPage.editPost('Test Post', { status: 'Removed' });
        await newPost.fillTitle('edited Title');
        await newPost.fillContent('edited content ');
        await newPost.clickSaveButton()
        expect(page.url()).toContain(`http://localhost:3000/admin/resources/Post/records/${postId}/edit`);

        // Validate status change
        const status = await postPage.getPostStatus('Test Post');
        expect(status).toBe('Removed');
    });
});
