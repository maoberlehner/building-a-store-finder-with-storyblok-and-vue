import StoryblokClient from 'storyblok-js-client';

// This is the place for your personal access
// token which you can find in the settings
// section of your Storyblok space.
const ACCESS_TOKEN = `E4hKZiPPl2OZ6ErnofrW2Att`;

export default new StoryblokClient({
  accessToken: ACCESS_TOKEN,
});
