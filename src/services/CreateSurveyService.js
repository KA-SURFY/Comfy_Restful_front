import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";

const SURVEY_API_BASE_URL = `${process.env.REACT_APP_API_URL}`;
const SURVEY_SHARE_URL = `${process.env.REACT_APP_API_URL}`;

const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}

class SurveyService {

    async saveSurvey(loc,memberid, data){
        axios.defaults.headers.post = null
        const response=await axios.post(`${SURVEY_API_BASE_URL}${loc}/${memberid}`, data,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); //survey/1/1  //Survey/1
        console.log(response)
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }
    shareSurvey(surveyId){
        return `${SURVEY_SHARE_URL}/respondent/${surveyId ? surveyId : ""}`
    }
    async loadSurvey(loc,memberid){
        var value=loc
        if(loc==="/survey"){
            var value=value+"/"+memberid
        }
        else if(loc.substring(0,7)==="/manage"){
            var value=loc.substring(7,loc.length)+"/"+memberid
        }
        value="/load"+value
        const response = await axios.get(SURVEY_API_BASE_URL+`${value}`,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }
    async sendSurvey(loc,data){
        const response= await axios.post(SURVEY_API_BASE_URL+`${loc}`, data,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }
}

export default new SurveyService()