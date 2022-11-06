import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SURVEY_API_BASE_URL = "http://localhost:8080";
const SURVEY_SHARE_URL = "http://localhost:3000"

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
        console.log(SURVEY_API_BASE_URL+`${value}`)
        return axios.get(SURVEY_API_BASE_URL+`${value}`)
    }
    sendSurvey(loc,data){
        return axios.post(SURVEY_API_BASE_URL+`${loc}`, data)
    }
}

export default new SurveyService()