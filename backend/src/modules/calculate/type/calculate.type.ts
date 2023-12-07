export type TYPE_PUE = {
  provider: string;
  PUE: string;
  source: string;
};

export type TYPE_PSF = {
  data: number;
};

export type TYPE_SPEC = {
  model: string;
  TDP: string;
  n_cores: string;
  TDP_per_core: string;
  source: string;
};

export type TYPE_CI = {
  location: string;
  continentName: string;
  countryName: string;
  regionName: string;
  carbonIntensity: string;
  Type: string;
  source: string;
  comments: string;
};

export type TYPE_REF = {
  variable: string;
  value: string;
  source: string;
};
