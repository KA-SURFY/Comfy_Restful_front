import axios from 'axios';
import { renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";

const SURVEY_API_BASE_URL = `${process.env.REACT_APP_API_URL}/result`;
const config={
    withCredentials:true,
    ACCESS_TOKEN:localStorage.getItem('accessToken'),
    REFRESH_TOKEN:localStorage.getItem('refreshToken')
}

class SurveyService {

    getSurvey(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        });

       
        
    }

    getSurveyIndividual(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        });
        
    }

    getSurveyQuestion(surveyId){
        return axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        });
        
    }

    getQuestionOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        });
        
    }
    getGridOption(surveyId, questionId){
       return axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
        Sentry.captureException(e);
    });
        
    }

}

export default new SurveyService()