import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';
const accessToken=localStorage.getItem('accessToken');
const memberId=localStorage.getItem('memberId');
const refreshToken=localStorage.getItem('refreshToken');
const config={
    withCredentials:true,
    ACCESS_TOKEN:localStorage.getItem('accessToken'),
    REFRESH_TOKEN:localStorage.getItem('refreshToken')
}
// 회원 설문지 조회
export async function getSurveys(){
    const memberId=localStorage.getItem('memberId');

    // if(localStorage.getItem('memberId')==='null') memberId=0;
    // else memberId=localStorage.getItem('memberId');
    
    const response= await axios.get(`http://localhost:8080/surveyPage/${memberId}`,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
    console.log('geteSurveys response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response.data.result;
}

// 설문지 삭제
export async function deleteSurvey(surveyId){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.delete(`http://localhost:8080/deleteSurvey/${surveyId}/${memberId}`,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}},{});
    console.log('deleteSurvey response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response.data.result;
}

// 설문 중인 설문지 설문 완료 상태로 변경
export async function updateSurveyStatus(surveyId){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.patch(`http://localhost:8080/survey/${surveyId}`,{},{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
    console.log('updateSurveyStatus response: ',response);

    return response.data.result;
}

// 마음에 드는 설문지 임시저장
export async function makeSurveyFromPost(surveyId){
    console.log('makeSurveyFromPost - surveyId',surveyId);
    
    const response=await axios.post(`http://localhost:8080/created-survey/${surveyId}/${localStorage.getItem('memberId')}`,{},{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
        
    
    // if(response.data.code===2002){
    //     return 100;
    // }
    // else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response;
}

// 본인이 만든 설문지 중 설문 완료된 설문지 조회
export async function getMyFinishedSurvey(){
    const response=await axios.get(`http://localhost:8080/selectSurvey/${localStorage.getItem('memberId')}`,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
    console.log('getMyFinishedSurvey',response);
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response.data.result;
    
}

// 설문지 info 조회
export async function getSurveyInfo(surveyId){
    const response=await axios.get(`http://localhost:8080/survey/${surveyId}`,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
    console.log('getSurveyInfo',response);
    // if(response.data.code===2002){
    //     return 100;
    // }
    // else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response.data.result;
}

// 설문지 썸네일 저장
export function postSurveyThumbnail(surveyId){
    const thumbNum = Math.floor(Math.random() * 5 + 1);
    const response=axios.patch(`http://localhost:8080/survey/thumbnail/${surveyId}/${thumbNum}`,{},{headers:config})
}

