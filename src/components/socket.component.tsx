import { socket } from '../service/socket';
import { useEffect } from 'react';
import { setSocketConnection } from '../service/socket.slice';
import { mk } from '../common/keys';
import { smsApi } from '../store/sms.gen.api';
import { useAppDispatch } from '../service/store';
import * as _ from 'lodash';

export function SocketComponent() {
    const dispatch = useAppDispatch();
    const size = 4;

    useEffect(() => {
        const onConnect = () => {
            dispatch(setSocketConnection(true));
        };

        const onDisconnect = () => {
            dispatch(setSocketConnection(true));
        };

        const onNewSms = (obj: any) => {
            const updateQueryDataThunk = smsApi.util.updateQueryData('getSmsRequests', {
                page: 0, size
            }, (data) => {
                if (!_.includes(data.content, obj)) {
                    data.content.unshift(obj);
                    if (data.content.length >= size) {
                        data.content.splice(size);
                        data.meta.total += data.meta.total;
                    }
                }
            });
            dispatch(updateQueryDataThunk);
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        socket.on(mk`new_sms_request`, onNewSms);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);

            socket.off(mk`new_sms_request`, onNewSms);
        };
    }, [dispatch]);

    return null;
}