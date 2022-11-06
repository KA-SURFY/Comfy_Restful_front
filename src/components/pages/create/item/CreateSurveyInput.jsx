import style from "./CreateSurvey.module.css"
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Switch } from "@headlessui/react";

const StyledTextarea = styled.textarea`
    width: 100%;
    ${(props) =>
        props.height ?
        `height: ${props.height}px;` : `height:40px;`}
    font-size: 16px;
    line-height: 16px;
    resize:none;
    border:1px solid lightgrey;
    border-radius: 10px;
    overflow:hidden;
    padding:6px 0px 0px 0px;
`;

export function SurveyTextInput(props) {
    const { height, value, onChange, className } = props;

    const autoResize = (e) => {
        let textarea = document.querySelector(`.${className}`);
      
        if (textarea) {
          textarea.style.height = 'auto';
          let height = textarea.scrollHeight; // 높이
          textarea.style.height = `${height}px`;
        }
      };

    return <StyledTextarea 
            height={height} 
            value={value} 
            className={className}
            onChange={onChange} 
            onKeyDown={autoResize}
            onKeyUp={autoResize}
        />;
}

export function CreateSurveyButton(props) {
  const { title, onClick, disabled } = props;

  return <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1.5 px-3 border border-gray-100 rounded-full shadow" onClick={onClick} disabled={disabled}>{title || "button"}</button>;
}

export function CreateSurveyToggle(props) {
    const checked=props.checked
    const onChange=props.onChange

    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className={`${
                checked ? 'bg-blue-600' : 'bg-purple-600'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    checked ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    )
}

export function CreateSurveySlider(props){
    const dispatch=useDispatch()

    return  <input 
        className={style.slider_ani}
        type="range"
        min={0}
        max={props.max || 100}
        value={props.ans || 0}
        onChange={({ 
            target: { value: radius } }) => {
                if(props.mode===2){
                    props.setAns(radius);
                    dispatch({
                        type:props.type,
                        rootid:props.id,
                        value:radius
                    })
                }
            }
        }/>
}

export function CreateSurveySelectBox(props) {
    return (
        <select
            key={props.id}
            onChange={props.onChange} 
            defaultValue={props.id}
            className={style.selectbox}>
            {props.list.map((option)=>(
                <option key={option.id} value={option.id} >
                    {option.name}
                </option>
            ))}
        </select>
    );
}
