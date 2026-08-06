import { describe, expect, it } from 'vitest';
import { work_items, youtube_thumbnail_url, youtube_url } from './works';

describe('works catalog', () => {
  it('contains every carrd video once', () => {
    expect(work_items).toHaveLength(10);
    expect(new Set(work_items.map((item) => item.youtube_id)).size).toBe(10);
  });

  it('links every project to youtube-hosted media', () => {
    work_items.forEach((item) => {
      expect(youtube_url(item.youtube_id)).toContain('youtube.com/watch');
      expect(youtube_thumbnail_url(item.youtube_id)).toContain('i.ytimg.com/vi/');
      expect(item.description.length).toBeGreaterThan(20);
    });
  });
});
