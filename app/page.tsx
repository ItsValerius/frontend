import { notFound } from "next/dist/client/components/not-found";

import Warnmeldung from "../components/Warnmeldung";
import db from "../lib/db";
import { dbSignin } from "../lib/db";
import standorte from "../standorte";
import { Alert } from "../types/XML";

const getData = async (zipcode: string, latlong: string) => {
  if (zipcode && latlong && !Array.isArray(latlong)) {
    const standort = standorte.find((standort) => {
      return standort.ZIP.find((zip) => zip === zipcode);
    });
    await dbSignin();
    if (standort) {
      const alertsBySHN: {
        result: {
          Alert: Alert;
          id: string;
          geoJson: {};
          SHN: string[];
          ZIP_DE: string[];
          expired: boolean;
        }[];
      }[] = await db.query("SELECT * FROM alert WHERE $SHN INSIDE SHN", {
        SHN: standort.SHN,
      });

      const alertsByZIP: {
        result: {
          Alert: Alert;
          id: string;
          geoJson: {};
          SHN: string[];
          ZIP_DE: string[];
          expired: boolean;
        }[];
      }[] = await db.query(
        "SELECT * FROM alert WHERE $ZIP INSIDE alert.info.area.geocode.value",
        { ZIP: zipcode }
      );

      const alertsByGEO: {
        result: {
          Alert: Alert;
          id: string;
          geoJson: {};
          SHN: string[];
          ZIP_DE: string[];
          expired: boolean;
        }[];
      }[] = await db.query(
        `SELECT * FROM alert WHERE (${latlong}) INSIDE geoJson`,
      );

      return [...alertsByGEO, ...alertsBySHN, ...alertsByZIP].filter(
        (queries) => queries.result.length > 0
      );
    }
    return null;
  }
  return null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { zipcode: string; latlong: string };
}) {
  const data = await getData(searchParams.zipcode, searchParams.latlong);

  if (data && data.length > 0) {
    return <div>{data[0].result[0].id}</div>;
  }

  return notFound();
}
