
import { Analytics, getAnalytics, logEvent, setUserId, setCurrentScreen } from "firebase/analytics";
import UaParser, { IResult } from 'ua-parser-js'
import router from '@/router'

export const firebaseLogEvent = (eventName: string, eventParams?: {
    [key: string]: any;
}) => {
    try {
        const r: IResult = new UaParser().getResult();
        const analytics: Analytics = getAnalytics()
        logEvent(analytics, eventName, {
            os: r.os.name,
            'page_name': router.currentRoute.value.name as string,
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

