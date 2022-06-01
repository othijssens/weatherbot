import { Weather } from "./get-weather";
import checkItsNiceOut from "./nice-out";
import getAlerts from "./alerts";
import { IncomingWebhookSendArguments } from "@slack/webhook";

export default function getMessage({ currently, alerts }: Weather) {
  const listAlerts = getAlerts(alerts);
  const niceOut = checkItsNiceOut(currently);
  return [
    ...listAlerts,
    ...niceOut,
  ];
}


export type Message = [] | IncomingWebhookSendArguments["blocks"];
