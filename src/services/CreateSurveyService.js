import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SURVEY_API_BASE_URL = "http://172.16.1.245";
const SURVEY_SHARE_URL = "http://www.commfy.shop"

class SurveyService {

    saveSurvey(loc,memberid, data){
        return axios.post(`${SURVEY_API_BASE_URL}${loc}/${memberid}`, data); //editSurvey/1/a@gmail.com //createSurvey/a@gmail.com
    }
    shareSurvey(surveyId){
        return `${SURVEY_SHARE_URL}/respondent/${surveyId ? surveyId : ""}`
    }
    thumnail(imgsrc){
        return axios.post(SURVEY_API_BASE_URL+`/survey`,imgsrc);
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
        return axios.get(SURVEY_API_BASE_URL+`${value}`)
    }
    sendSurvey(loc,data){
        return axios.post(SURVEY_API_BASE_URL+`${loc}`, data)
    }
}

export default new SurveyService()