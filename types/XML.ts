export interface XML {
    alert: Alert;
}

export interface Alert {
    identifier: string;
    sender: string;
    sent: string;
    status: string;
    msgType: string;
    scope: string;
    info: Info;
    note?: string;
    code?: string;
    references?: string;
}

interface Info {
    language?: string;
    category: string | string[];
    event: string;
    urgency: string;
    severity: string;
    certainty: string;
    eventCode: parameter | parameter[];
    headline?: string;
    description?: string;
    instruction?: string;
    web?: string;
    contact: string;
    responseType: string;
    parameter?: parameter[] | parameter;
    area: Area | Area[];
}
export interface parameter {
    valueName: string;
    value: string;
}

export interface AreaBasic {
    areaDesc: string;
}

export interface AreaWithGeoCode extends AreaBasic {
    geocode: Geocode[] | Geocode;
    circle?: never;
}

interface AreaWithCircle extends AreaBasic {
    circle: string | string[];
    geocode?: never;
}

export interface Geocode {
    valueName: "WKT" | "SHN" | "ZIP_DE"
    value: number | string;
}

export type Area = AreaWithGeoCode | AreaWithCircle;