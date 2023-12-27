import {HandlerResponse} from "@netlify/functions/dist/function/handler_response";
import {HandlerEvent} from "@netlify/functions/dist/function/handler_event";
import {HTTP_STATUS_OK} from "@netlify/functions/dist/lib/consts";

const handler: HandlerResponse = async (event: HandlerEvent) => {
    let response: HandlerResponse = {
        body: event.body,
        statusCode: HTTP_STATUS_OK
    };

    return response;
}