import { useEffect, useState } from "react"
import Warnmeldung from "../components/Warnmeldung"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import db from "../lib/db"
import { dbSignin } from "../lib/db"
import standorte from "../standorte"


export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.zipcode && context.query.latlong && !Array.isArray(context.query.latlong)) {
    const zipcode = context.query.zipcode
    const [lat, long] = context.query.latlong.split(",")

    const standort = standorte.find((standort) => { return standort.ZIP.find((zip) => zip === zipcode) })
    await dbSignin();

    const alertsBySHN = await db.query("SELECT * FROM alert WHERE $SHN INSIDE alert.info.area.geocode.value", { SHN: standort?.SHN })
    const alertsByZIP = await db.query("SELECT * FROM alert WHERE $ZIP INSIDE alert.info.area.geocode.value", { ZIP: zipcode })
    const alertsByGEO = await db.query(`SELECT geoJson FROM alert Where (${context.query.latlong}) INSIDE geoJson`)


    return {
      props: { zipcode }, // will be passed to the page component as props
    }
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [isWindow, setIsWindow] = useState(false)
  const [data, setData] = useState(props)


  useEffect(() => {
    setIsWindow(true)

    return () => {

    }
  }, [])

  if (isWindow && window.innerWidth < 2160)
    return (

      <Warnmeldung msgType="Alert" src="/icon.svg"
        headline="test headline"
        areaDesc="test area"
        senderName="test sender"
        event="test event"
        instructions="test instructions"
        date="01.10.2022"
        time="10:30"
        icon="/DE-NW-AC-S090.jpg"

      />
    )
  return (
    <div className="grid grid-cols-2 w-full h-full">

      <Warnmeldung msgType="Alert" src="/icon.svg"
        headline="test headline"
        areaDesc="test area"
        senderName="test sender"
        event="test event"
        instructions="test instructions"
        date="01.10.2022"
        time="10:30"
        icon="/DE-NW-AC-S090.jpg"

      />
      <Warnmeldung msgType="Alert" src="/icon.svg"
        headline="test headline"
        areaDesc="test area"
        senderName="test sender"
        event="test event"
        instructions="test instructions"
        date="01.10.2022"
        time="10:30"
        icon="/DE-NW-AC-S090.jpg"

      />
    </div>
  )
}
