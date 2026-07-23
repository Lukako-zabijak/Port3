import { describe, expect, it } from 'vitest';
import { client_reviews } from './content';

describe('client review content', () => {
  it('publishes the approved bungo battlegrounds review', () => {
    expect(client_reviews).toHaveLength(1);
    expect(client_reviews[0]).toMatchObject({
      client: 'Pixieyaps2',
      project: 'Bungo Battlegrounds',
      role: 'Roblox combat-system client',
      disclosure: 'Edited for clarity and length',
    });
    expect(client_reviews[0].quote).toContain('100x smoother and better');
    expect(client_reviews[0].proof).toEqual([
      'Combat overhaul',
      'New move system',
      'Security fixes',
      'Bug fixing',
    ]);
  });
});
