type OsmResponse<T> = {
  osm: T;
};

export type OsmWay = OsmResponse<{
  way: {
    nd: {
      _attributes: {
        ref: number;
      };
    }[];
  };
}>;

export type OsmNode = OsmResponse<{
  node: {
    _attributes: {
      lat: number;
      lon: number;
    };
  };
}>;
