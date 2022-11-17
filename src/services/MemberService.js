import axios from 'axios';
import { logoutMember,initialize,renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";

// 구글 로그인
export async function login(idToken){
    console.log('idToken',idToken);
    const response=await axios.get(`${process.env.REACT_APP_API_URL}/login/google/${idToken}`).then((response)=>{
        console.log(response.data.result);
        if(response.data.code===2002){
            localStorage.clear();
        }
        else{
            localStorage.setItem('accessToken',response.data.result.access_TOKEN);
            localStorage.setItem('memberId',response.data.result.memberId);
            localStorage.setItem('refreshToken',response.data.result.refresh_TOKEN);
            localStorage.setItem('email',response.data.result.email);
            localStorage.setItem('name',response.data.result.memberName);
        }
    }).catch(function(e){
        Sentry.captureException(e);
    });

    
}

// 로그아웃
export async function logout(){
    const memberId=localStorage.getItem('memberId');

    const response=axios.delete(`${process.env.REACT_APP_API_URL}/logout/${localStorage.getItem('memberId')}`).catch(function(e){
        Sentry.captureException(e);
    });
    console.log('logout response',response);
    
    return response;
}

// // clear localStorage
// export function initialize(){
//     localStorage.setItem('accessToken',null);
//     localStorage.setItem('refreshToken',null);
//     localStorage.setItem('memberId',0);
//     localStorage.setItem('email',null);
//     localStorage.setItem('name',null);
//     //alert('LOGOUT');

// }

// // reset accessToken by refreshToken
// export function renew_accessToken(accessToken){
//     localStorage.setItem('accessToken',accessToken);
// }
