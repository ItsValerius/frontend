import { notFound } from "next/dist/client/components/not-found";

import Warnmeldung from "../components/Warnmeldung";
import db from "../lib/db";
import { dbSignin } from "../lib/db";
import standorte from "../standorte";
import { XML } from "../styles/XML";

const getData = async (zipcode: string, latlon: string) => {
  if (zipcode && latlon && !Array.isArray(latlon)) {
    const standort = standorte.find((standort) => {
      return standort.ZIP.find((zip) => zip === zipcode);
    });
    await dbSignin();

    const alertsBySHN: { result: { xml: XML; id: string; geoJson: {} }[] }[] =
      await db.query(
        "SELECT * FROM alert WHERE $SHN INSIDE alert.info.area.geocode.value",
        { SHN: standort?.SHN }
      );

    const alertsByZIP: { result: { xml: XML; id: string; geoJson: {} }[] }[] =
      await db.query(
        "SELECT * FROM alert WHERE $ZIP INSIDE alert.info.area.geocode.value",
        { ZIP: zipcode }
      );

    const alertsByGEO: { result: { xml: XML; id: string; geoJson: {} }[] }[] =
      await db.query(`SELECT * FROM alert Where (${latlon}) INSIDE geoJson`);
    return [...alertsByGEO, ...alertsBySHN, ...alertsByZIP].filter((d) => d.result.length > 0);
  }
  return null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { zipcode: string; latlon: string };
}) {
  const data = await getData(searchParams.zipcode, searchParams.latlon);
  console.log(data);

  if (data && data.length > 0) {

      return <div>{data[0].result[0].id}</div>;
    }
  
  return notFound();
}
