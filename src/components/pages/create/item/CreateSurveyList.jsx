import React from "react";
import { Satisfaction, SurveyEdit } from "./CreateSurveyEdit";
import { Multi, SurveySlider, Writing } from "./QuesTemplate";
import { useDispatch, useSelector } from "react-redux";
import { LoadItem } from "./CreateSurveyLoadItem";
import style from "./CreateSurvey.module.css"
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { CreateSurveySelectBox } from "./CreateSurveyInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export function Ques_data_list(){
    return [
        {
            "id":0,
            "name":"질문 유형 선택",
        },
        {
            "id":1,
            "name":"객관식",
            "choice_type":false,
            "choice_value":[]
        },
        {
            "id":2,
            "name":"객관식 Grid",
            "choice_type":false,
            "choice_value":[]
        },
        {
            "id":3,
            "name":"주관식",
            "answer":"",
        },
        {
            "id":4,
            "name":"슬라이더",
            "answer":"",
        },
    ]
}

export function Ans_data_list(props){
    return [
        {   //기본
            "temid":0,
            "rootid":props.rootid, //root는 질문
            "id":props.id,
            "value":"",
        },
        {   //객관식 중복 선택
            "temid":1,
            "rootid":props.rootid,
            "selectid":props.selectid,
            "id":props.id
        },
        {   //파일 업로드
            "temid":2,
            "rootid":props.rootid,
            "id":props.id,
            "name":"",
            "path":""
        }
    ]
}

export function Ques_tem_list(props){
    const tem = props;
    switch(tem.temid){
        case 1:
            return (
                <Multi data={tem} type={"not_grid"}/> 
            ); 
        case 2:
            return (
                <Multi data={tem} type={"grid"}/> 
            ); 
        case 3:
            return (
                <Writing data={tem}/> 
            ); 
        case 4:
            return (
                <SurveySlider data={tem}/> 
            ); 
        case 5:
            return (
                <Multi data={tem}/> 
            ); 
    }
    return <div></div>
}

function Loadquesitem(){
    const ques=useSelector(state => state.createsurvey.ques_list)

    return ques
}

function Loadansitem(rootid){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid))

    return ans
}

function Loadchoitem(rootid){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid))

    return cho
}

export function ItemList(props){
    var que=false
    const dispatch=useDispatch()

    switch(props.type){
        case "ques":
            var statelist=Loadquesitem()
            var key="Q"
            var z_index="z-10"
            que=true
            break
        case "ans":
            var statelist=Loadansitem(props.rootid)
            var key="A"
            var z_index="z-10"
            break
        case "cho":
            var statelist=Loadchoitem(props.rootid)
            var key="C"
            var z_index="z-10"
            break
    }

    const onDragEnd = (res) => {
        const sourceid = res.source.index;
        const destid = res.destination.index;
        
        dispatch({
            type:"change_list",
            list_type:props.type,
            source:statelist[sourceid],
            dest:statelist[destid],
            source_index:sourceid,
            dest_index:destid,
            rootid:props.rootid
        })
    }
    return (
        <div className={style.column_container}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="item">
                    {
                        drop_prov => (
                            <div className={style.width_full} {...drop_prov.droppableProps} ref={drop_prov.innerRef}>
                                {
                                    statelist.map((state,idx) => {
                                        if(props.mode===1){
                                            return (
                                                <Draggable draggableId={String(state.id)} index={idx} key={key+state.id}>
                                                    {
                                                        drag_prov => (
                                                            <div className={z_index}>
                                                                <SurveyEdit
                                                                    key={key+state.id}
                                                                    rootid={que ? state.id:props.rootid}
                                                                    id={state.id}
                                                                    type={props.type}
                                                                    drag_prov={drag_prov}
                                                                />
                                                            </div>
                                                            
                                                        )
                                                    }
                                                </Draggable>
                                            );
                                            }
                                        else{
                                            return (
                                                    <LoadItem
                                                        key={key+state.id}
                                                        rootid={que ? state.id:props.rootid}
                                                        ansid={props.ansid}
                                                        id={state.id}
                                                        type={props.type}
                                                        mode={props.mode}
                                                    />
                                                );
                                            }
                                        })
                                    }
                                {drop_prov.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export function SelectBox(props) {
    const { onChange, id } = props;
    const type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0].type.id)
    
    return (
        <CreateSurveySelectBox
            onChange={onChange}
            id={type}
            list={Ques_data_list()}
        />
    );
}