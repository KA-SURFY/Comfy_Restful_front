import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import ManageService from '../../../../services/ManageService';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ClipboardDocumentIcon, ForwardIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';

function FinishedItem(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [finishedList, setFinishedList] = useState([]);
    const [selectSurveyId, setSelectSurveyId] = useState()
    let [isOpen, setIsOpen] = useState(false);
    let [isFailOpen, setIsFailOpen] = useState(false);


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function showModal(surveyId) {
        setSelectSurveyId(surveyId)
        openModal();
    }

    //설문 삭제 실패
    function closeFailModal() {
        setIsFailOpen(false);
        
        document.location.href = "/manage";
    }

    function openFailModal() {
        setIsFailOpen(true);
        
    }

    useEffect(() => {
        getSurveyingList().then(res => {
            setFinishedList(res.data.result)
        });
    }, [])


    async function getSurveyingList() {
        try {
            const result = await ManageService.getSurveyByStatus('finish');
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    function deleteSurvey(surveyId) {
        deleteSelectSurvey(surveyId).then(res => {
            if(res.data.code === 2022){
                console.log('게시글 존재 삭제 실패');
                setIsOpen(false);
                openFailModal();
            }
            else {
                closeModal();
                document.location.href = "/manage";
            }
        })
    }

    async function deleteSelectSurvey(surveyId) {
        try {
            const result = await ManageService.deleteSurvey(surveyId);
            return result;
        } catch (error) {
            closeModal();
        }
    }



    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 mb-10 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900"> 설문 완료 된 설문지 </h2>
                {finishedList.length !== 0 ?
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {finishedList.map((survey) => (

                            <div key={survey.surveyId} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-70">
                                    <img
                                        src={'/images/' + survey.thumbnail + '.jpg'}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700"> {survey.title} </h3>
                                        <p className={"mt-1 text-sm" + (survey.status === 'finish' ? " text-red-500" : " text-blue-500")}> {survey.status === 'finish' ? '설문 종료' : '설문 중'} </p>
                                    </div>
                                    <div>
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    <ChevronDownIcon
                                                        className=" h-5 w-5 text-black hover:text-gray-700"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 bottom-8 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-1 py-1">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                    onClick={() => {
                                                                        dispatch({
                                                                            type:"reset_template"
                                                                        })
                                                                        navigate(`/manage/survey/${survey.surveyId}`)
                                                                    }}
                                                                >
                                                                    {active ? (
                                                                        <ClipboardDocumentIcon
                                                                            className="mr-2 h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <ClipboardDocumentIcon
                                                                            className="mr-2 h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    설문지 보기
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                    onClick={() => {
                                                                        navigate(`/resultSurvey/${survey.surveyId}`);
                                                                    }}
                                                                >
                                                                    {active ? (
                                                                        <ForwardIcon
                                                                            className="mr-2 h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <ForwardIcon
                                                                            className="mr-2 h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    결과 보기
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => showModal(survey.surveyId)}
                                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}

                                                                >
                                                                    {active ? (
                                                                        <TrashIcon
                                                                            className="mr-2 h-5 w-5 text-violet-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <TrashIcon
                                                                            className="mr-2 h-5 w-5 text-violet-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                    삭제
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>




                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400"> 설문 완료 된 설문지가 없습니다!</div>
                }
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            설문 삭제하기
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                설문을 삭제하시겠습니까?
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => {
                                                    deleteSurvey(selectSurveyId);
                                                    closeModal();
                                                }}
                                            >
                                                설문을 삭제할래요.
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* 삭제실패 */}
                <Transition appear show={isFailOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeFailModal}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            설문 삭제 불가
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                해당 설문지로 만든 게시글이 있어요. 설문지 삭제에 실패했어요.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeFailModal}
                                            >
                                                알겠습니다.
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

        </div>

    )
}

export default FinishedItem