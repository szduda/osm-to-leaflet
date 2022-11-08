import { xml2json } from "xml-js";
import { OsmNode, OsmWay } from "./types";

const apiUrl = "https://www.openstreetmap.org/api/0.6/";
const WAYS = [29945645];

const parseXml = (xml: string) =>
  JSON.parse(xml2json(xml, { compact: true, spaces: 2 }));

const fetchOsmJson = async <T>(url: string) => {
  let json: T | null = null;
  try {
    const response = await (await fetch(apiUrl + url)).text();
    json = parseXml(response);
  } catch (err) {
    console.log("fetch error:", err);
  }

  return json;
};

const fetchNodes = async (wayNr: number) => {
  const nodes = await fetchOsmJson<OsmWay>(`way/${wayNr}`);
  const refs = nodes?.osm.way.nd.flatMap((node) => node._attributes.ref);

  refs?.forEach(async (ref) => {
    const node = await fetchOsmJson<OsmNode>(`node/${ref}`);
    if (!node) return;

    const { lat, lon } = node?.osm.node._attributes;
    console.log(`${ref} => [${lat},${lon}]`);
  });
};

WAYS.forEach(fetchNodes);
