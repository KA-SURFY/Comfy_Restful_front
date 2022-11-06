import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./item/CreateSurvey.module.css"
import { CreateIntroSurvey, Satisfaction } from "./item/CreateSurveyEdit";
import { ItemList } from "./item/CreateSurveyList";
import CreateSurveyService from "../../../services/CreateSurveyService";
import { CreateSurveyButton } from "./item/CreateSurveyInput";
import { useState } from "react";

export default function RespondentSurvey(props){
    const dispatch=useDispatch();
    const state=useSelector(state => state.createsurvey);
    const loc=useLocation().pathname;
    const navigate=useNavigate()
    if(!state.serverload){
        CreateSurveyService.loadSurvey(loc,"").then(response=>{ //answerSurvey/surveyid/submitid
            console.log(response)
            if(response.data.result.status==="finish"){
                if(props.mode===3){
                    dispatch({
                        type:"loadfromserver",
                        value:response.data.result
                    })
                }
                else{
                    navigate('/respondentclose')
                }
            }
            else if(response.data.result.status==="surveying"){
                const start=response.data.result.start.substr(0,10)
                const startdate=new Date(start);
                const today=new Date();
                if(startdate.getTime>today){
                    navigate('/respondentnotopen')
                }
                else{
                    dispatch({
                        type:"loadfromserver",
                        value:response.data.result
                    })
                }
            }
        });
    }

    const queslist=useSelector(state => state.createsurvey.ques_list);

    const [disabled,setDisabled]=useState(false)
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className={style.column_body}>
                <CreateIntroSurvey pre={0}/>
                <ItemList
                    state={queslist}
                    mode={props.mode}
                    type={"ques"}
                />
                <Satisfaction mode={props.mode}/>
                {
                    props.mode!==3 && <div className={style.row_container}>
                        <CreateSurveyButton
                            className={style.button}
                            title={"완료"}
                            onClick={()=>{
                                setDisabled(true)
                                CreateSurveyService.sendSurvey(loc,state).then(response=>{
                                    if(response.data.isSuccess || response.data.isSuccess===undefined){
                                        navigate('/respondentcomplete')
                                    }
                                    else{
                                        console.log(response)
                                        setDisabled(false)
                                    }
                                }
                                )//respondentSurvey/1
                            }}
                            disabled={disabled}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export function RespondentComplete(){
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className={style.column_body}>
                <div className={style.text_name}>설문을 마쳐주셔서 감사합니다!</div>
            </div>
        </div>
    );
}

export function RespondentClose(){
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className={style.column_body}>
                <div className={style.text_name}>이미 종료된 설문입니다!</div>
            </div>
        </div>
    );
}

export function RespondentNotOpen(){
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className={style.column_body}>
                <div className={style.text_name}>아직 시작하지 않은 설문입니다!</div>
            </div>
        </div>
    );
}