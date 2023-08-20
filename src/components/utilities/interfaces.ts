import { GridColDef } from "@mui/x-data-grid";

export interface customCardInterface {
    title: string;
    child: React.ReactNode;
}

export interface customModalInterface {
    title: string;
    child: React.ReactNode;
    state: boolean;
    onClose: Function;
}

export interface spinnerInterface {
    state: boolean;
}

export interface tableInterface {
    rows: any[],
    columns: GridColDef[];
    rowsPerPage: number;
    pageSize: number;
}

export interface customConfirmationModalInterface {
    state: boolean;
    title: string;
    confimationfunction: Function;
    cancelationfunction: Function;
}