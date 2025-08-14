import { renderHook, waitFor } from '@testing-library/react';
import type { SortAsyncGenerator } from '@sortViz/models/types';
import useAlgo from '../../hooks/use-algo.hook';

// Mock global simulator
jest.mock('@sortViz/store/global.state', () => ({
  simulator: {
    isPlayingPromise: Promise.resolve(),
  },
}));

async function* mockAlgorithm(): SortAsyncGenerator {
  yield { type: 'highlight', positions: [0, 1] };
  yield { type: 'swap', positions: [0, 2] };
  yield { type: 'sort', position: 3 };
  yield { type: 'pivot', position: 4 };
  yield { type: 'move', positions: [5, 6] };
}

describe('useAlgo hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process algorithm steps correctly', async () => {
    const { result } = renderHook(() => useAlgo([1, 2, 3], mockAlgorithm));

    // Initial state
    expect(result.current.swaps).toEqual([-1, -1]);
    expect(result.current.sorts).toEqual([]);
    expect(result.current.isCompleted).toBe(false);

    // Wait for completion
    await waitFor(() => expect(result.current.isCompleted).toBe(true));

    // Final state assertions
    expect(result.current.sorts).toEqual([3]);
    expect(result.current.pivot).toBe(4);
    expect(result.current.moves).toEqual([5, 6]);
    expect(result.current.swapCount).toBe(2); // 1 swap + 1 move
    expect(result.current.compareCount).toBe(1); // 1 highlight
  });

  it('should handle empty algorithm', async () => {
    async function* emptyAlgorithm(): SortAsyncGenerator {
      // No operations
    }
    const { result } = renderHook(() => useAlgo([], emptyAlgorithm));

    // Should complete immediately
    await waitFor(() => expect(result.current.isCompleted).toBe(true));

    // Default values preserved
    expect(result.current.swaps).toEqual([-1, -1]);
    expect(result.current.sorts).toEqual([]);
    expect(result.current.swapCount).toBe(0);
  });
});
