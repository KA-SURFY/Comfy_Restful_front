import React from 'react'
import { useState, useEffect, Fragment } from 'react';
import ManageService from '../../../services/ManageService';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom';
import member, { loginMember, logoutMember } from '../../../modules/member';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../services/MemberService'
import { ChevronDownIcon, ForwardIcon, TrashIcon } from '@heroicons/react/20/solid'



function TemporarySurvey() {

  const navigate = useNavigate()
  const [surveyList, setSurveyList] = useState([])
  const [selectSurveyId, setSelectSurveyId] = useState()
  let [isOpen, setIsOpen] = useState(false)
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const Dispatch = useDispatch();


  function closeModal() {
    setIsOpen(false)
  }

  function openModal(surveyId) {
    setSelectSurveyId(surveyId)
    console.log("surveyId:", surveyId);
    setIsOpen(true)
  }

  function showModal(surveyId) {
    setSelectSurveyId(surveyId)
    openModal();
  }

  function closeDeleteModal() {
    setIsDeleteOpen(false)
}

function openDeleteModal() {
    setIsDeleteOpen(true)
}

function showDeleteModal(surveyId) {
    setSelectSurveyId(surveyId)
    openDeleteModal();
}

  function editSurvey(surveyId) {
    closeModal();
    navigate(`/createSurvey/${surveyId}`);
  }

  useEffect(() => {
    ManageService.getSurveyByStatus('notFinish').then((res) => {
      if (res.data.code === 2002) {
        logout();
        Dispatch(logoutMember());
      }
      else {
        setSurveyList(res.data.result);
        console.log("survey data : ", res.data.result);
      }

    })
  }, [])

  //설문 삭제하기
  function deleteSurvey(surveyId) {
    deleteSelectSurvey(surveyId).then(res => {
        console.log(res);
        closeModal();
        window.location.reload();
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900"> 임시 저장 된 설문지</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {surveyList.map((survey) => (
              <div key={survey.surveyId} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-70">
                  <img
                    src={'/images/' + survey.thumbnail + '.jpg'}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className=" px-4 py-1 text-lg text-gray-700"> {survey.title} </h3>
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
                                    showModal(survey.surveyId);
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
                                  설문 수정하기
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => showDeleteModal(survey.surveyId)}
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
        </div>

        {/* 설문 수정하기 */}
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
                      설문 수정하기
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        임시 저장 된 설문을 수정 할 수 있어요.
                      </p>
                    </div>

                    {/* 여기서 설문 수정으로 갑니다. */}
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          Dispatch({
                            type: "reset_template"
                          })
                          editSurvey(selectSurveyId)
                        }}
                      >
                        설문을 수정할래요.
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* 설문 삭제하기 */}
        <Transition appear show={isDeleteOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                                                onClick={() => deleteSurvey(selectSurveyId)}
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
      </div>
    </div>
  )
}

export default TemporarySurvey