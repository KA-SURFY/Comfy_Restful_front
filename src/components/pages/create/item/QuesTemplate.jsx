import { useDispatch,useSelector } from "react-redux";
import { ItemList } from "./CreateSurveyList";
import { CreateSurveySlider, CreateSurveyToggle, SurveyTextInput } from "./CreateSurveyInput";
import { useState } from "react";
import { Add_item } from "./CreateSurveyAddDelItem";
import style from "./CreateSurvey.module.css"
import React from "react";

export function Multi(props){
    const data=props.data
    const dispatch=useDispatch()
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===data.rootid))
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===data.rootid))
    const cho_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===data.id)[0]["type"]["choice_type"])
    return (
        <div className={style.column_container}>
            {
                data.mode===1 && <div className={style.row_container}>
                    <p className={cho_type ? `text-gray-200` : `text-purple-600`}>단일 선택&nbsp;</p>
                    <CreateSurveyToggle
                        checked={cho_type}
                        onChange={()=>{
                            dispatch({
                                type:"set_choice_type",
                                id:data.id,
                            })
                        }}
                    />
                    <p className={!cho_type ? `text-gray-200` : `text-blue-600`}>&nbsp;복수 선택</p>
                </div>
            }
            <div className={style.column_container}>
                {data.mode===1 &&<p className={style.text}>문항 목록</p>}
                <ItemList
                    rootid={data.rootid}
                    mode={data.mode}
                    type={"ans"}
                />
                {
                    data.mode===1 &&
                    <Add_item 
                        name={"문항"} 
                        type={"add_ans"} 
                        state={ans}
                        data={data}
                    />
                }
            </div>
            {
                props.type==="grid" && data.mode===1 && <div className={style.column_container}>
                    <p className={style.text}>선택지 목록</p>
                    <ItemList
                        rootid={data.rootid}
                        mode={data.mode}
                        type={"cho"}
                    />
                    <Add_item 
                        name={"선택지"} 
                        type={"add_choice"} 
                        state={cho}
                        data={data}
                    />
                </div>
            }
        </div>
    );
}

function Getans(id){
    const ans=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["answer"])

    return ans
}
function Getsatis(){
    const ans=useSelector(state => state.createsurvey.satis)

    return ans
}
function Ans_mode(){
    var [ans, setAns]=useState("")
    return [ans, setAns]
}

export function Writing(props){
    const data=props.data
    const dispatch=useDispatch()

    var [ans, setAns]=Ans_mode()

    if(data.mode===2){
        var ans=Getans(data.id)
    }
    else if(data.mode===3){
        var ans=Getans(data.id)
    }
    return (
        data.mode!==1 && 
        <div className={style.row_container_ani}>
            <p className={style.text_name}>답변 :&nbsp;</p>
            {
                data.mode===3 && <p className={style.text}
                    key={data.id}
                >{ans}</p>
            }
            {
                data.mode!==3 && <SurveyTextInput
                    value={ans}
                    onChange={(event) => {
                        if(data.mode===2){
                            setAns(event.target.value);
                            dispatch({
                                type:"edit_writing",
                                rootid:data.id,
                                value:event.target.value
                            })
                        }
                    }}
                    className={`ans${data.id}`}
                />
            }
        </div>
    );
}

export function SurveySlider(props){
    const data=props.data
    var type=props.type
    
    var [ans, setAns]=Ans_mode()
    if(type==="edit_satis"){
        var ans=Getsatis()
    }
    else{
        type="edit_writing"
        var ans=Getans(data.id)
    }
    var slider_style=style.slider_text

    return <div className={style.row_container}>
        {
            props.type==="edit_satis" && 
            <p className={style.text_name}>만족도 입력 :&nbsp;</p>
        }
        {   
            data.mode!==1 && <CreateSurveySlider
                ans={ans}
                setAns={setAns}
                mode={data.mode}
                type={type}
                id={data.id}
                max={props.type==="edit_satis"?null:5}
            />
        }
        {
            data.mode!==1 && <p className={slider_style}
                key={data.id}
            >{ans || 0}</p>
        }
        </div>
}