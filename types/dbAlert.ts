import { Alert } from "./XML";
export type dbAlert = {
    alert: Alert;
    geoJson: {} | ({} | null)[] | null;
    SHN: (string | number) | (string | number | null)[] | null;
    ZIP_DE: (string | number) | (string | number | null)[] | null;
    expired: boolean;
    id: string;
    severity: number
}