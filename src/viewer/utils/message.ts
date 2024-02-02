import { notification } from 'antd';

export function logSuccess(message: string) {
    notification.success({
        message,
        duration: 1000
    });
}

export function logWarning(message: string) {
    notification.warning({
        message,
        duration: 2000
    });
}

export function logError(message: string) {
    notification.error({
        message,
        duration: 3000
    });
}