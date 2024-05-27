import { expect, test } from 'vitest';
import { derive } from 'derive-zustand';

test('should export functions', () => {
  expect(derive).toBeDefined();
});
