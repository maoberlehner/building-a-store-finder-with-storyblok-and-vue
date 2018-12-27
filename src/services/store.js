import storyblok from '../utils/storyblok';

// In this example we assume we have <= 100 stores,
// if you have more than that you need to make
// additional API requests to fetch all paginated data.
const PER_PAGE_MAX = 100;

// eslint-disable-next-line import/prefer-default-export
export async function list(options) {
  const defaultOptions = {
    resolve_links: 1,
    per_page: PER_PAGE_MAX,
  };
  const response = await storyblok.get(`cdn/stories`, {
    filter_query: {
      // Only fetch stories of type `story_store`.
      component: {
        in: `story_store`,
      },
    },
    ...defaultOptions,
    ...options,
  });

  return response.data.stories;
}
