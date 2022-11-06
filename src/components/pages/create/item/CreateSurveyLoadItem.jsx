import { useDispatch, useSelector } from "react-redux"
import { ItemList, Ques_tem_list } from "./CreateSurveyList"
import style from "./CreateSurvey.module.css"
import React from "react";

function Loadquesitem(id){
    const ques=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["ques"])
    return ques
}

function Loadansitem(rootid,id){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return ans
}

function Loadchoitem(rootid,id){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return cho
}

function LoadcheckedType0(id, rootid){
    var answer=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid)[0])
    return answer
}

function LoadcheckedType1(id, rootid,selid){
    var answer=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid).filter(t=>t.selectid===selid)[0])
    return answer
}

function Loadcheckedvalue(id,rootid,selid){
    const cho_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_type"])
    if(cho_type===0){
        var answer=LoadcheckedType0(id,rootid)
    }
    else{
        var answer=LoadcheckedType1(id,rootid,selid)
    }
    try{
        return answer.selectid
    }
    catch(e){
        return -1
    }
    
}
export function LoadItem(props){
    const rootid=props.rootid
    const id=props.id
    const dispatch=useDispatch()
    const state=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"])
    const ques_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"]["name"])

    var que=false
    var cho=false
    var ans=true
    if(ques_type==="객관식 Grid"){
        cho=true
    }
    switch(props.type){
        case "ques":
            var value=Loadquesitem(id)
            var typename="Q."
            que=true
            break
        case "ans":
            var value=Loadansitem(rootid,id)
            var typename="A."
            var checked_id=props.id
            if(cho){
                ans=false
            }
            else{
                var answer=Loadcheckedvalue(rootid,rootid,id)
            }
            break;
        case "cho":
            var value=Loadchoitem(rootid,id)
            var answer=Loadcheckedvalue(rootid,props.ansid,id)
            var typename=""
            var checked_id=props.id
            break
    }
    var ans_style=style.column_container_ani
    if(props.mode!==0){
        if(que || answer!==checked_id){
            ans_style=style.column_container_bor
        }
        else{
            ans_style=style.column_container_cho
        }
    }
    return (
        <div className={ans_style}
            onClick={()=>{
                if(props.mode===2 && !que && ans){
                    dispatch({
                        type:"choice_checked",
                        id:id,
                        rootid:rootid,
                        ansid:props.ansid,
                        value:checked_id
                    })
                }
            }}>
                <div className={style.row_container}>
                    <p className={style.text_name}>{typename}&nbsp;</p>
                    <p className={style.text}
                        key={id}
                    >{value}</p>
                </div>
                {que && <Ques_tem_list temid={state.id || 0} rootid={rootid} id={props.id} mode={props.mode}/>}
            {
                !ans && <ItemList
                    rootid={rootid}
                    mode={props.mode}
                    type={"cho"}
                    ansid={id}
                />
            }
        </div>
    );
}