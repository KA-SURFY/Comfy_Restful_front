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
import CreateSurveyPage from './components/pages/CreateSurveyPage';
import TemporarySurvey from './components/pages/management/TemporarySurvey';
import ResultSurvey from './components/pages/result/ResultSurvey';

import RespondentSurveyPage, { RespondentComplete } from './components/pages/RespondentSurveyPage';




import Header from './components/common/Header';
import Footer from './components/common/Footer';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export const spring_domain="http://localhost:8080"//http://172.16.1.151:8080 // localhost:8080
// export const react_domain="http://localhost:3000"//http://172.16.3.121 // localhost:3000
export const share_domain="http://www.commfy.shop"

function App() {
  return (
     //<Provider store={store}>
     <>
      <Header />
      <div className='min-h-screen'>
        <BrowserRouter>
            
                <Routes>
                      <Route path="respondentSurvey/:surveyId" element={<RespondentSurveyPage />} />
                      <Route path="answerSurvey/:surveyId/:submitId" element={<RespondentSurveyPage mode={3}/>} />
                      <Route path="respondentComplete" element={<RespondentComplete />} />
                      <Route path="/" element={<Home />} />
                      <Route path="community" element={<MainPage />} />
                      <Route path="mypage" element={<MyPage />} />
                      <Route path="post/:postId" element={<ViewPostPage />} />
                      <Route path="selectSurvey" element={<SelectSurveyPage />} />
                      <Route path="post/createPost/:surveyId" element={<CreatePostPage />} />
                      <Route path="manage" element={<ManageSurvey />} />
                      <Route path="temporary" element={<TemporarySurvey />}/>
                      <Route path="createSurvey" element={<CreateSurveyPage />} />
                      <Route path="createSurvey/:surveyId" element={<CreateSurveyPage load={"yes"}/>} />
                      <Route path="/resultSurvey/:surveyId" element={<ResultSurvey />}/>
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
