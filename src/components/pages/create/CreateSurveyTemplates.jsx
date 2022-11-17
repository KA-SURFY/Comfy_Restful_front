import React, { useEffect } from 'react'
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import CreateSurveyTemplateItem from './item/CreateSurveyTemplateItem';

function CreateSurveyTemplates() {
    const TemplateList=CreateSurveyTemplateItem()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900"> 설문 진행 중인 설문지</h2>
                {TemplateList.length !== 0 ?
                    <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {TemplateList?TemplateList.map((survey) => (
                            <div key={survey.id} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-70">
                                    <img
                                        src={'/images/' + survey.thumbnail + '.jpg'}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700"> {survey.intro0} </h3>
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
                                                                            type:"loadfromserver",
                                                                            value:survey
                                                                        })
                                                                        navigate(`/survey`)
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
                                                                    설문지 만들기
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
                        )):<></>}
                    </div>
                    :
                    <div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400"> Comfy 템플릿을 가져오는 중입니다! </div>                                      
                }
            </div>
        </div>
    )
}

export default CreateSurveyTemplates