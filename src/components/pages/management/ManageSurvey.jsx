import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ManageService from '../../../services/ManageService'
import FinishedItem from './item/FinishedItem'
import SurveyingItem from './item/SurveyingItem'
import { useSelector,useDispatch } from 'react-redux';
import member, { loginMember,logoutMember } from '../../../modules/member';
import { logout } from '../../../services/MemberService'
import { Navigate } from 'react-router-dom'

function ManageSurvey() {

  const [surveyingList, setsurveyingList] = useState([]);
  const [finishList, setFinishList] = useState([]);
  const Dispatch=useDispatch();

  //설문 중인 설문지 가져오기 
  useEffect(() => {
    ManageService.getSurveyByStatus('surveying').then((res) => {
      // if(res.data.code===2002) {
      //   logout();
      //   Dispatch(logoutMember());
      // }
      // else{
        setsurveyingList(res.data.result);
      //   Navigate('/');
      // }
      
      console.log("survey data : ", res.data.result);
    })
  }, [])

  
  //설문 완료된 설문지 가져오기 
  useEffect(() => {
    ManageService.getSurveyByStatus('finish').then((res) => {
      // if(res.data.code===2002) {
      //   logout();
      //   Dispatch(logoutMember());
      // }
      // else{
        setFinishList(res.data.result);
      //   Navigate('/');
      // }
      console.log("survey data : ", res.data.result);
    })
  }, [])

  // const changeStatus=(surveyId)=>{
  //   const changedItem=surveyingList.filter((it)=>it.surveyId===surveyId);
  //   const after
  // }
  
  return (

    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      {/* 설문중 */}
      <SurveyingItem/>
      {/* 설문완료  */}
      <FinishedItem />
    </div>

  )
}

export default ManageSurvey