export const API_URL = 'https://api.crossref.org/works';
export const FILE_NAME = 'crossref-reference.csv';
export const ABSTRACT_FILE_NAME = 'crossref-abstract.csv';
export const COLOR = '#ffffff';
export const HEADERS = [
  {
    label: 'Title',
    key: 'title',
  },
  {
    label: 'Publisher',
    key: 'publisher',
  },
  {
    label: 'Abstract',
    key: 'abstract',
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Other URL',
    key: 'conditionalUrl',
  },
  {
    label: 'Subject',
    key: 'subject',
  },
  {
    label: 'URL',
    key: 'url',
  },
];

export const ABSTRACT_HEADERS = [
  {
    label: 'Index',
    key: 'index',
  },
  {
    label: 'DOI',
    key: 'value',
  },
  {
    label: 'Abstract',
    key: 'response',
  },
  {
    label: 'Has error?',
    key: 'failed',
  },
];
