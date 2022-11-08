import React, { Fragment, useEffect } from "react";
import { CreateIntroSurvey, Satisfaction } from "./item/CreateSurveyEdit";
import { useDispatch,useSelector } from "react-redux";
import { ItemList } from "./item/CreateSurveyList";
import { Add_item } from "./item/CreateSurveyAddDelItem";
import style from "./item/CreateSurvey.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as dateFns from "date-fns";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateSurveyService from "../../../services/CreateSurveyService";
import { postSurveyThumbnail } from "../../../services/SurveyService";
import { CreateSurveyButton, CreateSurveyToggle } from "./item/CreateSurveyInput";
import { Dialog, Popover, Transition } from "@headlessui/react";

export function CreateSurvey(props){  //createSurvey/a@gmail.com
    const serverload=useSelector(state => state.createsurvey.serverload)
    const dispatch = useDispatch();
    const loc=useLocation().pathname;
    const navigate=useNavigate()
    if(props.load==="yes" && !serverload){
        const memberid=localStorage.getItem('memberId');

        CreateSurveyService.loadSurvey(loc,memberid).then(response=>{ //editSurvey/1
            console.log(response)
            if(response.data.result.status!=="notFinish"){
                navigate('/surveyshared')
            }
            else{
                dispatch({
                    type:"loadfromserver",
                    value:response.data.result
                })
            }
        });
    }
    const [display,setDisplay] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const queslist=useSelector(state => state.createsurvey.ques_list);
    console.log('queslist',queslist);
        return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            {
                width<height*1.2 && <div className={style.row_container}>
                    <p className={display ? `text-gray-200` : `text-purple-600`}>설문 제작&nbsp;</p>
                        <CreateSurveyToggle
                            checked={display}
                            onChange={()=>{
                                setDisplay(!display)
                        }}
                    />
                    <p className={!display ? `text-gray-200` : `text-blue-600`}>&nbsp;미리보기</p>
                </div>
            }
            <div className={style.page}>
                {
                    (width>=height*1.2 || !display) && <div className={style.column_body}>
                        <p>설문 제작</p>
                        <CreateIntroSurvey pre={1}/>
                        <ItemList
                            state={queslist}
                            mode={1}
                            type={"ques"}
                        />
                        <Add_item
                            name={"질문"} 
                            type={"add_ques"} 
                            state={queslist}
                        />
                    </div>
                }
                {
                    width>=height*1.2 && 
                    <hr style={{ border: "1px solid #B0B0B0", width: '1', height: '100vh'}} />
                }
                {
                    (width>=height*1.2 || display) && <div className={style.column_body}>
                        <p>미리보기</p>
                        <CreateIntroSurvey pre={0}/>
                        <ItemList
                            state={queslist}
                            mode={0}
                            type={"ques"}
                        />
                        <Satisfaction mode={0}/>
                        <CreateSurveySend/>
                    </div>
                }
            </div>
        </div>
    );
}

