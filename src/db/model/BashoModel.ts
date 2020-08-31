import { HonBasho } from "../../constant/HonBasho";

export interface BashoModel {
    basho_name: HonBasho;
    basho_location: string;
    winner_id?: number;
    start_date: string;
    end_date?: string;
}
