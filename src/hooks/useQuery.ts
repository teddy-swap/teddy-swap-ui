import { parse, ParsedQs } from 'qs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function parsedQueryString(search?: string): ParsedQs {
  if (!search) {
    const hash = window.location.hash;
    search = hash.substr(hash.indexOf('?'));
  }

  return search && search.length > 1
    ? parse(search, { parseArrays: false, ignoreQueryPrefix: true })
    : {};
}

export const useQuery = (): ParsedQs => {
  const { search } = useLocation();
  return useMemo(() => parsedQueryString(search), [search]);
};