function Share_modal() {
    const isOpen=useSelector(state=>state.createsurvey.share_modal)
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const [endDate, setEndDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const loc=useLocation().pathname;
    const survey_data=useSelector(state => state.createsurvey);

    const [Id, setId] = useState();
    const [share, setShare] = useState(false);
    const [copy, setCopy] = useState(false);
    function share_url(){
        const memberid=localStorage.getItem('memberId');
        //editSurvey/1/a@gmail.com //createSurvey/a@gmail.com
        survey_data["start"]=dateFns.format(startDate, "yyyy-MM-dd")
        survey_data["end"]=dateFns.format(endDate ? endDate : startDate, "yyyy-MM-dd")
        
        CreateSurveyService.saveSurvey(loc,memberid,survey_data).then(response=>{
            if(response.data.result){
                setId(response.data.result)
                setShare(true)
                const surveyId=response.data.result;
                postSurveyThumbnail(surveyId);
            }
        })
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=>{return true}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
    
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    설문을 공유해보세요!
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Popover className="relative z-10">
                                        <Popover.Button className={share ? "text-gray-300":""} disabled={share}>{`>>마감 기한 설정<<`}</Popover.Button>
                                        {
                                            !share && <Popover.Panel className="absolute z-auto">
                                                {({close})=>(
                                                    <ReactDatePicker
                                                        selected={startDate}
                                                        onChange={(dates) => {
                                                            const [start, end] = dates;
                                                            setStartDate(start)
                                                            setEndDate(end)
                                                            if(end){
                                                                close()
                                                            }
                                                        }}
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        dateFormat="YYYY-MM-DD"
                                                        selectsRange
                                                        inline
                                                        shouldCloseOnSelect={endDate}
                                                        minDate={new Date()}
                                                        placeholderText="기한을 설정해주세요"
                                                    />
                                                )}
                                            </Popover.Panel>
                                        }
                                        </Popover>
                                    <p>설문 시작 : {dateFns.format(startDate, "yyyy-MM-dd")}</p>
                                    <p>설문 종료 : {dateFns.format(endDate ? endDate : startDate, "yyyy-MM-dd")}</p>
                                    <div className="flex flex-row">
                                        {Id && <p className={style.only_ani}>설문 공유 : {CreateSurveyService.shareSurvey(Id)}</p>}
                                        {copy && <p className={style.only_ani}>&nbsp;{`<`}&nbsp;복사 완료!</p>}
                                    </div>
                                </div>
            
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={()=>{
                                            dispatch({
                                                type:"share_modal",
                                                value:false
                                            })
                                            if(share){
                                                navigate('/manage')
                                            }
                                        }}
                                    >
                                        닫기
                                    </button>
                                    {
                                        !share && <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 ml-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={()=>{share_url()}}
                                        >
                                            배포
                                        </button>
                                    }
                                    {
                                        share && <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 ml-2 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={()=>{
                                                try{
                                                    navigator.clipboard.writeText(CreateSurveyService.shareSurvey(Id));
                                                }
                                                catch(e){
                                                    const textarea = document.createElement("textarea");
                                                    textarea.value = CreateSurveyService.shareSurvey(Id);
                                                    textarea.style.top = 0;
                                                    textarea.style.left = 0;
                                                    textarea.style.position = "fixed";
    
                                                    document.body.appendChild(textarea);
                                                    textarea.focus();
                                                    textarea.select();
                                                    document.execCommand("copy");
                                                    document.body.removeChild(textarea);
                                                    setCopy(true)
                                                }
                                            }}
                                        >
                                            복사
                                        </button>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

function CreateSurveySend() {
    const state=useSelector(state => state.createsurvey);
    const serverload=useSelector(state => state.createsurvey.serverload)
    const loc=useLocation().pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const memberid=localStorage.getItem('memberId');

    const [disabled,setDisabled]=useState(false)
    return (
        <div className={style.row_container}>
            <CreateSurveyButton
                title="임시저장"
                onClick={()=>{
                    console.log(state)
                    state["end"]="not"
                    setDisabled(true)
                    CreateSurveyService.saveSurvey(loc,memberid,state).then(response=>{
                        if(response.data.isSuccess || response.data.isSuccess===undefined){
                            if(!serverload){
                                console.log('response',response);
                                console.log('response data',response.data);
                                const surveyId=response.data.result;
                                console.log('after post survey: surveyId - ',surveyId);
                                postSurveyThumbnail(surveyId);
                            }
                            navigate(`/temporary`)
                        }
                        else{
                            setDisabled(false)
                        }
                    })
                }}
                disabled={disabled}
            />
            <CreateSurveyButton
                title="배포"
                onClick={()=>{
                    dispatch({
                        type:"share_modal",
                        value:true
                    })
                }}
            />
            <Share_modal/>
        </div>
    );
};

export function SurveyShared(){
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className={style.column_body}>
                <div className={style.text_name}>이미 배포된 설문지입니다.</div>
            </div>
        </div>
    );
}

export default CreateSurvey