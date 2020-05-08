export type LocationData = {
  lat: number;
  lng: number;
}

export type DailyReplayData = {
  day: number;
  hospitalizeNum: number;
  isolateNum: number;
  quarantineNum: number;
  confineNum: number;
  free: number;
  CurrentHealthy: number;
  CurrentInfected: number;
  CurrentEffective: number;
  CurrentSusceptible: number;
  CurrentIncubation: number;
  CurrentDiscovered: number;
  CurrentCritical: number;
  CurrentRecovered: number;
  AccDiscovered: number;
  AccCritical: number;
  AccAcquaintance: number;
  AccStranger: number;
  measurement: number;
}

export type RegionReplayData = LocationData & {
  day: number;
  poi_id: number;
  lat: number;
  lng: number;
  free: number;
  CurrentSusceptible: number;
  CurrentIncubation: number;
  CurrentDiscovered: number;
  CurrentCritical: number;
  CurrentRecovered: number;
  CurrentInfected: number;
}

export type SimulationData = {
  dailyReplay: DailyReplayData[];
  regionReplay: RegionReplayData[];
}

export type SimulationParams = {
  [key: string]: any;
}

export type RegionMetadata = LocationData & {
  lng: number;
  lat: number;
  residentialPois: number;
  workingPois: number;
  commercialPois: number;
}

export type VizualizationData = {
  filename: string;
  params: SimulationParams;
  regions: RegionMetadata[];
  replay?: SimulationData;
}
