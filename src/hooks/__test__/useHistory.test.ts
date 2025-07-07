import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useHistory } from '../useHistory';
import { HistoryProvider } from '../../contexts/HistoryProvider';
import { Method } from 'axios';
import { MaxHistoryLength } from '../../constants';

describe('useHistory hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('doit fournir un tableau d"historique initialement vide', () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });
    expect(result.current.history).toEqual([]);
  });

  it("doit ajouter une nouvelle entrée à l'historique via addHistoryEntry", () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });
    const newEntry = {
      method: 'GET' as Method,
      microservice: 'test-service',
      endpoint: 'test-endpoint',
      payloadText: '{}',
    };

    act(() => {
      result.current.addHistoryEntry(newEntry);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].method).toBe('GET');
  });

  it('doit supprimer une seule entrée de l"historique via removeHistoryEntry', () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });
    let entryIdToDelete: string;

    act(() => {
      result.current.addHistoryEntry({
        method: 'GET' as Method,
        microservice: 'service1',
        endpoint: 'ep1',
        payloadText: '{}',
      });
    });
    act(() => {
      vi.advanceTimersByTime(10);
    });
    act(() => {
      result.current.addHistoryEntry({
        method: 'POST' as Method,
        microservice: 'service2',
        endpoint: 'ep2',
        payloadText: '{}',
      });
    });

    entryIdToDelete = result.current.history[1].id;
    act(() => {
      result.current.removeHistoryEntry(entryIdToDelete);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].microservice).toBe('service2');
  });

  it('doit remonter une requête existante en haut de la liste au lieu de créer un doublon', () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });
    const entry = {
      method: 'PUT' as Method,
      microservice: 'service-unique',
      endpoint: 'ep-unique',
      payloadText: '{"a":1}',
    };

    act(() => {
      result.current.addHistoryEntry(entry);
      result.current.addHistoryEntry(entry);
    });

    expect(result.current.history).toHaveLength(1);
  });

  it("ne doit pas stocker plus d'entrées que la limite MaxHistoryLength", () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });
    const limit = MaxHistoryLength;

    act(() => {
      for (let i = 0; i < limit + 5; i++) {
        result.current.addHistoryEntry({
          method: 'GET' as Method,
          microservice: `service${i}`,
          endpoint: 'ep',
          payloadText: '{}',
        });
      }
    });

    expect(result.current.history).toHaveLength(limit);
    expect(result.current.history[0].microservice).toBe(`service${limit + 4}`);
  });

  it("doit vider l'historique quand on appelle clearHistory", () => {
    const { result } = renderHook(() => useHistory(), { wrapper: HistoryProvider });

    act(() => {
      result.current.addHistoryEntry({
        method: 'POST' as Method,
        microservice: 'test',
        endpoint: 'test',
        payloadText: '{}',
      });
    });
    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toEqual([]);
  });
});
