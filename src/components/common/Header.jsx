import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition, Dialog } from '@headlessui/react'
import {
    Bars3Icon,
    BookmarkSquareIcon,
    Cog8ToothIcon,
    CursorArrowRaysIcon,
    PhoneIcon,
    PlayIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../../img/logoComfy4x.jpeg'
// import GoogleLoginB from '../GoogleLoginB'
import GoogleLogin from 'react-google-login'
import { login,logout } from '../../services/MemberService'
import {gapi} from 'gapi-script'
import { useSelector,useDispatch } from 'react-redux';
import member, { loginMember,logoutMember } from '../../modules/member';
import { Navigate } from 'react-router-dom'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const solutions = [
    {
        name: '기본 설문지 제작',
        description: '기본 템플릿으로 설문을 제작합니다.',
        href: '/survey',
        icon: CursorArrowRaysIcon,
    },
    {
        name: 'Comfy 설문지 제작',
        description: "Commfy 템플릿으로 설문을 제작합니다.",
        href: '/comfysurvey',
        icon: Squares2X2Icon,
    }
]
const callsToAction = [
    { name: 'Watch Demo', href: '#', icon: PlayIcon },
    { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
   
    {
        name: '설문지 보관함',
        description: '임시저장된 설문지를 제작합니다.',
        href: '/temporary',
        icon: BookmarkSquareIcon,
    },
    {
        name: '설문지 관리',
        description: '설문 진행 중이거나 설문 완료된 설문지를 관리합니다.',
        href: '/manage',
        icon: Cog8ToothIcon,
    }
]

const clientId="487333198384-nh6ucotf0f9djvv3u6oemopui89d8p7k.apps.googleusercontent.com";
//const clientId="150579669124-iuljf351licgh2lg7s35t1fcn9ct6k2h.apps.googleusercontent.com";



function Header() {

    const Dispatch=useDispatch();

    let [isOpen, setIsOpen] = useState(false);
    let [isLogin, setIsLogin] = useState([false]);
    const [logoutAlert,setLogoutAlert]=useState([false]);

    const member=useSelector(state=>state.member);


    useEffect(()=>{
        console.log('header memberId is changed',typeof(localStorage.getItem('memberId')));
        if(localStorage.getItem('memberId')==='0') {
            setIsLogin(false);
            setLogoutAlert(true);
        }
        else {
            setIsLogin(true);
            setLogoutAlert(false);
        }
    },[localStorage.getItem('memberId')]);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // 구글 로그인
    const onSuccess=(response)=>{
        const params=new URLSearchParams();
        const idToken=response.tokenObj.access_token;
        login(idToken).then((response)=>{
            console.log('[login] - ',response);
            Dispatch(loginMember());
        });
        //setIsLogin(true);
        closeModal();
        console.log('setIsLogin',isLogin);
        // Dispatch(setMember(idToken));
    };
    const onFailure=(response)=>{
        console.log(response);
    };
    function start(){
        gapi.client.init({
            clientId,
            scope:'email',
        });
        gapi.load('client:auth2',start);
    }
    

    return (
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {logoutAlert&&<div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                    <p className="font-bold text-center">Comfy의 편안한 설문 시스템을 사용하고 싶으시면 로그인해주세요!</p>
                </div>}
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10 ">
                    
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        {/* 로고 */}
                        <a href="/">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-25 w-25 sm:h-20"
                                src={logo}
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>

                    {/* 커뮤니티  */}
                    <a href="/community" className="text-base font-medium text-gray-500 hover:text-gray-900">
                        커뮤니티
                    </a>

                    {isLogin &&
                        <a href="/myPage" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            마이 페이지
                        </a>
                    }

                    {isLogin&&<Popover.Group as="nav" className="hidden space-x-10 md:flex">
                        {/* 설문제작 */}
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                        )}
                                    >
                                        <span>설문 제작</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {solutions.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                                        >
                                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                                <div className="space-y-6 bg-gray-50 px-5 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                                    {callsToAction.map((item) => (
                                                        <div key={item.name} className="flow-root">
                                                            <a
                                                                href={item.href}
                                                                className="-m-3 flex items-center rounded-md p-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                                                            >
                                                                <item.icon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                                <span className="ml-3">{item.name}</span>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>

                        {/* 설문관리 */}
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                        )}
                                    >
                                        <span> 설문 관리</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {resources.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                                        >
                                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </Popover.Group>}



                    {/* 로그인 */}
                    {/* 로그인 상태에 따라서 버튼 내용 바뀜 */}
                    {/* 로그아웃 alert */}
                    <>
                    
                    </>
                    <>
                        {isLogin ?
                            // 로그인 되어 있을 때

                            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">

                                <button
                                    type="button"
                                    onClick={() => {
                                        logout().then((response)=>{
                                            console.log('[logout] - ',response);
                                            const loc=window.location.pathname;
                                            console.log('location',window.location.pathname);
                                            if(loc!=='/community') window.location.replace('/');
                                            Dispatch(logoutMember());

                                        })
                                        setIsLogin(false);
                                    }}
                                    className="rounded-md ml-4 bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    로그아웃
                                </button>
                            </div>
                            :
                            // 로그인 안되어 있을 때
                            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    로그인
                                </button>
                            </div>
                        }
                    </>

                    {/* 로그인 false 일때 로그인 모달 창 열림 */}
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
                                                구글 로그인
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Comfy에서 로그인하면 편안한 설문관리 서비스를 경험할 수 있어요.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <GoogleLogin
                                                    clientId={clientId}
                                                    render={renderProps => (
                                                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                                                        type="button"
                                                        className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                            로그인 할래요.</button>
                                                      )}
                                                    onSuccess={onSuccess}
                                                    onFailure={onFailure}
                        
                                                />
                                                {/* <button
                                                    type="button"
                                                    className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    // 여기서 온클릭으로 구글로그인 화면 나오게 가능한가요?
                                                    onClick={() => {
                
                                                        closeModal();
                                                        // setIsLogin(true);
                                                    }
                                                    }
                                                >
                                                    로그인 할래요.
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    로그인 안할래요.
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


        </Popover>
    )
}

export default Header