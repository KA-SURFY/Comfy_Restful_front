import React from "react";
import { SurveyTextInput } from "./CreateSurveyInput";
import { useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectBox, Ques_data_list, Ques_tem_list } from "./CreateSurveyList";
import { Del_item } from "./CreateSurveyAddDelItem";
import style from "./CreateSurvey.module.css"
import { SurveySlider } from "./QuesTemplate";

export function CreateIntroSurvey(props){
    const [_, setIntro] = useState("");
    const [__, setName] = useState("");
    const preview = props
    
    const dispatch=useDispatch()
    const intro=useSelector(state => state.createsurvey)
    if(preview.pre!==0){
        return (
            <div className={style.column_container_bor}>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 제목 :&nbsp;</p>
                    <SurveyTextInput
                        value={intro.intro0}
                        onChange={(event) => {
                            setName(event.target.value);
                            dispatch({
                                type:"intro0",
                                value:event.target.value
                            })
                        }}
                        className="intro0"
                    />
                </div>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 설명 :&nbsp;</p>
                    <SurveyTextInput
                        value={intro.intro1}
                        onChange={(event) => {
                            setIntro(event.target.value);
                            dispatch({
                                type:"intro1",
                                value:event.target.value
                            })
                        }}
                        className="intro1"
                    />
                </div>
            </div>
        );
    }
    else{
        return (
            <div className={style.column_container_bor}>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 제목 :&nbsp;</p>
                    <p className={style.text}>{intro.intro0}</p>
                </div>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 설명 :&nbsp;</p>
                    <p className={style.text}>{intro.intro1}</p>
                </div>
            </div>
        );
    }
}

function Loadquesedit(id){
    const que=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["ques"])

    return que
}

function Loadansedit(rootid, id){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return ans
}

function Loadchoedit(rootid, id){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return cho
}
export function SurveyEdit(props){
    const drag_prov=props.drag_prov
    const rootid = props.rootid
    const id = props.id
    const [_, setValue]=useState("")
    
    const dispatch=useDispatch()
    const temid=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"]["id"])

    var que=false
    switch(props.type){
        case "ques":
            var val=Loadquesedit(id)
            var del="del_ques"
            var edit="edit_ques"
            var name="Q."
            var class_name=`que${rootid}`
            que=true
            break
        case "ans":
            var val=Loadansedit(rootid,id)
            var del="del_ans"
            var edit="edit_ans"
            var name="A."
            var class_name=`que${rootid}ans${id}`
            break
        case "cho":
            var val=Loadchoedit(rootid,id)
            var del="del_choice"
            var edit="edit_cho"
            var name="C."
            var class_name=`que${rootid}cho${id}`
            break
    }
    return (
        <div className={style.column_container_ani} 
            ref={drag_prov.innerRef}
            {...drag_prov.draggableProps}
        >
            {
                que &&
                <div className={style.row_container} >
                    <SelectBox 
                        id={rootid}
                        onChange={(event)=>{
                            dispatch({
                                type:"change_ques_type",
                                rootid:rootid,
                                temid:parseInt(event.target.value)
                            })
                        }}
                    />
                    <Del_item
                        onClick={()=>{
                            dispatch({
                                type:del,
                                id:id,
                            })
                        }}
                    />
                    <p className={style.text_name}
                        {...drag_prov.dragHandleProps}>
                        ≡
                    </p>
                </div>
            }
            <div className={style.row_container}>
                <p className={style.text_name}>{name}</p>
                <SurveyTextInput
                    value={val}
                    onChange={(event) => {
                        setValue(event.target.value);
                        dispatch({
                            type:edit,
                            rootid:rootid,
                            id:id,
                            value:event.target.value
                        })
                    }}
                    className={class_name}
                />
                {
                    !que && <Del_item
                        onClick={()=>{
                            dispatch({
                                type:del,
                                id:id,
                            })
                        }}
                    />
                }
                {
                    !que && <p className={style.text_name}
                        {...drag_prov.dragHandleProps}>
                        ≡
                    </p>
                }
            </div>
            {que && <Ques_tem_list temid={temid || 0} rootid={rootid} id={id} mode={1}/>} 
        </div>
    );
}

export function Satisfaction(props){
    const data=props

    return(
        <div className={style.column_container_bor}>
            <SurveySlider
                data={data}
                type={"edit_satis"}
            />
        </div>
        
    );
}