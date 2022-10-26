import React from "react";
import Image from "next/image";
interface Props {
    msgType: string;
    src: string;
    headline: string;
    areaDesc: string;
    senderName: string;
    event: string;
    instructions: string;
    date: string;
    time: string;
    icon: string;
}
const Warnmeldung: React.FC<Props> = ({
    msgType,
    src,
    headline,
    areaDesc,
    senderName,
    event,
    instructions,
    date,
    time,
    icon,
}) => {
    interface ort {
        ort: string;
    }
    const Scroller = ({ ort }: ort) => {
        const length = ort.split(",").length;
        if (length > 1 && length < 5) {
            return (
                <div className="max-w-full overflow-hidden text-[3vh] font-bold">
                    <div className="whitespace-nowrap overflow-hidden inline-block animate-marquee-faster ">
                        <p className="inline-block">{ort},&nbsp;</p>
                        <p className="inline-block">{ort}</p>
                    </div>
                </div>
            );
        }
        if (length > 5 && length < 10) {
            return (
                <div className="max-w-full overflow-hidden text-[3vh] font-bold">
                    <div className="whitespace-nowrap overflow-hidden inline-block animate-marquee">
                        <p className="inline-block">{ort},&nbsp;</p>
                        <p className="inline-block">{ort}</p>
                    </div>
                </div>
            );
        }
        if (ort.split(",").length > 10) {
            return (
                <div className="max-w-full overflow-hidden text-[3vh] font-bold">
                    <div className="whitespace-nowrap overflow-hidden inline-block animate-marquee-slower">
                        <p className="inline-block">{ort},&nbsp;</p>
                        <p className="inline-block">{ort}</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="max-w-full overflow-hidden text-[3vh] text-center font-bold">
                <div className="whitespace-nowrap overflow-hidden inline-block ">
                    <p className="inline-block ">{ort}</p>
                </div>
            </div>
        );
    };
    return (
        <div className="flex flex-col h-full ">
            {msgType === "Cancel" && (
                <div className="fixed xl:-mt-14 w-[calc(100vh*1.5)] z-10 -rotate-[60deg] xl:-rotate-[66deg] text-center bg-black -translate-x-1/3 top-1/2">
                    <p className="xl:text-9xl text-3xl xl:py-16 py-6 m-0 text-white">
                        Entwarnung - Entwarnung - Entwarnung - Entwarnung
                    </p>
                </div>
            )}
            <div className="flex justify-between mt-2 xl:mt-10 border-b-2 xl:border-b-8 border-gray-400 mx-4 xl:mx-10 pb-2 xl:pb-12">
                <div className="text-[2vh] mr-2 font-bold leading-tight">{event} </div>
                {icon ? (
                    <div className="relative w-20 h-10 lg:w-60 lg:h-[7.5rem] xl:w-[22.5rem] xl:h-[11.25rem] ">
                        <Image
                            src={icon}
                            alt={senderName}
                            fill={true}
                            sizes="(min-width: 1280px) 360px, (min-width: 1024px) 240px"
                        />
                    </div>
                ) : (
                    <div className="text-[2vh] text-right leading-tight">
                        {senderName}{" "}
                    </div>
                )}
            </div>
            <main className="mx-2 xl:mx-4 h-full mt-6 xl:mt-16">
                <div className="w-3/4 mx-auto h-1/2">

                    <Image src={src} alt="" priority={true} width={9999} height={9999}
                    />
                </div>
                <div className="mt-6 xl:mt-12">
                    <h1 className="text-[5vh] text-center break-words leading-none text-red-600 font-bold line-clamp-4 mb-2 pb-1 xl:mb-4 xl:pb-6">
                        {headline}
                    </h1>
                    <div>{areaDesc && <Scroller ort={areaDesc} />}</div>

                    <h2 className="text-[3vh] text-center line-clamp-6 font-semibold leading-tight xl:leading-normal px-1">
                        {instructions}
                    </h2>
                </div>
            </main>
            <footer className="flex w-full mt-auto justify-between px-2">
                <h2 className="text-[2.5vh]">{date} </h2>
                <h2 className="text-[2.5vh]">{time} </h2>
            </footer>
        </div>
    );
};

export default Warnmeldung;