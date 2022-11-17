import axios from 'axios';
import { useLocation } from 'react-router-dom';
import * as Sentry from "@sentry/react";

const SURVEY_API_BASE_URL = `${process.env.REACT_APP_API_URL}`;
const SURVEY_SHARE_URL = "http://localhost:3000"

class SurveyService {

    saveSurvey(loc,memberid, data){
        return axios.post(`${SURVEY_API_BASE_URL}${loc}/${memberid}`, data).catch(function(e){
            Sentry.captureException(e);
        }); //editSurvey/1/a@gmail.com //createSurvey/a@gmail.com
    }
    shareSurvey(surveyId){
        return `${SURVEY_SHARE_URL}/respondent/${surveyId ? surveyId : ""}`
    }
    thumnail(imgsrc){
        return axios.post(SURVEY_API_BASE_URL+`/survey`,imgsrc).catch(function(e){
            Sentry.captureException(e);
        });
    }
    loadSurvey(loc,memberid){
        var value=loc
        if(loc==="/survey"){
            var value=value+"/"+memberid
        }
        else if(loc.substring(0,7)==="/manage"){
            var value=loc.substring(7,loc.length)+"/"+memberid
        }
        console.log(SURVEY_API_BASE_URL+`${value}`)
        return axios.get(SURVEY_API_BASE_URL+`${value}`).catch(function(e){
            Sentry.captureException(e);
        });
    }
    sendSurvey(loc,data){
        return axios.post(SURVEY_API_BASE_URL+`${loc}`, data).catch(function(e){
            Sentry.captureException(e);
        });
    }
}

export default new SurveyService()