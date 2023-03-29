import {GetSmsRequestsApiResponse} from "../store/sms.gen.api";
import {SmsListItem} from "./sms-list-item";

interface DisplaySmsRequestTableProps {
    response: GetSmsRequestsApiResponse;
}

export default function DisplaySmsRequestTable({response}: DisplaySmsRequestTableProps) {
    return (
        <div className="flex flex-col-reverse">
            {response.content.map(({id, ...rest}, idx) => (
                <SmsListItem idx={idx} key={id.toString()} id={id} {...rest} />
            ))}
        </div>
    );
}