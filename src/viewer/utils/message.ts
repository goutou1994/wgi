import { notification } from 'antd';

export function logSuccess(message: string) {
    notification.success({
        message,
        duration: 1
    });
}

export function logWarning(message: string) {
    notification.warning({
        message,
        duration: 2
    });
}

export function logError(message: string) {
    notification.error({
        message,
        duration: 3
    });
}