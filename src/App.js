import logo from './logo.svg';
import MainPage from './components/pages/community/MainPage';
import MyPage from './components/pages/mypage/MyPage';
import ManageSurvey from './components/pages/management/ManageSurvey';
// import ManageSurvey from './components/pages/management/ManageSurveyPage';
import ViewPostPage from './components/pages/community/ViewPostPage';
import CreatePostPage from './components/pages/community/CreatePostPage';
import SelectSurveyPage from './components/pages/community/SelectSurveyPage';
// import StoreSurveyPage from './components/pages/management/StoreSurveyPage';
import NotFound from './components/common/NotFound';
import Home from './components/pages/home/Home';
import CreateSurvey, { SurveyShared } from './components/pages/create/CreateSurvey';
import TemporarySurvey from './components/pages/management/TemporarySurvey';
import ResultSurvey from './components/pages/result/ResultSurvey';
import React from 'react';
import RespondentSurvey, { RespondentClose, RespondentComplete, RespondentNotOpen } from './components/pages/create/RespondentSurvey';






import Header from './components/common/Header';
import Footer from './components/common/Footer';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export const spring_domain="http://localhost:8080"//http://172.16.1.151:8080 // localhost:8080
export const react_domain="http://localhost:3000"//http://172.16.3.121 // localhost:3000
export const share_domain="http://210.109.62.83"

function App() {
  return (
     //<Provider store={store}>
     <>
      <Header />
      <div className='min-h-screen'>
        <BrowserRouter>
            
                <Routes>
                      <Route path="/manage/survey/:surveyId" element={<RespondentSurvey mode={0}/>} />
                      <Route path="respondent/:surveyId" element={<RespondentSurvey mode={2}/>} />
                      <Route path="respondent/answer/:surveyId/:submitId" element={<RespondentSurvey mode={3}/>} />
                      <Route path="respondentcomplete" element={<RespondentComplete />} />
                      <Route path="respondentclose" element={<RespondentClose />} />
                      <Route path="respondentnotopen" element={<RespondentNotOpen />} />
                      <Route path="/" element={<Home />} />
                      <Route path="community" element={<MainPage />} />
                      <Route path="mypage" element={<MyPage />} />
                      <Route path="post/:postId" element={<ViewPostPage />} />
                      <Route path="selectSurvey" element={<SelectSurveyPage />} />
                      <Route path="post/createPost/:surveyId" element={<CreatePostPage />} />
                      <Route path="manage" element={<ManageSurvey />} />
                      <Route path="temporary" element={<TemporarySurvey />}/>
                      <Route path="survey" element={<CreateSurvey />} />
                      <Route path="survey/:surveyId" element={<CreateSurvey load={"yes"}/>} />
                      <Route path="surveyshared" element={<SurveyShared />} />
                      <Route path="/resultSurvey/:surveyId" element={<ResultSurvey />}/>
                      <Route path="/createsurvey" element={<CreateSurvey/>} />
                      <Route path="/createsurvey/:surveyId" element={<CreateSurvey load={"yes"}/>}/>
                      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                      <Route path="*" element={<NotFound />}></Route>
                  </Routes>
            
        </BrowserRouter>
      </div>
      <Footer />
     </>
  );
}

export default App;
