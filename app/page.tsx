import { notFound } from "next/dist/client/components/not-found";

import Warnmeldung from "../components/Warnmeldung";
import db from "../lib/db";
import { dbSignin } from "../lib/db";
import standorte from "../standorte";
import { dbAlert } from "../types/dbAlert";
import { Alert } from "../types/XML";

const getData = async (zipcode: string, latlong: string) => {
  if (zipcode && latlong && !Array.isArray(latlong)) {
    const standort = standorte.find((standort) => {
      return standort.ZIP.find((zip) => zip === zipcode);
    });
    await dbSignin();
    if (standort) {

      const alerts: {
        result: dbAlert[];
      }[] = await db.query(
        `SELECT * FROM alert WHERE ((${latlong}) INSIDE geoJson OR $SHN INSIDE SHN OR $ZIP INSIDE ZIP_DE) AND expired = false ORDER BY severity DESC;`, { SHN: standort.SHN, ZIP: zipcode }
      );

      console.log(...alerts);


      return alerts.filter(
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

  if (data && Array.isArray(data) && data.length > 0) {
    return <div>array: {data[0].result[0].id}</div>;
  }


  return notFound();
}
