export interface EmailRequestBody {
    to: string;
    subject: string;
    first_name: string;
    last_name: string;
    event_link: string;
}

export interface EmailResponseBody {
    from: string;
    subject: string;
    text: string;
}