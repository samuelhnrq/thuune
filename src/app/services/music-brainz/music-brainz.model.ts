export interface MBQueryResult {
  created: string;
  count: number;
  offset: number;
  artists: MBArtist[];
}

export interface MBArtist {
  id: string;
  type: string;
  score: string;
  name: string;
  'sort-name': string;
  country: string;
  area: MBArea;
  'begin-area'?: MBArea;
  disambiguation?: string;
  'life-span': MBDuraton;
  aliases?: MBAlias[];
  tags?: MBTag[];
}

export interface MBArea {
  id: string;
  name: string;
  'sort-name': string;
}

export interface MBDuraton {
  begin?: string;
  end?: string;
  ended?: boolean;
}

export interface MBAlias {
  'sort-name': string;
  name: string;
  locale?: MBArea;
  type: unknown;
  primary: unknown;
  'begin-date'?: string;
  'end-date'?: string;
}

export interface MBTag {
  count: number;
  name: string;
}
