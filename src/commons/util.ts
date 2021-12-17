
import { Analytics, getAnalytics, logEvent, setUserId, setCurrentScreen } from "firebase/analytics";
import UaParser, { IResult } from 'ua-parser-js'
import router from '@/router'

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const setTitle = (title?: string) => {
    const { VITE_APP_TITLE } = import.meta.env;
    const processTitle = VITE_APP_TITLE || 'vue3-demo';
    window.document.title = `${title ? `${title} | ` : ''} ${processTitle}`;
}

export const firebaseLogEvent = (eventName: string, eventParams?: {
    [key: string]: any;
}) => {
    try {


        // console.log(new UaParser().getResult())
        const r: IResult = new UaParser().getResult();
        const analytics: Analytics = getAnalytics()
        // console.log('===================');
        // console.log(router.currentRoute.value.meta.pageName)
        logEvent(analytics, eventName, {
            os: r.os.name,
            'page_name': router.currentRoute.value.meta.pageName as string,
            ...eventParams,
        })
    } catch (error) {
        console.log(error);
    }

}

export const firebaseSetUserId = (id: string) => {
    try {
        const analytics: Analytics = getAnalytics()
        setUserId(analytics, id)
    } catch (error) {
        console.log(error);
    }

}

export const firebaseSetCurrentScreen = (screenName: string) => {
    try {
        const analytics: Analytics = getAnalytics()
        setCurrentScreen(analytics, screenName)
        const r: IResult = new UaParser().getResult()
        logEvent(analytics, 'page_view', {
            os: r.os.name,
            'page_name': screenName
        })
    } catch (error) {
        console.log(error);
    }

}

